
from re import search
from flask_restx import reqparse, inputs
from requests.api import put


#########################################################################################################
# GET argument parser
getParser = reqparse.RequestParser()
getParser.add_argument("disabled", type=inputs.boolean, help="The visibility status to user")
getParser.add_argument("page", type=int, help="The page of the user")
#########################################################################################################

#########################################################################################################
# POST argument parser
postParser = reqparse.RequestParser()
postParser.add_argument("category_name", type=str, help="The name of the category", required=True)
postParser.add_argument("path_format", type=str, help="The format html of the category", required=True)
postParser.add_argument("disabled", type=inputs.boolean, help="The visibility status to user")
postParser.add_argument("visible_role", type=str, help="Role can see the category", required=True)
postParser.add_argument("required_role_accept", type=str, help="Role needed to accept or reject the category", required=True)
#########################################################################################################


#########################################################################################################
# PUT argument parser
putParser = reqparse.RequestParser()
putParser.add_argument("category_id", type=int, help="The id of category", required=True)
putParser.add_argument("category_name", type=str, help="The name of the category", required=True)
putParser.add_argument("path_format", type=str, help="The format html of the category", required=True)
putParser.add_argument("visible_role", type=str, help="Role can see the category", required=True)
putParser.add_argument("required_role_accept", type=str, help="Role needed to accept or reject the category", required=True)
#########################################################################################################

#########################################################################################################
# PATCH argument parser
patchParser = reqparse.RequestParser()
patchParser.add_argument("category_id", type=int, help="The id of category", required=True)
patchParser.add_argument("change_visibility", type=inputs.boolean, help="Change visibility of category", required=True)
#########################################################################################################

