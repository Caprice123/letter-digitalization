
from typing import Any, List, Tuple
from werkzeug.datastructures import ImmutableDict
from Handler.Admin import AdminAdminHandler
from Interface.Category import CategoryInterface
from Interface.Record import RecordInterface
from Interface.Student import StudentInterface
from Interface.Teacher import TeacherInterface
from Interface.Admin import AdminInterface
from flask import render_template, abort
from datetime import datetime
import os
import pdfkit
from server import pdfkit_config, mail, app, brcypt
from flask_mail import Message
from Models.UserRole import UserRole
import re

from server.error_code import InsufficientStorage
 
#########################################################################################################
class StudentHandler:
    """
    A class that handles student page
    
    ATTRIBUTES
    ----------
    option : dict
        a option for making pdf from html
        
    admin_interface : AdminInterface
        a interface for getting admin data if recipients email not found
        
    student_interface : StudentInterface
        a interface for getting student data
        
    record_interface : RecordInterace
        a interface for getting record data
        
    teacher_interface : TeacherInterface
        a interface for getting teacher data
        
    status : int
        indication whether the recipients of the email exists
        
    
    METHODS (PUBLIC)
    ----------
    get_view(page : int) -> Tuple[list, list, dict]
        a method for getting all categories, records and user based on current user id
        
    create_record(form : ImmutableDict) -> Tuple[dict, dict]
        a method for creating new record and connecting that new record to the current user
    
    send_email(category : dict, record : dict, form : ImmutableDict) -> None
        a method for sending email for teacher to know the records
        
    change_password(current_user : UserRole, form : ImmutableDict) -> None:
        a method for changing password of current user 
        
    METHODS (PRIVATE)
    ----------
    __filter_form(form: ImmutableDict, *excludes) -> dict
        a method for filtering the form from the leading and trailing space from the value of the form
    
    __prepare_pdf(category : dict, record : dict, form : ImmutableDict) -> Tuple[Any, Any]
        a method for preparing new pdf based on the record that is made from the student
        
    __create_pdf(template : str, path : str)
        a method for creating new pdf based on template
        
    __prepare_email(record : dict, path : str) -> Message
        a method for preparing email that will be sent to teacher
    
    __get_cc() -> List[str]
        a method that will be preparing for cc of the email
        
    __get_recipients(record : dict) -> List[str]
        a method that will be preparing the recipients of the email
    """
    def __init__(self, token: str, id: int) -> None:
        """
        Parameters
        -----------
        token : str
            token that will be used for API
            
        id : int
            current user id
            
        page : int
            page user
            
        """
        self.__options = {
            'page-size': 'A4',
            "enable-local-file-access": True
        }
        self.__student_interface = StudentInterface(token)
        self.__category_interface = CategoryInterface(token)
        self.__admin_interface = AdminInterface(token)
        self.__record_interface = RecordInterface(token)
        self.__teacher_interface = TeacherInterface(token)
        self.__user = self.student_interface.get(user_id = id)
        self.__user = self.__user['students'][0]
        self.__status = 0
        
    #########################################################################################################
    # PUBLIC METHOD
    def get_view(self, page: int) -> Tuple[list, dict, dict]:
        """
        Getting all categories, records and user based on current user id
        
        Parameters
        -----------
        page
            the page of the record
            
        Return 
        -----------
        categories
            all categories that is disabled and can be used for making new record
        
        records
            all records that was made by current user
            
        user
            dictionary of current user object
        """
        id = self.user['user_id']
        
        # getting all available category using REST API (GET)
        categories = self.category_interface.get(disabled=False)
        
        # getting all record that is sent by the current user using REST API (GET)
        records = self.record_interface.get(sent_by_user_id=id, page=page)
        user = self.user
        return (categories, records, user)

    def create_record(self, form: ImmutableDict) -> Tuple[dict, dict]:
        """
        Creating new record and connecting that new record to the current user
        
        Parameters
        -----------
        form : ImmutableDict
            response data from the form
            
        Return 
        -----------
        category
            dictionary of category object of the record that will be made
        
        records
            dictionary of record object that is made
        """
        user = self.user
        
        # parsing data
        user_id = user['user_id']
        category_id = form['category_id']
        jurusan = user['jurusan']
        
        # getting the category data based on category id
        print(form)
        category = self.category_interface.get(category_id=form['category_id'])
        category = category['categories'][0]
        
        # creating new record using REST API (POST)
        record = self.record_interface.create( user_id=user['user_id'],
                                                category_id=form['category_id'],
                                                jurusan=user['jurusan'])
        return (record, category)
        
    def send_email(self, category: dict, record: dict, form: ImmutableDict) -> None:
        """
        Sending email for teacher to know the records
        
        Parameters
        ----------
        category : dict
            category of the corresponding record
        
        record : dict
            record that was made
        
        form : ImmutableDict
            response data from the form    
        
        Return
        ----------
        None
        
        """
        with app.app_context():
            # preparing the pdf
            pdf_without_signed, pdf_with_signed = self.__prepare_pdf(category, record, form)
            
            # constructing the email
            msg = self.__prepare_email(record, pdf_without_signed)
            
            # sending the email
        #     mail.send(msg)
        
    def change_password(self, current_user: UserRole, form: ImmutableDict) -> None:
        """
        Changing password of current user 
        
        Parameters
        -----------
        current_user : UserRole
            current user object
            
        form : ImmutableDict
            response data from the form
            
        Return
        -----------
        None
        """
        # checking the current password inputted by the user and database
        # checking the new password is the same as the confirm new password 
        if (brcypt.check_password_hash(current_user.password_hash, form['currentpassword'])
            and form["confirmnewpassword"] == form["createnewpassword"] ):
            
            # parsing data
            email = current_user.email
            password = form['confirmnewpassword']
            
            # changing the password of the student using REST API (PATCH)
            self.student_interface.change_password(email = email, password = password)
            
        # abort 406 (forbidden) if the current password is not the same at the database 
        # and the new password is not the same as the new password 
        else:
            abort(406)
    #########################################################################################################
    
    #########################################################################################################
    # PRIVATE METHOD
    def __prepare_pdf(self, category: dict, record: dict, form: ImmutableDict) -> Tuple[Any, Any]:
        """
        Preparing new pdf based on the record that is made from the student
        
        Parameters
        -----------
        category : dict
            category object that correspondens to the record
            
        record : dict
            record object that is made by the user
            
        form : ImmutableDict
            response data from the form
            
        Return
        -----------
        pdf_without_signed
            new pdf that is made without Dean's signature
            
        pdf_with_signed
            new pdf that is made with Dean's signature
        """
        # cleaning form 
        data = self.__filter_form(form)
        for key, value in data.items():
            value = value.replace("\r", "")
            value = value.split(",")
            value = list(map(lambda text: text.strip(), value))
            data[key] = "<br>".join(value)
            
        print(data)
        # parsing data
        title = record['title']
        name = record['has_record']['name']
        nim = record['has_record']['nim']
        record_id = record['record_id']
        jurusan = record['jurusan'].split(" ")
        jurusan = [text.capitalize() for text in jurusan]
        jurusan = " ".join(jurusan)
        
        # preparing the data
        romanian = [ 'I' , 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII' ]
        data['name'] = name
        data['nim'] = nim
        data['major'] = jurusan
        data['no'] = record_id
        data['date'] = datetime.now().strftime('%d')
        data['month'] = datetime.now().strftime('%B')
        data['year'] = datetime.now().strftime("%Y")
        data['bulan_terbit'] = datetime.now().strftime('%m')
        data['bulan_terbit'] = romanian[int(data['bulan_terbit']) - 1]
        data['subject'] = title
        
        # preparing html that will be converted to pdf
        rendered_without_signed  = render_template(category['path_format'],
                                                    data=data)
        rendered_with_signed  = render_template(category['path_format'],
                                                    data=data,
                                                    accepted=True)
        
        
        # prepare the name of the file
        filename = f"{title.replace(' ', '_')}_{nim}_{record_id}.pdf"
        signed_filename = f"{title.replace(' ', '_')}_{nim}_{record_id}_signed.pdf"
        
        # prepare the path of file
        file_path_without_signed = os.path.join(os.getcwd(),
                                               "templates",
                                               "saved", 
                                                filename)
        file_path_with_signed = os.path.join(os.getcwd(),
                                               "templates",
                                               "saved", 
                                               signed_filename)
        
        # generating pdf
        try:
            pdf_without_signed = self.__create_pdf(rendered_without_signed, file_path_without_signed)
        except:
            raise InsufficientStorage()
            
        try:
            pdf_with_signed = self.__create_pdf(rendered_with_signed, file_path_with_signed)
        except:
            raise InsufficientStorage()
        return (file_path_without_signed, file_path_with_signed)
    
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
        # filtering all html tag
        
        filtered_form = {}
        
        for key in form: 
            if key not in excludes:
                
                # remove space and abort if it is empty
                if len(form[key].strip()) == 0:
                    abort(424)
                    
                
            # save the data to new dictionary
            value = re.sub(r"\<([\S\s]*?)\>([\S\s]*?)\</([\S\s]*?)\>", "", form[key].strip())
        
            filtered_form[key] = value.strip()                
        return filtered_form
        
    def __create_pdf(self, template: str, path: str) -> Any:
        """
        Creating new pdf based on template
        
        Parameters
        -----------
        template : str
            template Jinja template that will be created
            
        path : str
            output pdf file path
            
        Return
        -----------
        generated pdf
        """
        return pdfkit.from_string(template, path, options=self.__options, configuration=pdfkit_config)
        
    
    def __prepare_email(self, record: dict, path: str) -> Message:
        """
        Preparing email that will be sent to teacher
        
        Parameters
        -----------
        record : dict
            record object that is created by the user
            
        path : str
            output pdf file path
            
        Return
        -----------
        msg
            Message object for the email
        """
        # preparing cc of the email
        cc = self.__get_cc()
        
        # prepraring the recipients of the email
        recipients = self.__get_recipients(record)
        
        # remove cc if already exists in recipients
        cc = [email for email in cc if email not in recipients]
        
        # parsing data
        title = record['title']
        student_name = record['has_record']['name']
        student_nim = record['has_record']['nim']
        record_id = record['record_id']
        
        # preparing the email
        msg = Message(f"{title}_{student_nim}",
                      sender=app.config['MAIL_USERNAME'],
                      recipients=recipients,
                      cc=cc)
        
        # recipients email detected
        if self.status == 1:
            msg.body = f"""{student_name},\n{student_nim},\nPermohonan {title}"""
        else:
            msg.body = f"Missing account email for teacher with role {record['required_role_accept'][0]} for major {record['jurusan']}.\nPlease make the account with major if the teacher only responsible in one major else leave the major form blank."
        
        
        print("CC -> ", cc)
        print("Recipients -> ", recipients)
        print("File -> ", path)
        print("Message -> ", msg.body)
        
        # recipients email detected then attach filte
        if self.status == 1:
            # attaching file pdf to the email
            with app.open_resource(path) as fp:
                msg.attach(f"{title}_{student_nim}_{record_id}.pdf", "application/pdf", fp.read())
        
    
        return msg
    
    def __get_cc(self) -> List[str]:
        """
        Preparing for cc of the email
        
        Parameters
        -----------
        None
            
        Return
        -----------
        cc
            the cc for the email
        """
        
        cc = []
        
        # recipients email detected then add cc
        if self.status == 1:
            # getting all operational teacher for supervising
            operational = self.teacher_interface.get(can_see_records=True)
            operational = operational['teachers']
            
            # append the emails to the cc
            for teacher in operational:
                if teacher['jurusan'] == "" or teacher['jurusan'] == self.user['jurusan']:
                    cc.append(teacher['email'])
        
        return cc
    
    def __get_recipients(self, record: dict) -> List[str]:
        """
        Preparing for recipients of the email
        
        Parameters
        -----------
        record : dict
            record object that is made by the user
            
        Return
        -----------
        recipients
            the recipients for the email
        """
        recipients = []
        
        # getting the recipients of the email. Check the teacher has role or not.
        # If the teacher with major has data then append it if not then find the teacher with major
        
        next_email = self.teacher_interface.get(role=record['required_role_accept'][0], jurusan=record['jurusan'])
        next_email = next_email['teachers']
        if len(next_email) == 0:
            next_email = self.teacher_interface.get(role=record['required_role_accept'][0])
            next_email = next_email['teachers']
            
        
        # append the emails to the recipients if recipients email detected   
        # else alert the admin
        if next_email:
            for teacher in next_email:
                recipients.append(teacher['email'])
            self.status = 1
        else:
            next_email = self.admin_interface.get()['admins']
            for admin in next_email:
                recipients.append(admin['email'])
            self.status = 0
        
        
        return recipients
    #########################################################################################################
    
    #########################################################################################################
    # PRIVATE VARIABLE
    @property
    def student_interface(self):
        return self.__student_interface
    
    
    @student_interface.getter
    def student_interface(self):
        return self.__student_interface
    
    @property
    def admin_interface(self):
        return self.__admin_interface
    
    
    @admin_interface.getter
    def admin_interface(self):
        return self.__admin_interface
    
    @property
    def category_interface(self):
        return self.__category_interface
    
    @category_interface.getter
    def category_interface(self):
        return self.__category_interface
    
    @property
    def teacher_interface(self):
        return self.__teacher_interface
    
    @teacher_interface.getter
    def teacher_interface(self):
        return self.__teacher_interface
    
    
    @property
    def record_interface(self):
        return self.__record_interface
    
    @record_interface.getter
    def record_interface(self):
        return self.__record_interface
    
    @property
    def user(self):
        return self.__user
    
    @user.getter
    def user(self):
        return self.__user
    
    @property
    def status(self):
        return self.__status
    
    @status.getter
    def status(self):
        return self.__status
    
    @status.setter
    def status(self, status):
        self.__status = status
    #########################################################################################################
#########################################################################################################

