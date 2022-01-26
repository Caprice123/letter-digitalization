from flask_restx import fields
from API import api


class Batch(fields.Raw):
    def format(self, value):
        return int(str(value)[:2])

student_fields = api.model('StudentSchema',{
    'user_id': fields.Integer,
    'name': fields.String,
    'nim': fields.Integer,
    'batch': Batch(attribute='nim'),
    'jurusan': fields.String(attribute="jurusan"),
})