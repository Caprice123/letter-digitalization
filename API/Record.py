from flask_restx import Resource, Namespace
from Models.Record import Records
from Models.Teacher import Teachers
from Models.Category import Category
from server import db, token_required, compress, app
from API import api
from API.marshal_fields. Record import record_fields
from API.docs import Record as RecordDocs
import time
from datetime import datetime
from API.request_parser.Record import getParser, postParser, patchParser, deleteParser
from flask import jsonify


nsrecord = Namespace('Records', description='Handle all record operation')

class RecordsAPI(Resource):
    """
    An API for CRUD record table. Inherited from Resource class.
    
    METHODS (PUBLIC)
    ----------
    get(current_user)
        a method for getting all Records.
        
    post(current_user)
        a method for creating new record
        
    patch(current_user)
        a method for updating record
        
    delete(current_user)
        a method for deleting record
    
    """
    #########################################################################################################
    @api.expect(getParser)
    @api.doc(description=RecordDocs.get_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def get(self, current_user):
        """
        Getting all Records (20 data per page)
        """
        response = {
                'records': [],
            }
        # parsing arguments
        args = getParser.parse_args()
        
        # parsing status of the records 
        args['status'] = None if args.get('status') == "all" else args.get("status")   
        
        # parsing page of the records 
        page = args.pop("page") if args.get('page') else None
        
        # joining to the category
        all_record = Records.query.join(Category, Records.category_id == Category.category_id)\
                                    .add_columns(Category.required_role_accept, Category.visible_role)
        teacher = None
        # filtering based on who made the record
        if args.get("sent_by_user_id"):
            all_record = all_record.filter(Records.sent_by_user_id == args['sent_by_user_id'])
            
        # filtering based on jurusan
        if args.get("jurusan"):
            all_record = all_record.filter(Records.jurusan == args['jurusan'])
        
        # getting the teacher who is the current user
        if args.get("teacher_id"):
            teacher = Teachers.query.filter_by(user_id=args['teacher_id']).first_or_404()
        
        
        # filtering based on status
        if args.get("status"):
            # filtering status record sent
            if args.get("status") == "sent":
                # return if (the record is not accepted and rejected) and (record last updated by doesn't contain current teacher role)
                all_record = all_record.filter(Records.status.notlike("accepted") & Records.status.notlike("rejected") & ~Records.last_updated_by.contains(teacher.role))
                if teacher.can_see_records:
                    all_record = all_record.filter(Records.status.like("sent"))
                
            # filtering status record accepted
            elif args.get("status") == "accepted":
                # return if record status has word status
                all_record = all_record.filter(Records.status.contains("accepted"))
                
                # if teacher can see all records then query also all record that requuired role accept doesn't contain teacher role and last updated by doesn't contain teacher role
                # or record that requuired role accept contains teacher role and last updated by contains teacher role
                if teacher.can_see_records:
                    all_record  = all_record.filter((~Category.required_role_accept.contains(teacher.role) & ~Records.last_updated_by.contains(teacher.role)) | 
                                                    (Category.required_role_accept.contains(teacher.role) & Records.last_updated_by.contains(teacher.role)))
                
                # if teacher cannot see records then filter only record that only contains teacher role
                else:
                    all_record = all_record.filter(Records.last_updated_by.contains(teacher.role))    

            # filtering status record rejected
            elif args.get("status") == "rejected":
                # filtering all record status is rejected
                all_record = all_record.filter(Records.status == "rejected")
                
        # if teacher cannot see all records then filter again if the record can be seen with the teacher role
        if teacher:
            if teacher.can_see_records == False:
                all_record = all_record.filter(Category.visible_role.contains(teacher.role))

        # ordering the records based on the date sent
        all_record = all_record.order_by(Records.date_sent.desc())
        
        # making pages
        if page:
            all_record = all_record.paginate(page, app.config["DATA_PER_PAGE"], False)
            response['max_page'] = all_record.pages
            response['has_next'] = all_record.has_next
            response['has_prev'] = all_record.has_prev
            all_record = all_record.items
            
        # query all
        else:
            response['max_page'] = 1
            response['has_next'] = False
            response['has_prev'] = False
            all_record = all_record.all()

        # reconstructing the response
        for record in all_record:
            record = record[0]
            new_res = {
                'record_id': record.record_id,
                'title': record.category.category_name,
                'jurusan': record.jurusan,
                'status': record.status,
                'date_sent': record.date_sent,
                'last_updated': record.date_updated,
                'has_record': {
                    'user_id': record.has_record.user_id,
                    'name': record.has_record.name,
                    'nim': record.has_record.nim
                },
                'visible_role': record.category.visible_role.split(","),
                'required_role_accept': record.category.required_role_accept.split(","),
                'last_updated_by': record.last_updated_by.split(","),                
            }
            response['records'].append(new_res)
        return jsonify(response)
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(record_fields, mask = '')
    @api.expect(postParser)
    @api.doc(description=RecordDocs.post_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def post(self, current_user):
        """
        Creating New Record and Assign To User
        """
        # parsing the arguments
        args = postParser.parse_args()

        # creating new records
        new_record = Records(sent_by_user_id=args['user_id'],
                             jurusan = args['jurusan'],
                             category_id=args['category_id'],
                             date_sent=str(datetime.now().strftime('%Y/%m/%d  %H:%M:%S'))
                            )
        db.session.add(new_record)
        db.session.commit()        
        return new_record
    #########################################################################################################

    #########################################################################################################    
    @api.marshal_with(record_fields, mask = '')
    @api.expect(patchParser)
    @api.doc(description=RecordDocs.patch_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def patch(self, current_user):    
        """
        Updating Record
        """
        # parsing arguments
        args = patchParser.parse_args()
        
        # filter the record by record id
        record_update = Records.query.filter_by(record_id=args['record_id']).first_or_404()
        
        # updating the last updated by
        if record_update.last_updated_by:
            # Check if the role hasn't updated the record
            if args['last_updated_by'] not in record_update.last_updated_by.split(","):
                record_update.last_updated_by += f",{args['last_updated_by']}"
                record_update.date_updated = f"{str(datetime.now().strftime('%Y/%m/%d  %H:%M:%S'))}"
        else:
            record_update.last_updated_by = f"{args['last_updated_by']}"
            record_update.date_updated = f"{str(datetime.now().strftime('%Y/%m/%d  %H:%M:%S'))}"
        
        # if response from the teacher is accepted, update the record status
        if args['status'] == "accepted":
            maximum_accept = len(record_update.category.required_role_accept.split(","))

            if record_update.status == "sent":
                # if only one then make it accepted if response is accepted
                if maximum_accept > 1:
                    record_update.status = f"{args['status']} 1/{maximum_accept}" 
                else:
                    record_update.status = f"{args['status']}" 
            else:
                # update the progress of the record
                last_status = record_update.status.replace("accepted ", "").strip()
                last_status = last_status.split("/")
                if (int(last_status[0]) + 1 < int(last_status[1])):
                    record_update.status = f"{args['status']} {int(last_status[0]) + 1}/{maximum_accept}" 
                else:
                    record_update.status = f"{args['status']}"
                    
        # rejecting the record status
        else:
            record_update.status = "rejected"
        db.session.commit()
        return record_update 
    #########################################################################################################

    #########################################################################################################
    @api.marshal_with(record_fields, mask = '')
    @api.expect(deleteParser)
    @api.doc(description=RecordDocs.delete_documentation, security='api_key')
    @api.header('x-access-tokens', 'jwt token')
    @token_required
    @compress.compressed()
    def delete(self, current_user):
        """
        Deleting Records
        """
        # parsing arguments
        args = deleteParser.parse_args()
        args = {k : v for k, v in args.items() if v is not None}
        
        # filtering records that will be deleted
        record_deleted = Records.query.filter_by(**args).first_or_404()
        
        # deleting the records
        db.session.delete(record_deleted)
        db.session.commit()
        return record_deleted
    #########################################################################################################
