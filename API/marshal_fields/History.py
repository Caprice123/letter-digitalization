from flask_restx import fields
from API import api

history_fields = api.model('HistorySchema',{
    'id': fields.Integer,
    'description': fields.String,
    'date': fields.String
})