from flask_restx import reqparse

########################################################################################################
# GET argument parser
searchParser = reqparse.RequestParser()
searchParser.add_argument("exception_user_id", type=int, help="The id of admin")
searchParser.add_argument("user_id", type=int, help="The id of admin")
searchParser.add_argument("name", type=str, help="The name of the admin")
searchParser.add_argument("page", type=int, help="The page of the user")
#########################################################################################################


#########################################################################################################
# POST argument parser
addParser = reqparse.RequestParser()
addParser.add_argument("name", type=str, help="The name of the admin", required=True)
addParser.add_argument("email", type=str, help="The email of Admin", required=True)
addParser.add_argument("password", type=str, help="The password of the Admin", required=True)
#########################################################################################################

#########################################################################################################
# PATCH argument parser
patchParser = reqparse.RequestParser()
patchParser.add_argument("email", type=str, help="The email of Admin", required=True)
patchParser.add_argument("password", type=str, help="The password of the Admin", required=True)
#########################################################################################################

#########################################################################################################
# PUT argument parser
putParser = reqparse.RequestParser()
putParser.add_argument("user_id", type=int, help="The id of admin", required=True)
putParser.add_argument("name", type=str, help="The name of the admin", required=True)
putParser.add_argument("email", type=str, help="The email of Admin", required=True)
#########################################################################################################

#########################################################################################################
# DELETE argument parser
deleteParser = reqparse.RequestParser()
deleteParser.add_argument("user_id", type=int, help="The id of the user", required=True)
#########################################################################################################
