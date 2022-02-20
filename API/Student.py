from flask_restx import Resource, Namespace
from sqlalchemy.exc import IntegrityError
from Models.Student import Students
from Models.UserRole import UserRole
from server import db, token_required, app, compress
from API import api
from API.marshal_fields.Student import student_fields
from API.docs import Student as StudentDocs
from API.request_parser.Student import getParser, postParser, putParser, patchParser, deleteParser
from flask import jsonify, abort

from server.error_code import InsufficientStorage

nsstudent = Namespace("Student", description="handls all student database data")

class StudentsAPI(Resource):
    """
    An API for CRUD student table. Inherited from Resource class.
    
    METHODS (PUBLIC)
    ----------
    get(current_user)
        a method for getting information about student datas.
        
    post(current_user)
        a method for creating new student
        
    patch(current_user)
        a method for updating user role
        
    put(current_user)
        a method for changing password of student
        
    delete(current_user)
        a method for deleting student
    
    """
    #########################################################################################################
    @api.expect(getParser)
    @api.doc(description=StudentDocs.get_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def get(self, current_user):
        """
        Getting all Student (20 data per page)
        """
        response = {
                'students': [],
            }
        # parsing arguments
        args = getParser.parse_args()
        
        # joining with userrole to get the email
        all_student = Students.query.join(UserRole, Students.user_id == UserRole.id)\
                                    .add_columns(UserRole.email)
        #  query based on user id
        if args.get("user_id"):
            all_student = all_student.filter(Students.user_id == args['user_id'])
       
        # make pages
        if args.get("page"):
            all_student = all_student.paginate(args['page'], app.config["DATA_PER_PAGE"], False)
            response['max_page'] = all_student.pages
            response['has_next'] = all_student.has_next
            response['has_prev'] = all_student.has_prev
            all_student = all_student.items
            
        # query all
        else:
            all_student = all_student.all()
            response['max_page'] = 1
            response['has_next'] = False
            response['has_prev'] = False
        
        # reconstructing the response
        for student in all_student:
            student, email = student
            new_res = {
                'user_id': student.user_id,
                'name': student.name,
                'nim': student.nim,
                'batch': int(str(student.nim)[:2]),
                'jurusan': student.jurusan,
                'email': email
            }
            response['students'].append(new_res)
        return jsonify(response)
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(student_fields, mask = '')
    @api.expect(postParser)
    @api.doc(description=StudentDocs.post_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def post(self, current_user):
        """
        Creating New Student
        """
        # parsing arguments
        args = postParser.parse_args()
        try:
            # try creating user account
            new_user = UserRole(email = args['email'],
                                password = args['password'],
                                role="Student")
            db.session.add(new_user)
            db.session.commit()

            # try creating student account
            new_student = Students(user_id=new_user.id,
                                name=args['name'],
                                nim=args['nim'],
                                jurusan=args['jurusan']
                                )
            db.session.add(new_student)
            db.session.commit()
        # abort to 409 (Resource Conflict) because the value of a column is unique
        except IntegrityError:
            db.session.rollback()
            abort(409)
        return new_student
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(student_fields, mask = '')
    @api.expect(patchParser)
    @api.doc(description=StudentDocs.patch_documentation, security='api_ket')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def patch(self, current_user):
        """
        Updating the status of Student
        """
        # parsing arguments
        args = patchParser.parse_args()
        
        # query the user based on email
        user = UserRole.query.filter_by(email=args['email']).first_or_404()
        
        # changing the user password
        user.password = args['password']
        db.session.commit()
        return user
    #########################################################################################################
    
    #########################################################################################################
    @api.marshal_with(student_fields, mask = '')
    @api.expect(putParser)
    @api.doc(description=StudentDocs.put_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def put(self, current_user):
        """
        Changing user password
        """
        # parsing arguments
        args = putParser.parse_args()
        try:
            # try to update user account
            user = UserRole.query.filter_by(id=args['user_id']).first_or_404()
            user.email = args['email']
            
            # try to update student account
            student = Students.query.filter_by(user_id=user.id).first_or_404()
            student.name = args['name']
            student.nim = args['nim']
            student.batch = int(str(args['nim'])[:2])
            student.jurusan = args['jurusan']
            db.session.commit()
        # abort to 409 (Resource Conflict) because the value of a column is unique
        except IntegrityError:
            db.session.rollback()
            abort(409)
        return student
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(student_fields, mask = '')
    @api.expect(deleteParser)
    @api.doc(description=StudentDocs.delete_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def delete(self, current_user):
        """
        Delete Student
        """
        # parsing arguments
        args = deleteParser.parse_args()
        args = {k : v for k, v in args.items() if v is not None}
        
        # filtering user that will be deleted and delete it
        user_deleted = UserRole.query.filter_by(id = args['user_id']).first_or_404()
        db.session.delete(user_deleted)
        
        # filtering student that will be deleted
        student_deleted = Students.query.filter_by(user_id = user_deleted.id).first_or_404()
        
        # delete all student records
        records = student_deleted.records
        for record in records:
            if record.status not in ["rejected", "accepted"]:
                db.session.rollback()
                abort(412)
            else:
                db.session.delete(record)
            
        # deleting the student
        db.session.delete(student_deleted)
        db.session.commit()
        return student_deleted
    #########################################################################################################

    