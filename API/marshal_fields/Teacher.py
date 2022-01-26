from flask_restx import fields
from API import api

teacher_fields = api.model('TeacherSchema',{
    'user_id': fields.Integer,
    'email': fields.String,
    'name': fields.String,
    'role': fields.String,
    "jurusan": fields.String,
})