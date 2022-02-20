from flask_restx import Resource, Namespace
from Models.Admin import Admins
from Models.UserRole import UserRole
from server import db, token_required, app, compress
from API import api
from API.marshal_fields.Admin import admin_fields
from API.docs import Admin as AdminDocs
from API.request_parser.Admin import searchParser, addParser, putParser, patchParser, deleteParser
from flask import jsonify, abort
from sqlalchemy.exc import IntegrityError

nsadmin = Namespace("Admin", description = "Handle all admin database record")


class AdminAPI(Resource):
    """
    An API for CRUD admin table. Inherited from Resource class.
    
    METHODS (PUBLIC)
    ----------
    get(current_user)
        a method for getting information about admin datas.
        
    post(current_user)
        a method for creating new admin
        
    patch(current_user)
        a method for updating user role
        
    put(current_user)
        a method for changing password of admin
        
    delete(current_user)
        a method for deleting admin
    
    """
    #########################################################################################################
    @api.expect(searchParser)
    @api.doc(description=AdminDocs.get_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def get(self, current_user):
        """
        Getting all admin (20 data per page)
        """
        response = {
            'admins': [],
        }
        # parsing the arguments
        args = searchParser.parse_args()
        
        # getting page 
        page = None
        if args.get("page"):
            page = args.pop("page")
        
        # joining the userrole for the getting the email
        all_admin = Admins.query.join(UserRole, Admins.user_id == UserRole.id)\
                                    .add_columns(UserRole.email)
                                    
        # filtering all admin based on user id except the user id
        if args.get("exception_user_id"):
            all_admin = all_admin.filter(Admins.user_id != args['exception_user_id'])
            
        # filtering all admin based on user id
        if args.get("user_id"):
            all_admin = all_admin.filter(Admins.user_id == args['user_id'])
            
        # filtering all admin based on name
        if args.get("name"):
            all_admin = all_admin.filter(Admins.name == args['name'])
        
        # making pages
        if page:
            all_admin = all_admin.paginate(page, app.config["DATA_PER_PAGE"], False)
            response['max_page'] = all_admin.pages
            response['has_next'] = all_admin.has_next
            response['has_prev'] = all_admin.has_prev
            all_admin = all_admin.items
        
        # query all   
        else:
            response['max_page'] = 1
            response['has_next'] = False
            response['has_prev'] = False
            all_admin = all_admin.all()
        
        # reconstructing the response
        for admin in all_admin:
            admin, email = admin
            res = {
                'user_id': admin.user_id,
                'name': admin.name,
                'email': email
            }
            response['admins'].append(res)
        return jsonify(response)
    #########################################################################################################
    
    #########################################################################################################
    @api.marshal_with(admin_fields, mask = '')
    @api.expect(addParser)
    @api.doc(description=AdminDocs.post_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def post(self, current_user):    
        """
        Creating new user admin
        """
        # parsing arguments
        args = addParser.parse_args()
        try:
            # try to create new user account with role admin
            new_user = UserRole(email = args['email'],
                                password = args['password'],
                                role="Admin")
            db.session.add(new_user)
            db.session.commit()
            
            # try to create admin account
            new_admin = Admins(user_id=new_user.id, name=args['name'])
            db.session.add(new_admin)
            db.session.commit()
        
        # abort to 409 (Resource Conflict) because the value of a column is unique
        except IntegrityError:
            db.session.rollback()
            abort(409)
            
        return new_admin
    #########################################################################################################
    
    #########################################################################################################
    @api.marshal_with(admin_fields, mask = '')
    @api.expect(putParser)
    @api.doc(description=AdminDocs.put_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def put(self, current_user):
        """
        Updating the admin
        """
        # parsing arguments
        args = putParser.parse_args()
        try:
            # try to update the user account
            user = UserRole.query.filter_by(id=args['user_id']).first_or_404()
            user.email = args['email']
            
            # try to update the admin account
            admin = Admins.query.filter_by(user_id=user.id).first_or_404()
            admin.name = args['name']
            db.session.commit()
            
        # abort to 409 (Resource Conflict) because the value of a column is unique
        except IntegrityError:
            db.session.rollback()
            abort(409)
        return admin
    #########################################################################################################
    
    #########################################################################################################
    @api.marshal_with(admin_fields, mask = '')
    @api.expect(patchParser)
    @api.doc(description=AdminDocs.patch_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def patch(self, current_user):
        """
        Update password admin
        """
        # parsing arguments
        args = patchParser.parse_args()
        
        # changing password of an user
        user = UserRole.query.filter_by(email=args['email']).first_or_404()
        user.password = args['password']
        
        db.session.commit()
        return user
    #########################################################################################################
    
    
    #########################################################################################################
    @api.marshal_with(admin_fields, mask = '')
    @api.expect(deleteParser)
    @api.doc(description=AdminDocs.delete_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def delete(self, current_user):
        """
        Deleting user admin
        """
        # parsing arguments
        args = deleteParser.parse_args()
        args = {k : v for k, v in args.items() if v is not None}
        
        # filtering the user that will be deleted
        user_deleted = UserRole.query.filter_by(id=args['user_id']).first_or_404()
        db.session.delete(user_deleted)
        
        #  filtering the admin that will be deleted
        admin = Admins.query.filter_by(user_id = user_deleted.id).first_or_404()
        histories = admin.history
        
        # removing all histories
        for history in histories:
            db.session.delete(history)
        
        db.session.delete(admin)
        db.session.commit()
        return admin
    #########################################################################################################

    
