
from flask_restx import Resource, Namespace
from sqlalchemy.exc import IntegrityError
from Models.Category import Category
from server import db, token_required, compress, app
from API.marshal_fields.Category import category_fields
from API import api
from API.docs import Category as CategoryDocs
from API.request_parser.Category import getParser, postParser, putParser, patchParser
from flask import jsonify, abort

nscategory = Namespace('Category', description="Handle all category database data")


class CategoryAPI(Resource):
    """
    An API for CRUD category table. Inherited from Resource class.
    
    METHODS (PUBLIC)
    ----------
    get(current_user)
        a method for getting information about category datas.
        
    post(current_user)
        a method for creating new category
        
    patch(current_user)
        a method for updating user role
        
    put(current_user)
        a method for changing password of category
        
    delete(current_user)
        a method for deleting category
    
    """
    #########################################################################################################
    @api.expect(getParser)
    @api.doc(description=CategoryDocs.get_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def get(self, current_user):
        """
        Getting all Record Category (20 data per page)
        """
        response = {
            'categories': [],
        }
        # parsing arguments
        args = getParser.parse_args()
        args = {k : v for k, v in args.items() if v is not None}
        
        # parsing the page
        page = None
        if args.get("page"):
            page = args.pop("page")
        
        # filtering the category
        all_category = Category.query.filter_by(**args)
        
        # making pages
        if page:
            all_category = all_category.paginate(page, app.config["DATA_PER_PAGE"], False)
            response['max_page'] = all_category.pages
            response['has_next'] = all_category.has_next
            response['has_prev'] = all_category.has_prev
            all_category = all_category.items
            
        # query all
        else:
            response['max_page'] = 1
            response['has_next'] = False
            response['has_prev'] = False
            all_category = all_category.all()
            
        # reconstructing the response
        for category in all_category:
            res = {
                'category_id': category.category_id,
                'category_name': category.category_name,
                'path_format': category.path_format,
                'disabled': category.disabled,
                'visible_role': category.visible_role.split(","),
                'required_role_accept': category.required_role_accept.split(",")
            }
            response['categories'].append(res)
        
        return jsonify(response)
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(category_fields, mask = '')
    @api.expect(postParser)
    @api.doc(description=CategoryDocs.post_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def post(self, current_user):
        """
        Creating New Record Category
        """
        # parsing the arguments
        args = postParser.parse_args()
        try:
            
            # try to create the category
            new_category = Category(**args)
            db.session.add(new_category)
        
            db.session.commit()
            
        # abort to 409 (Resource Conflict) because the value of a column is unique    
        except IntegrityError:
            db.session.rollback()
            abort(409)
            
        
        return new_category
    #########################################################################################################
    
    #########################################################################################################    
    @api.marshal_with(category_fields, mask = '')
    @api.expect(putParser)
    @api.doc(description=CategoryDocs.patch_documentation)
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def put(self, current_user):
        """
        Updating Record Category
        """
        # parsing the arguments
        args = putParser.parse_args()
        try:
            # filtering the category that will be updated
            category_update = Category.query.filter_by(category_id=args['category_id']).first_or_404()
            category_update.category_name = args['category_name']
            category_update.path_format = args['path_format']
            category_update.visible_role = args['visible_role']
            category_update.required_role_accept = args['required_role_accept']
            
            
            
            db.session.commit()
        # abort to 409 (Resource Conflict) because the value of a column is unique
        except IntegrityError:
            db.session.rollback()
            abort(409)
        
        return category_update
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(category_fields, mask = '')
    @api.expect(patchParser)
    @api.doc(description=CategoryDocs.patch_documentation)
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def patch(self, current_user):
        """
        Updating Record Category
        """
        # parsing arguments
        args = patchParser.parse_args()
        
        # filter the category that will be updated
        category_update = Category.query.filter_by(category_id=args['category_id']).first_or_404()
       
        # change visibility of the category
        if args['change_visibility']:
            category_update.disabled = False if category_update.disabled else True
        db.session.commit()
        return category_update
    #########################################################################################################

    
    

    
