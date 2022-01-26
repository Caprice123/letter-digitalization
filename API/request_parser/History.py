
from flask_restx import reqparse

#########################################################################################################
# GET argument parser
getParser = reqparse.RequestParser()
getParser.add_argument("user_id", type=int, help="The id of the user", required=True)
getParser.add_argument("page", type=int, help="The page of the user", required=True)
#########################################################################################################

#########################################################################################################
# POST argument parser
postParser = reqparse.RequestParser()
postParser.add_argument("user_id", type=int, help="The user that make the history", required=True)
postParser.add_argument("description", action='append', help="The description of the history", required=True)
#########################################################################################################

#########################################################################################################
# DELETE argument parser
deleteParser = reqparse.RequestParser()
deleteParser.add_argument("id", type=int, help="The id of the history", required=True)
#########################################################################################################


