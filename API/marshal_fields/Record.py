from flask_restx import fields
from API import api

class SeparatedComa(fields.Raw):
    def format(self, value):
        if len(value) > 0:
            return value.split(",")
        return []

sent_by_record_fields = api.model('SentBySchema', {
    'user_id': fields.Integer,
    "name": fields.String,
    "nim": fields.String
})
record_fields = api.model('RecordsSchema', {
    'record_id': fields.Integer,
    'title': fields.String(attribute='category.category_name'),
    'jurusan': fields.String,
    'status': fields.String,
    'date_sent': fields.String,
    'last_updated': fields.String(attribute="date_updated"),
    'has_record': fields.Nested(sent_by_record_fields),
    'visible_role': SeparatedComa(attribute='category.visible_role'),
    'required_role_accept': SeparatedComa(attribute='category.required_role_accept'),
    'last_updated_by': SeparatedComa(attribute="last_updated_by")
})

