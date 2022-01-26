
from flask_restx import reqparse


#########################################################################################################
# GET argument parser
getParser = reqparse.RequestParser()
getParser.add_argument("user_id", type=int, help="The id of student")
getParser.add_argument("page", type=int, help="The page of the user")
#########################################################################################################


#########################################################################################################
# POST argument parser
postParser = reqparse.RequestParser()
postParser.add_argument("user_id", type=int, help="The id of student")
postParser.add_argument("email", type=str, help="The email of Student", required=True)
postParser.add_argument("password", type=str, help="The password of the Student")
postParser.add_argument("name", type=str, help="The name of the Student", required=True)
postParser.add_argument("nim", type=int, help="The nim of the student", required=True)
postParser.add_argument("jurusan", type=str, help="The jurusan of the student", required=True)
#########################################################################################################


#########################################################################################################
# PUT argument parser
putParser = reqparse.RequestParser()
putParser.add_argument("user_id", type=int, help="The id of student", required=True)
putParser.add_argument("email", type=str, help="The email of Student", required=True)
putParser.add_argument("name", type=str, help="The name of the Student", required=True)
putParser.add_argument("nim", type=int, help="The nim of the student", required=True)
putParser.add_argument("jurusan", type=str, help="The jurusan of the student", required=True)
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
deleteParser.add_argument("user_id", type=int, help="The id of student", required=True)
#########################################################################################################
