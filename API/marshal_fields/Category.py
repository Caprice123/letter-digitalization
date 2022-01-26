from flask_restx import fields
from API import api

category_fields = api.model('CategorySchema',{
    'category_id': fields.Integer,
    'category_name': fields.String,
    'path_format': fields.String,
    'disabled': fields.Boolean,
    'columns': fields.List(fields.String(attribute="column_name"))
})