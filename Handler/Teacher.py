from typing import List, Tuple
from werkzeug.datastructures import ImmutableDict
from Interface.Admin import AdminInterface
from Interface.Record import RecordInterface
from Interface.Student import StudentInterface
from Interface.Teacher import TeacherInterface
from Models.UserRole import UserRole
from flask_mail import Message
from server import app, mail, brcypt
import os
from flask import abort
import shutil

#########################################################################################################
class TeacherHandler:
    """
    A class that handles teacher page
    
    ATTRIBUTES
    ----------
    record_interface : RecordInterace
        a interface for getting record data
        
    teacher_interface : TeacherInterface
        a interface for getting teacher data
        
    student_interface : StudentInterface
        a interface for getting student data
        
    
    METHODS (PUBLIC)
    ----------
    get_view(page: int) -> Tuple[list, list, dict]
        a method for getting all records
        
    process_action(id : int, form : ImmutableDict) -> Tuple[dict, dict]
        a method for accepting or rejecting specific record
    
    send_email(id : int, category : dict, record : dict, form : ImmutableDict) -> None
        a method for sending email for the next step
        
    change_password(current_user : UserRole, form : ImmutableDict) -> None:
        a method for changing password of current user 
        
    METHODS (PRIVATE)
    ----------
    __get_teacher(id : int) -> dict
        a method for getting the teacher based on current user id
        
    __process_file(form: ImmutableDict, record: dict) -> None
        a method for deleting or moving the pdf file
        
    __prepare_email(record : dict, path : str) -> Message
        a method for preparing email that will be sent to the next step
    
    __get_cc() -> List[str]
        a method that will be preparing for cc of the email
        
    __delete_pdf(self, path: str) -> None:
        a method for deleting a pdf
        
    __get_recipients(record : dict) -> List[str]
        a method that will be preparing the recipients of the email
    
    __filter_form(form: ImmutableDict, *excludes) -> dict
        a method for filtering the form from the leading and trailing space from the value of the form
    
    """
    def __init__(self, token: str, id: int) -> None:
        """
        Parameters
        -----------
        token : str
            token that will be used for API
            
        id : int
            current user id
        """
        self.__record_interface = RecordInterface(token)
        self.__teacher_interface = TeacherInterface(token)
        self.__student_interface = StudentInterface(token)
        self.__admin_interface = AdminInterface(token)
        self.__user = self.__get_teacher(id)
        self.__status = 0
        
    #########################################################################################################
    # PUBLIC METHOD
    def get_view(self, page: int, status: str) -> Tuple[dict, list]:
        """
        Getting the dictionary of the current teacher object and all records that is visible by the role 
        
        Parameters
        -----------
        page
            page of the record
            
        status
            status of the record
            
        Return 
        -----------
        teacher
            dictionary of current teacher object
        
        records
            all records that is visible to current role
        """
        teacher = self.user
        
        # parsing data user
        jurusan = teacher['jurusan']
        role = teacher['role']
        
        # getting specific record jurusan if teacher has jurusan or getting all record if teacher doesn't have jurusan using REST API (GET) 
        if jurusan:
            records = self.record_interface.get(jurusan = jurusan, page = page, status=status, teacher_id=self.user['user_id'])
        else:
            records = self.record_interface.get(page = page, status=status, teacher_id=self.user['user_id'])
        
        return (teacher, records)
    
    def process_action(self, form: ImmutableDict) -> Tuple[dict, dict]:
        """
        Accepting or rejecting specific record
        
        Parameters
        -----------
        form : ImmutableDict
            response data from the form
            
        Return 
        -----------
        teacher
            dictionary of current teacher object
        
        record_updated
            dictionary of updated record object
        """
        # cleaning form
        form = self.__filter_form(form)
        
        teacher = self.user
        # parsing data user
        role = teacher['role']
        
        # updating the record using REST API (PATCH)       
        record_updated = self.record_interface.update( form, role)            
        return (teacher, record_updated)
    
    def send_email(self, teacher: dict, record: dict, form: ImmutableDict) -> None:
        """
        Sending email for the next step
        
        Parameters
        -----------
        teacher : dict
            current user object
        
        record : dict
            corresponding record object    
            
        form : ImmutableDict
            response data from the form
            
        Return 
        -----------
        None
        """
        with app.app_context():
            # cleaning form
            form = self.__filter_form(form)
        
            # parsing data
            destinations = record['required_role_accept']
            student_id = record['has_record']['user_id']
            student_major = record['jurusan']
            role = teacher['role']
            filename = f"{record['title'].replace(' ', '_')}_{record['has_record']['nim']}"
            response = form['response']
            
            
            
            # preparing cc and recipients of the email
            cc = self.__get_cc(response, student_id)
            recipients = self.__get_recipients(response, destinations, student_major, role, student_id=student_id)
            
            # remove cc if already exists in recipients
            cc = list(filter(lambda email: email not in recipients, cc))
            
            # constructing the email
            if (self.status ):
                msg = self.__prepare_email(form, record, cc, recipients)
            else:
                msg, msg2 = self.__prepare_email(form, record, cc, recipients)
            
            # sending the email
            # if self.status:
            #     mail.send(msg)
            # else:
            #     mail.send(msg)
            #     mail.send(msg2)
            
            # move the file if status record already fully accepted or remove the files if the status record already rejected
            self.__process_file(form, record)
    
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
        # cleaning form
        form = self.__filter_form(form)
        
        # checking the current password inputted by the user and database
        # checking the new password is the same as the confirm new password 
        if brcypt.check_password_hash(current_user.password_hash, form['currentpassword'])\
            and form['confirmnewpassword'] == form['createnewpassword']:
                email = current_user.email
                password = form['confirmnewpassword']
                
                # updating teacher password using REST API (PATCH)
                self.teacher_interface.change_password( email=email, password=password )
        
        # abort 406 (forbidden) if the current password is not the same at the database 
        # and the new password is not the same as the new password 
        else:
            abort(406)
    #########################################################################################################
    
    #########################################################################################################
    # PRIVATE METHOD
    def __get_teacher(self, id: int) -> dict:
        """
        Getting the teacher based on current user id
        
        Parameters
        ----------
        id 
            current user id
            
        Return 
        dictionary of current id teacher object
        """
        return self.teacher_interface.get(user_id=id)['teachers'][0]
    
    def __process_file(self, form: ImmutableDict, record: dict) -> None:
        """
        Deleting or Moving the pdf 
        
        Parameters
        ----------
        id 
            current user id
            
        Return 
        dictionary of current id teacher object
        """
        
        # parsing data
        title = form['title'].replace(' ', '_')
        nim = record['has_record']['nim']
        record_status = record['status']
        record_id = record['record_id']
        
        # preparing file name
        filename = f"{title}_{nim}_{record_id}.pdf"
        signed_filename = f"{title}_{nim}_{record_id}_signed.pdf"
        
        # preparing file path
        file_path = os.path.join(os.getcwd(), "templates", "saved", filename)
        signed_file_path = os.path.join(os.getcwd(), "templates", "saved", signed_filename)
        
        # if the record status has been fully accepted
        if record_status == "accepted":
            # remove the file without signature
            self.__delete_pdf(file_path)
            
            # move the signature file to the accepted pdf folder
            shutil.move(signed_file_path, os.path.join(os.getcwd(), "accepted_pdf", signed_filename))
                
        # if the record status has been rejected
        elif record_status == "rejected":
            # remove all file
            self.__delete_pdf(file_path)
            self.__delete_pdf(signed_file_path)
            
    def __prepare_email(self, form : ImmutableDict, record : dict, cc : List[str], recipients: List[str]) -> Message or Tuple[Message, Message]:
        """
        Preparing email that will be sent to the next step
        
        Parameters
        -----------
        form : ImmutableDict
            response data from the form
            
        record : dict
            dictionary of corresponding record that is accepted / rejected
            
        cc : List[str]
            the cc for the email
            
        recipients : List[str]
            the recipients of the email
        
        
        Return
        -----------
        msg
            Message object for the email
            
        msg2 
            Message object because cannot find the email
        """
        # parsing data
        title = form['title'].replace(' ', '_')
        form_response = form['response']
        student_nim = record['has_record']['nim']
        record_status = record['status']
        record_id = record['record_id']
        
        destinations = record['required_role_accept']
        role_now = self.user['role']
        
        
                
        # preparing filename
        filename = f"{title}_{student_nim}_{record_id}.pdf"
        signed_filename = f"{title}_{student_nim}_{record_id}_signed.pdf"
        
        # preparing the path of the file
        file_path = os.path.join(os.getcwd(), "templates", "saved", filename)
        signed_file_path = os.path.join(os.getcwd(), "templates", "saved", signed_filename)
        
        # preparing the file that will be sent
        file_will_be_sent = file_path
        
        # if record status has been fully accepted
        if record_status == "accepted":
            # append the student email to the recipients instead in cc
            recipients.append(cc.pop(0))
            
            # update the file that will be sent
            file_will_be_sent = signed_file_path
            
        # if status is 1 then recipients contain the next email and cc contains the student and operational
        # else recipients contain the admins and cc contains the student and operational
                
        # preparing the email
       
        msg = Message(f"{form['title']} {form['response']}",
                    sender=app.config['MAIL_USERNAME'],
                    recipients=recipients, 
                    cc = cc)
        
        if self.status == 0:
            msg.recipients = []
            msg2 = Message("Missing account email",
                            sender=app.config['MAIL_USERNAME'],
                            recipients=recipients, 
                            cc = [])
            next_destination = destinations.index(role_now)
            next_destination = destinations[next_destination + 1]
            msg2.body = f"Missing account email for teacher with role {next_destination} for major {record['jurusan']}.\nPlease make the account with major if the teacher only responsible in one major else leave the major form blank."
            print("missing email")
            
        msg.body = "Surat Diterima" if form_response == "accepted" else "Surat Ditolak"

        print("CC -> ", cc)
        print("Recipients -> ", recipients)
        print("File -> ", file_will_be_sent)
        print("Message -> ", msg.body)
            
        # attach the file to the email
        with app.open_resource(file_will_be_sent) as fp:
            msg.attach(f"{title}_{student_nim}_{record_id}.pdf", "application/pdf", fp.read())
            
            
        return msg if self.status else (msg, msg2)
    
    def __delete_pdf(self, path: str) -> None:
        """
        Removing the pdf
        
        Parameters
        -----------
        path: str
            the path of file that will be deleted
            
        Return 
        -----------
        None
        
        """
        if os.path.exists(path):
            os.remove(path)
            
    def __get_recipients(self, response: str, destinations: List[str], jurusan: str, role_now: str, student_id: int = None) -> List[str]:
        """
        Preparing for recipients of the email
        
        Parameters
        -----------
        response: str
            response of the teacher    
    
        destinations : List[str]
            all steps that is required for the record to be marked as accepted
        
        jurusan : str
            current major of the teacher
        
        role_now : str
            current role of the teacher
            
        Return
        -----------
        recipients
            the recipients for the email
        """
        recipients = []
        
        # if the teacher response if accepted
        if response == "accepted":
            try:
                # search next role that will be needed
                next_destination = destinations.index(role_now)
                next_destination = destinations[next_destination + 1]
                
                # getting the recipients of the email. Check the teacher has role or not.
                # If the teacher with major has data then append it if not then find the teacher with major
        
                next_user = self.teacher_interface.get(role = next_destination, jurusan=jurusan)
                next_user = next_user['teachers']
                
                if len(next_user) == 0:
                    next_user = self.teacher_interface.get(role=next_destination)
                    next_user = next_user['teachers']
                else:
                    next_user = next_user
                
                # append the emails to the recipients if recipients email detected   
                # else alert the admin
                if next_user:
                    for teacher in next_user:
                        recipients.append(teacher['email'])
                    self.status = 1
                    
                else:
                    next_email = self.admin_interface.get()['admins']
                    for admin in next_email:
                        recipients.append(admin['email'])
                    self.status = 0
                
            except IndexError:
                self.status = 1
            
        # if teacher response is rejected
        elif response == "rejected":
            # append the student email
            student_email = UserRole.query.filter_by(id=student_id).first_or_404()
            recipients.append(student_email.email)
        
        
        return recipients
    
    def __get_cc(self, response: str, student_id: int, ) -> List[str]:
        """
        Preparing for cc of the email
        
        Parameters
        -----------
        response: str
            response of the teacher
        
        student_id : int
            the student id for the cc of the email
            
        Return
        -----------
        cc
            the cc for the email
        """
        cc = []
        
        
        # if the teacher response if accepted
        student = self.student_interface.get(user_id = student_id)['students'][0]
        if response == "accepted":
            # append the student email to cc
            cc.append(student['email'])
        
        # get all email of teacher with ability can see all records
        can_see_records = self.teacher_interface.get(can_see_records=True)
        can_see_records = can_see_records['teachers']
        
        for teacher in can_see_records:
            if teacher['jurusan'] == "" or teacher['jurusan'] == student['jurusan']:
                cc.append(teacher['email'])
            
        return cc
    
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
    # PRIVATE VARIABLE
    @property
    def student_interface(self):
        return self.__student_interface
    
    @student_interface.getter
    def student_interface(self):
        return self.__student_interface
    
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
    def admin_interface(self):
        return self.__admin_interface
    
    
    @admin_interface.getter
    def admin_interface(self):
        return self.__admin_interface
    
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