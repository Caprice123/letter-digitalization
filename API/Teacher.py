from flask_restx import Resource, Namespace
from sqlalchemy.exc import IntegrityError
from Models.Teacher import Teachers
from Models.UserRole import UserRole
from server import db, token_required, app, compress
from API import api
from API.marshal_fields.Teacher import teacher_fields
from API.docs import Teacher as TeacherDocs
from API.request_parser.Teacher import getParser, postParser, patchParser, putParser, deleteParser
from flask import jsonify, abort
from sqlalchemy import func
from Models.Category import Category

nsteacher = Namespace("Teacher", description="Handles all teacher database data")

class TeacherAPI(Resource):
    """
    An API for CRUD teacher table. Inherited from Resource class.
    
    METHODS (PUBLIC)
    ----------
    get(current_user)
        a method for getting information about teacher datas.
        
    post(current_user)
        a method for creating new teacher
        
    patch(current_user)
        a method for updating user role
        
    put(current_user)
        a method for changing password of teacher
        
    delete(current_user)
        a method for deleting teacher
    
    """
    #########################################################################################################
    @api.expect(getParser)
    @api.doc(description=TeacherDocs.get_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def get(self, current_user):
        """
        Getting all Teacher (20 data per page)
        """
        response = {
                'teachers': [],
            }
        # parsing arguments
        args = getParser.parse_args()
        
        # joining userrole for getting the email
        all_teacher = Teachers.query.join(UserRole, Teachers.user_id == UserRole.id)\
                                .add_columns(UserRole.email)
        
        # filter based on user id
        if args.get("user_id"):
            all_teacher = all_teacher.filter(Teachers.user_id == args['user_id'])
        
        # filter based on role
        if args.get("role"):
            all_teacher = all_teacher.filter(Teachers.role == args['role'])
            
        # filter based on jurusan
        if args.get("jurusan"):
            all_teacher = all_teacher.filter(Teachers.jurusan == args['jurusan'])
            
        # filter based on can see records
        if args.get("can_see_records"):
            all_teacher = all_teacher.filter(Teachers.can_see_records == args['can_see_records'])    
        
        # making pages
        if args.get("page"):
            all_teacher = all_teacher.paginate(args['page'], app.config["DATA_PER_PAGE"], False)
            response['max_page'] = all_teacher.pages
            response['has_next'] = all_teacher.has_next
            response['has_prev'] = all_teacher.has_prev
            all_teacher = all_teacher.items
        
        # query all
        else:
            all_teacher = all_teacher.all()
            response['max_page'] = 1
            response['has_next'] = False
            response['has_prev'] = False
        
        # reconstructing the response
        for teacher in all_teacher:
            teacher, email = teacher
            new_res = {
                'user_id': teacher.user_id,
                'name': teacher.name,
                'role': teacher.role,
                'jurusan': teacher.jurusan,
                'can_see_records': teacher.can_see_records,
                'email': email
            }
            response['teachers'].append(new_res)
        return jsonify(response)
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(teacher_fields, mask = '')
    @api.expect(postParser)
    @api.doc(description=TeacherDocs.post_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def post(self, current_user): 
        """
        Creating New Teacher
        """
        # parsing arguments
        args = postParser.parse_args()
        
        try:
            # try to create user account
            new_user = UserRole(email = args['email'],
                                password = args['password'],
                                role="Teacher")
            db.session.add(new_user)
            db.session.commit()
        
            # try to create teacher account
            new_teacher = Teachers(user_id=new_user.id,
                                name=args['name'],
                                role=args['role'],
                                jurusan=args['jurusan'],
                                can_see_records=args['can_see_records'])
            db.session.add(new_teacher)
            db.session.commit()
            
        # abort to 409 (Resource Conflict) because the value of a column is unique
        except IntegrityError:
            db.session.rollback()
            abort(409)
        return new_teacher
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(teacher_fields, mask = '')
    @api.expect(patchParser)
    @api.doc(description=TeacherDocs.patch_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def patch(self, current_user):
        """
        Changing teacher password
        """
        # parsing arguments
        args = patchParser.parse_args()
        
        # updating the password of the user
        user = UserRole.query.filter_by(email=args['email']).first_or_404()
        user.password = args['password']
    
        db.session.commit()
        return user
    #########################################################################################################
    
    #########################################################################################################
    @api.marshal_with(teacher_fields, mask = '')
    @api.expect(putParser)
    @api.doc(description=TeacherDocs.patch_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def put(self, current_user):
        # parsing arguments
        args = putParser.parse_args()  
        try:
            # try to update the account
            user = UserRole.query.filter_by(id=args['user_id']).first_or_404()
            user.email = args['email']

            # try to update the teacher
            teacher = Teachers.query.filter_by(user_id=user.id).first_or_404()
            teacher.name = args['name']
            teacher.role = args['role']
            teacher.jurusan = args['jurusan']
            teacher.can_see_records = args['can_see_records']
            # if teacher can see records is false, remove all category record visible role the teacher role 
            # if category record viisble role contain teacher role and required role accept not contain teacher role
            
            if teacher.can_see_records == False:
                # MYSQL command
                updated_rows = Category.query\
                                .filter(Category.visible_role.contains(teacher.role))\
                                .filter(~Category.required_role_accept.contains(teacher.role))\
                                .update({
                                            Category.visible_role : func.regexp_replace(Category.visible_role, f"(,{teacher.role}|{teacher.role},)", "")
                                         },
                                        synchronize_session = False)
                                
                # Sqlite3 command
                # updated_rows = Category.query\
                #                 .filter(Category.visible_role.contains(teacher.role))\
                #                 .filter(~Category.required_role_accept.contains(teacher.role))
                # updated_rows.update({Category.visible_role : func.replace(Category.visible_role, f"{teacher.role},", "")},
                #                         synchronize_session = False)
                # updated_rows.update({Category.visible_role : func.replace(Category.visible_role, f",{teacher.role}", "")},
                #                         synchronize_session = False)
                
            # if teacher can see records then append teacher role to the category record visible role 
            # if category visible role doesn't have teacher role
            else:
                updated_rows = Category.query\
                                .filter(~Category.visible_role.contains(teacher.role))
                
                # MYSQL Command
                updated_rows.update({Category.visible_role : func.concat(Category.visible_role, f",{teacher.role}")},
                                        synchronize_session = False)
                
                # Sqlite3 command
                # updated_rows.update({Category.visible_role : Category.visible_role + f",{teacher.role}" },
                #                         synchronize_session = False)
            db.session.commit()
            
        # abort to 409 (Resource Conflict) because the value of a column is unique
        except IntegrityError:
            db.session.rollback()
            abort(409)
        return teacher
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(teacher_fields, mask = '')
    @api.expect(deleteParser)
    @api.doc(description=TeacherDocs.delete_documentation)
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def delete(self, current_user):    
        """
        Deleting Teacher
        """
        # parsing arguments
        args = deleteParser.parse_args()
        args = {k : v for k, v in args.items() if v is not None}
        
        # query the user that will be deleted and delete it
        user_deleted = UserRole.query.filter_by(id=args['user_id']).first_or_404()
        db.session.delete(user_deleted)
        
        # query the teacher that will be deleted and delete it
        teacher_deleted = Teachers.query.filter_by(user_id = user_deleted.id).first_or_404()
        db.session.delete(teacher_deleted)
        db.session.commit()
        return teacher_deleted
    #########################################################################################################

    