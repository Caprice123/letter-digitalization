

from flask_restx import reqparse


#########################################################################################################
# GET argument parser
getParser = reqparse.RequestParser()
getParser.add_argument("sent_by_user_id", type=int, help="The user id that sent the Record")
getParser.add_argument("jurusan", type=str, help="The visibility of record")
getParser.add_argument("status", type=str, help="The status of Record")
getParser.add_argument("teacher_id", type=int, help="Teacher id")
getParser.add_argument("page", type=int, help="Page of records")
#########################################################################################################

#########################################################################################################
# POST argument parser
postParser = reqparse.RequestParser()
postParser.add_argument("user_id", type=int, help="The user id that sent the record", required=True)
postParser.add_argument("category_id", type=int, help="The category of the Record", required=True)
postParser.add_argument("jurusan", type=str, help="The visibility of record", required=True)
#########################################################################################################

#########################################################################################################
# PATCH argument parser
patchParser = reqparse.RequestParser()
patchParser.add_argument("record_id", type=int, help="The id of Record", required=True)
patchParser.add_argument("status", type=str, help="The status of Record", required=True)
patchParser.add_argument("last_updated_by", type=str, help="Teacher role who is the last one updated the data", required=True)
#########################################################################################################


#########################################################################################################
# DELETE argument parser
deleteParser = reqparse.RequestParser()
deleteParser.add_argument("user_id", type=int, help="The user id that sent the record", required=True)
#########################################################################################################
