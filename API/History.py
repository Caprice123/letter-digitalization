
from flask_restx import Resource, Namespace
from Models.History import History
from server import db, token_required, compress, app
from Models.Admin import Admins
from API.marshal_fields.History import history_fields
from API import api
from API.docs import History as HistoryDocs
from API.request_parser.History import getParser, deleteParser, postParser
from flask import jsonify

nshistory = Namespace('History',  description="Handle all history of admin database data")

class HistoryAPI(Resource):
    """
    An API for CRUD history table. Inherited from Resource class.
    
    METHODS (PUBLIC)
    ----------
    get(current_user)
        a method for getting all History of an Admin
        
    delete(current_user)
        a method for deleting a History of an Admin
    
    """
    #########################################################################################################
    @api.expect(getParser)
    @api.doc(description=HistoryDocs.get_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def get(self, current_user):
        """
        Getting Admin History (20 data per page)
        """
        # parsing arguments
        args = getParser.parse_args()
        
        # filtering the histories based on id
        all_history = History.query.filter_by(admin_id = args['user_id']).paginate(args['page'], app.config['DATA_PER_PAGE'], False)
        
        # reconstructing the response
        histories = {
            'max_page': all_history.pages,
            'has_prev': all_history.has_prev,
            'has_next': all_history.has_next,
            'histories': []
        }
        for history in all_history.items:
            history_record = {}
            history_record['id'] = history.id
            history_record['description'] = history.description
            history_record['date'] = history.date
            histories['histories'].append(history_record)
            
        return jsonify(histories)
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(history_fields, mask = '')
    @api.expect(postParser)
    @api.doc(description=HistoryDocs.post_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def post(self, current_user):
        """
        Creating new History
        """
        # parsing the arguments
        args = postParser.parse_args()
        
        # filtering who will be having the history
        admin = Admins.query.filter_by(user_id = args['user_id']).first_or_404()
        
        # making new history
        for desc in args['description']:
            new_history = History(admin_id= args['user_id'], description=desc)
            db.session.add(new_history)
            admin.history.append(new_history)
            
        db.session.commit()
        
        return new_history
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(history_fields, mask = '')
    @api.expect(deleteParser)
    @api.doc(description=HistoryDocs.delete_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def delete(self, current_user):
        """
        Deleting a History of an Admin
        """
        # parsing arguments
        args = deleteParser.parse_args()
        args = {k : v for k, v in args.items() if v is not None}
        
        # filtering the histories based on id
        history_deleted = History.query.filter_by(**args).first_or_404()
        
        # deleting the history
        db.session.delete(history_deleted)
        db.session.commit()
        return history_deleted    
    #########################################################################################################

   