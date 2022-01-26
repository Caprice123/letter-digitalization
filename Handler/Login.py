from flask_mail import Message
from werkzeug.datastructures import ImmutableDict
from Models.Student import Students
from Models.UserRole import UserRole

from server import brcypt, app, ts, mail, db
from flask import redirect, make_response, url_for, session, flash, Response, abort
from flask_login import logout_user, login_user, current_user
import jwt
from datetime import datetime, timedelta

#########################################################################################################
class LoginHandler:
    """
    A class that handles login and logout page
    
    ATTRIBUTES
    ----------
    None
        
    
    METHODS (PUBLIC)
    ----------
    login(form : ImmutableDict) -> Response
        a method for checking username and password and logining a user
        
    logout() -> Response
        a method for logoutting current user
    
    register(form : ImmutableDict) -> Response
        a method for registering new user with student role
        
    send_confirmation_email(subject : str, email : str, html : str) -> None
        a method for sending confirmation email if user forgets his / her password
    
    generate_confirmation_token(payload : int) -> _t_str_bytes
        a method for generating confirmation token if user forget the password

    METHODS (PRIVATE)
    ----------
    __generate_token(id : int, email : str) -> str
        a method for generating jwt token for activating API
        
    __check_user_by_email(email : str) -> bool
        a method for checking whether email is already inside the database
    
    __create_new_user(email : str, password : str, name : str, nim : int, jurusan : str) -> UserRole
        a method for creating new user with role student
        
    __filter_form(form: ImmutableDict, *excludes) -> dict
        a method for filtering the form from the leading and trailing space from the value of the form
    
    """
    #########################################################################################################
    # PUBLIC METHOD
    def login(self, form: ImmutableDict) -> Response:
        """
        Checking username and password and logining a user
        
        Parameters
        -----------
        form
            response data from the form
        
        Return 
        -----------
        response
            response object that contain url and response httponly cookie with jwt token
        """
        # cleaning form
        form = self.__filter_form(form)
        
        # checking the user
        user = UserRole.query.filter(UserRole.email == form['email']).first_or_404()
        role = user.role
        
        # if password in database and password inputted the same, then user is authenticated
        if (brcypt.check_password_hash(user.password_hash, form['password'])):
            flash("You have successfully logged in", "Success")
            
            # redirecting to each page according to the role of the user
            if (role == "Student"):
                session['default_url'] = url_for('student_page', page=1)
                response = make_response(redirect(url_for('student_page', page=1)))
                
            elif (role == "Teacher"):
                session['default_url'] = url_for('teacher_page', page=1, status="sent")
                response = make_response(redirect(url_for('teacher_page',  page=1, status="sent")))
                
            elif (role== "Admin"):
                session['default_url'] = url_for('admin_record_page', page=1)
                response = make_response(redirect(url_for('admin_record_page', page=1)))
                
            
            # login the user
            login_user(user, remember=True)
            
            # generating jwt token for activating the API
            token = self.__generate_token(user.id, user.email)
            print(token)
            response.set_cookie('token', token, httponly=True)
            
        # return the error if the password is not matched 
        else:
            flash("Incorrect username and password", 'Error')
            response = make_response(redirect(url_for('login_page')))
        return response
        
    def logout(self) -> Response:    
        """
        Logoutting current user
        
        Parameters
        -----------
        None
        
        Return 
        -----------
        response
            response object that contain url and deleted cookie response
        """
        # redirecting to login page
        response = make_response(redirect(url_for('login_page')))
    
        # removing all cookie
        response.delete_cookie('token')
        
        # logouting user
        logout_user()
        return response
    
    def register(self, form: ImmutableDict) -> Response:
        """
        Registering new user with student role
        
        Parameters
        -----------
        form
            response data from the form
        
        Return 
        -----------
        response
            response object that contain url and deleted cookie response
        """
        # cleaning form
        form = self.__filter_form(form)
        
        # parsing data
        name = form['name']
        name = [n.capitalize() for n in name.split()]
        name = " ".join(name)
        nim = int(form['nim'])
        jurusan = form['jurusan']
        email = form['email'].lower()
        password = form['password']
        confirmation_password = form['confirmation-password']
        
        # checking if the user already exists or not
        if self.__check_user_by_email(email):
            # checking if the password and confirmation password is the same
            if password == confirmation_password:
                
                # creating new student
                new_user = self.__create_new_user(email, password, name, nim, jurusan)
                # session['default_url'] = url_for('student_page', page = 1)
                
                # # generating jwt token for activating API
                # token = self.__generate_token(new_user.id, new_user.email)
                # print(token)
                
                # # loginning new user
                # login_user(new_user, remember=True)
                # response = make_response(redirect(url_for('student_page', page = 1)))
                # response.set_cookie('token', token, httponly=True)
                
                # account has been successfully created
                flash("Your account has been created", "Success")
                response = make_response(redirect(url_for('login_page')))
                
            
            # password doesn't match, go back to login page again
            else:
                flash('Password does not match', "Error")
                response = make_response(redirect(url_for('login_page')))
        
        # email already exists, go back to login page again
        else:
            flash('Email address already exists', "Error")
            response = make_response(redirect(url_for('login_page')))
        return response
        
    def send_confirmation_email(self, subject: str, email: str, html: str) -> None:
        """
        Sending confirmation email if user forgets his / her password
        
        Parameters
        -----------
        subject
            subject of the email
            
        email
            the email of the user who forgets his / her password
            
        html
            the content body html of the email
        
        Return 
        -----------
        None
        """
        # sending the confirmation email
        with app.app_context():
            msg = Message(subject, 
                            recipients=[email],
                            html=html,
                            sender=app.config['MAIL_USERNAME'])
            mail.send(msg)
            
    def generate_confirmation_token(self, payload: int) -> str: 
        """
        Generating confirmation token if user forget the password
        
        Parameters
        -----------
        payload
            data that will be tokenized
            
        Return
        -----------
        a tokenized string for activating the reset password
        
        """
        # generating confirmation email token
        return ts.dumps(payload, salt=app.config['SECURITY_PASSWORD_SALT'])
    #########################################################################################################
    
    #########################################################################################################
    # PRIVATE METHOD
    def __generate_token(self, id: int, email: str) -> str:
        """
        Generating jwt token for activating API
        
        Parameters
        -----------
        id : int
            current user id that will be tokenized
        
        email : str
            the email of current user    
        
        Return
        -----------
        token
            jwt token that contains user id 
        
        """
        # generating jwt token with time delta 365 days
        data = {
            "public_id": id,
            "email": email,
            'exp': datetime.utcnow() + timedelta(days=365)
        }
        token = jwt.encode(data, key=app.config['SECRET_KEY'])
        return token
        
    def __check_user_by_email(self, email: str) -> bool:
        """
        Checking whether email is already inside the database
        
        Parameters
        -----------
        email : str
            email of the user who forgets his / her password
        
        Return
        -----------
        boolean whether user email already exists in database
        """
        # checking if the user already has account in the database
        user = UserRole.query.filter_by(email=email.lower()).all()
        return True if len(user) == 0 else False
        
    def __create_new_user(self, email: str, password: str, name: str, nim: int, jurusan: str) -> UserRole:
        """
        Creating new user with role student
        
        Parameters
        -----------
        email : str
            email of new user
        
        password : str
            password of the new user
        
        name : str
            name of the new user
            
        nim : int
            nim of the new user
            
        jurusan : int
            major of the new user
        
        Return
        -----------
        new_user
            UserRole object that is created for the new user
        """
        # making new account 
        new_user = UserRole(email = email.lower(), password = password, role = "Student")
        db.session.add(new_user)
        db.session.commit()
        
        # making new student account
        new_student = Students(user_id = new_user.id,
                               name=name,
                               nim=nim,
                               jurusan=jurusan)
        db.session.add(new_student)
        db.session.commit()
        return new_user
    
    def __filter_form(self, form: ImmutableDict, *excludes) -> dict:
        """
        Filtering the form from the leading and trailing space from the value of the form
        
        Parameters
        ----------
        form : ImmutableDict
            the user input from form at HTML
            
        *excludes :   
            exclude the form if the column is optional 
            
        Return 
        ----------
        filtered_form : dict
            the filtered form that is cleaned from leading and trailing space        
        """
        
        filtered_form = {}
        for key in form: 
            if key not in excludes:
                # remove space and abort if it is empty
                if len(form[key].strip()) == 0:
                    abort(424)
                
            # save the data to new dictionary
            filtered_form[key] = form[key].strip()                
        return filtered_form
    #########################################################################################################
#########################################################################################################
