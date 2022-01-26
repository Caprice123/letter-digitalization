from server import app, csrf, token_required, compress
from flask_restx import Api

# authorization
authorizations = {
    'api_key' : {
        'type' : 'apiKey',
        'in' : 'header',
        'name' : 'x-access-tokens'
    }
}

# initialize API
api = Api(app,
          version="1.0.0",
          authorizations=authorizations,
          title="Letter Digitalization",
          description="API Letter Digitalization",
          prefix='/api',
          doc='/api/docs',
          security='api_key',
          decorators=[csrf.exempt, compress.compressed()])




from API.Admin import AdminAPI, nsadmin
from API.Category import CategoryAPI, nscategory
from API.Teacher import TeacherAPI, nsteacher
from API.Student import StudentsAPI, nsstudent
from API.Record import RecordsAPI, nsrecord
from API.History import HistoryAPI, nshistory

# make namespace
nsadmin.add_resource(AdminAPI, '/')
nscategory.add_resource(CategoryAPI, '/')
nsrecord.add_resource(RecordsAPI, '/')
nshistory.add_resource(HistoryAPI, '/')
nsteacher.add_resource(TeacherAPI, '/')
nsstudent.add_resource(StudentsAPI, '/')

# make API route 
api.add_namespace(nsadmin, "/admin")
api.add_namespace(nscategory, "/category")
api.add_namespace(nsrecord, '/record')
api.add_namespace(nshistory, "/history")
api.add_namespace(nsteacher, "/teacher")
api.add_namespace(nsstudent, "/student")