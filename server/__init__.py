
from flask import Flask, redirect, abort, request, url_for, flash
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import os
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, current_user, login_required
from flask_mail import Mail
import pdfkit
from flask_wtf import CSRFProtect
from .config import ProductionConfig
import jwt
from functools import wraps
from itsdangerous import URLSafeTimedSerializer
from flask_compress import Compress
# from flask_autodoc.autodoc import Autodoc
from sqlalchemy import inspect
#########################################################################################################
# loading dotenv
load_dotenv()
#########################################################################################################

#########################################################################################################
# PATH FOR TEMPLATE, STATIC and WKHTMLTOPDF
PATH_TEMPLATE = os.path.join(os.getcwd(), "templates")
PATH_STATIC = os.path.join(os.getcwd(), "static")
PATH_WKHTMLTOPDF = os.path.join(os.getcwd(), 'wkhtmltopdf', 'bin', 'wkhtmltopdf.exe')
#########################################################################################################

#########################################################################################################
# declaring host
HOST = "http://127.0.0.1:5000"
#########################################################################################################

#########################################################################################################
# declaring pdfkit configuration
pdfkit_config = pdfkit.configuration(wkhtmltopdf=PATH_WKHTMLTOPDF)
#########################################################################################################

#########################################################################################################
# configure flask server
app = Flask(__name__, template_folder=PATH_TEMPLATE, static_folder=PATH_STATIC)
app.config.from_object(ProductionConfig())
#########################################################################################################

#########################################################################################################
# initialize sqlalchemy object for database ORM
db = SQLAlchemy(app)

# initialize brcypt object for hashing password
brcypt = Bcrypt(app)

# initialize login manager object for handling all login
login_manager = LoginManager(app)

# initialize mail object for handling all email
mail = Mail(app)

# initialize urlsafetimedserializer object for generating confirmation link token
ts = URLSafeTimedSerializer(app.config['SECRET_KEY'])

# initialize compress object for compressing json data
compress = Compress(app)

# initialize csrf protect object for protecting against CSRF attack
csrf = CSRFProtect(app)

# initialize autodoc object for auto generating documentation for all routes
# autodoc = Autodoc(app)

#########################################################################################################

#########################################################################################################
import Models
from Models.UserRole import UserRole
#########################################################################################################

#########################################################################################################
# decorator for checking jwt token
def check_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        
        # getting token from request cookies
        token = request.cookies.get("token")
        
        # if there is some error then said please login again and redirect to login page again
        if check_user(token) == -1:
            flash("Token has Expired. Please consider login again.", "Error")
            return redirect(url_for('login_page'))
            
        return f(token, *args, **kwargs)
    return decorated


# decorator for checking user role
def role_required(*roles):
    def check_role(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            # available roles
            role_availables = ['Admin', 'Teacher', 'Student']
            
            # filtering the role availables
            accepted = [role_available for role_available in role_availables for role in roles if role == role_available]
            
            # allow if currrent user role is in accepted roles else abort 403 (unauthorized)
            return f(*args, **kwargs) if current_user.role in accepted else abort(403)
        return decorated    
    return check_role

# decorator for checking token in headers
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        
        token = None
        # check detected x-access-tokens in headers of a request
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
        
        # if no token then abort 403 (unauthorized)
        if not token:
            abort(403)
        try:
            # decode the jwt token using HS256 or RS256
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256', 'RS256'])
            current_user = UserRole.query.filter_by(id=data['public_id']).first_or_404()
            
            # if the email and the email in token is not the same then abort 403 (unauthorized)
            if current_user.email != data['email']:
                abort(403)
            
        except :
            # if the token cannot be decoded then abort 403 (unauthorized)
            abort(403)
            
        return f(current_user, *args, **kwargs)
    return decorated

def check_user(token):
    # check if token exists
    if token is None:
        return -1
    
    try:
        # try to decode the jwt token
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256', 'RS256'])
        current_user = UserRole.query.filter_by(id=data['public_id']).first()
        
        # if the email and the email in token is not the same then return -1
        if current_user.email != data['email']:
            return -1
        return current_user
    
    # if the token cannot be decoded then return -1
    except:
        return -1
#########################################################################################################
    
#########################################################################################################
@login_manager.user_loader
def load_user(id):
    # getting user object everytime user is logged in
    return UserRole.query.get(id)

@login_manager.unauthorized_handler
def unauthorized():
    # handles unauthorized user and redirect to login page
    return redirect(url_for('login_page'))
#########################################################################################################

#########################################################################################################
# importing API
import API
#########################################################################################################

#########################################################################################################
# importing all pages
import pageAdmin
import pageLogin
import pageStudent
import pageTeacher
import pageHelpGuide
# import pageDocumentation
import server.status_code
#########################################################################################################

#########################################################################################################
# @autodoc.doc(groups='admin')
@app.route('/admin/pdf_template/<string:path>')
@login_required
@compress.compressed()
def render_pdf_template(path):
    """ This is endpoint for rendering HTML """
    # reading all character in html file
    with open(f"templates/pdf_template/{path}", "r", encoding='utf-8') as f:
        text = f.read()
        
    return text
#########################################################################################################


#########################################################################################################
# initialize database if there is no table in database
@app.before_first_request
def make_db():
    engine = db.engine
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    if len(tables) == 0:
        db.create_all()
        from Models.Admin import Admins
        from Models.Teacher import Teachers
        from Models.UserRole import UserRole

        new_admin = Admins(user_id=1, name="Admin")
        new_user1 = UserRole(email="admin@binus.ac.id", password="Admin123", role="Admin")
        new_teacher = Teachers(user_id=2, name="Devi", role="OPERATIONAL", jurusan="", can_see_records=True)
        new_user2 = UserRole(email="operational@binus.ac.id", password="devi123", role="Teacher")

        datas = [new_admin, new_user1, new_teacher, new_user2]
        db.session.add_all(datas)
        db.session.commit()
#########################################################################################################
