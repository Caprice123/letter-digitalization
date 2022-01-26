
from flask_restx import reqparse, inputs


#########################################################################################################
# GET argument parser
getParser = reqparse.RequestParser()
getParser.add_argument("user_id", type=int, help="The id of Teacher")
getParser.add_argument("role", type=str, help="What is the role")
getParser.add_argument("jurusan", type=str, help="Major of role")
getParser.add_argument("page", type=int, help="The page of the user")
getParser.add_argument("can_see_records", type=inputs.boolean, help="Supervisor")
#########################################################################################################

#########################################################################################################
# POST argument parser
postParser = reqparse.RequestParser()
postParser.add_argument("email", type=str, help="The email of Teacher", required=True)
postParser.add_argument("password", type=str, help="The password of the Teacher")
postParser.add_argument("name", type=str, help="The name of the Teacher", required=True)
postParser.add_argument("role", type=str, help="What is the role", required=True)
postParser.add_argument("jurusan", type=str, help="Major of role")
postParser.add_argument("can_see_records", type=inputs.boolean, help="Supervisor")
#########################################################################################################

#########################################################################################################
# PUT argument parser
putParser = reqparse.RequestParser()
putParser.add_argument("user_id", type=int, help="The id of Teacher", required=True)
putParser.add_argument("email", type=str, help="The email of Teacher", required=True)
putParser.add_argument("name", type=str, help="The name of the Teacher", required=True)
putParser.add_argument("role", type=str, help="What is the role", required=True)
putParser.add_argument("jurusan", type=str, help="Major of role")
putParser.add_argument("can_see_records", type=inputs.boolean, help="Supervisor", required=True)
#########################################################################################################

#########################################################################################################
# PATCH argument parser
patchParser = reqparse.RequestParser()
patchParser.add_argument("email", type=str, help = "The email of the student", required=True)
patchParser.add_argument("password", type=str, help = "The password of the student", required=True)
#########################################################################################################

#########################################################################################################
# DELETE argument parser
deleteParser = reqparse.RequestParser()
deleteParser.add_argument("user_id", type=int, help="The id of Teacher", required=True)
#########################################################################################################
