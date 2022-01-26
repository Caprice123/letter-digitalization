from flask_restx import fields
from API import api

admin_fields = api.model('AdminSchema',{
    'user_id': fields.Integer,
    'name': fields.String
})