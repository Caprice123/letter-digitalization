from typing import Tuple
from werkzeug.datastructures import ImmutableDict
from Interface.Admin import AdminInterface
from Interface.History import HistoryInterface
from Interface.Student import StudentInterface
from Interface.Category import CategoryInterface
from Interface.Teacher import TeacherInterface
from Interface.Record import RecordInterface
from server import brcypt, app
from flask import abort, render_template
import re
import codecs
import os
from Models.UserRole import UserRole

#########################################################################################################
class AdminHandler():
    """
    A class that handles all admin page
    
    ATTRIBUTES
    ----------
    admin_interface : AdminInterface
        a interface for making all admin data
        
    history_interface : HistoryInterface
        a interface for making all history data
    
    id : int
        current user id
        
    
    METHODS (PUBLIC)
    ----------
    change_password(current_user : UserRole, form : ImmutableDict) -> None
        a method for changing current user password based on the form that user inputted
        
    METHODS (PROTECTED)
    ----------
    _create_history(*description) -> None
        a method for making creating history based on the id of the current user
        
    _filter_form(form: ImmutableDict, *excludes) -> dict
        a method for filtering the form from the leading and trailing space from the value of the form
    
    """
    def __init__(self, token: str, id: int) -> None:
        """
        Parameters
        ----------
        token : str
            a token for activating the API
            
        id : int
            current user id
        """
        self.__id = id
        self.__admin_interface = AdminInterface(token)
        self.__history_interface = HistoryInterface(token)
        
        self.__user = self.admin_interface.get(user_id=self.id)
        self.__user = self.__user['admins'][0]
    
    #########################################################################################################
    # PUBLIC METHOD    
    def change_password(self, current_user: UserRole, form: ImmutableDict) -> None:
        """
        Changing the password of current admin user
        
        Parameters
        ----------
        current_user : UserRole
            current user that is logged in
        form : ImmutableDict :   
            the user input from form at HTML
        
        Return 
        ----------
        None
        """
        
        # check if the current password is the same at the database and the new password is already the same as the new password
        if (brcypt.check_password_hash(current_user.password_hash, form['currentpassword'])
            and form["confirmnewpassword"] == form["createnewpassword"] ):
            
            # parsing data
            email = current_user.email
            password = form['confirmnewpassword']
            
            # changing the password of the user using REST API (PATCH)
            admin_updated = self.admin_interface.change_password(email=email, password=password)
        
        # abort 406 (forbidden) if the current password is not the same at the database 
        # and the new password is not the same as the new password 
        else:
            abort(406)
    #########################################################################################################
    
    #########################################################################################################
    # PROTECTED METHOD
    def _create_history(self, *description) -> None:
        """
        Create history for admin user based on their id
        
        Parameters
        ----------
        id : str
            current user id whose password will be changed
        description :   
            all descriptions that will be made 
            
        Return 
        ----------
        None
        """
        
        # creating new history
        new_history = self.history_interface.create(user_id = self.id, description = description)
        
    def _filter_form(self, form: ImmutableDict, *excludes) -> dict:
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
    def history_interface(self):
        return self.__history_interface
    
    @history_interface.getter
    def history_interface(self):
        return self.__history_interface

    @property
    def admin_interface(self):
        return self.__admin_interface
    
    @admin_interface.getter
    def admin_interface(self):
        return self.__admin_interface
    
    @property
    def id(self):
        return self.__id
    
    @id.getter
    def id(self):
        return self.__id
    
    @property
    def user(self):
        return self.__user
    
    @user.getter
    def user(self):
        return self.__user
    #########################################################################################################
#########################################################################################################


#########################################################################################################
class AdminAdminHandler(AdminHandler):
    """
    A class that handles admin page for user admin. Inherited from AdminHandler class
    
    ATTRIBUTES
    ----------
    admin_interface : AdminInterface
        a interface for making all admin data
        
    history_interface : HistoryInterface
        a interface for making all history data
        
    
    METHODS (PUBLIC)
    ----------
    get_admin_page(page : int) -> Tuple[list, dict]
        a method for getting all admin users except current user id
        
    create_new_admin(form : ImmutableDict) -> None
        a method for creating new admin based on form and make history based on current user id
    
    delete_admin(form : ImmutableDict) -> None
        a method for deleting admin based on the form and make history based on current user id
        
    edit_user(form : ImmutableDict) -> None
        a method for Editing the other user admin
    """
    def __init__(self, token: str, id: int) -> None:
        """
        Parameters
        ----------
        token : str
            a token for activating the API
            
        id : int
            current user id
        """
        super().__init__(token, id)
    
    #########################################################################################################
    # PUBLIC METHOD    
    def get_admin_page(self, page: int) -> Tuple[list, dict]:
        """
        Getting admin view 
        
        Parameters
        ----------
        page : int
            page of web
            
        Return
        ----------
        all_admins : dict
            all admins except the current user id
        
        self.user : dict
            the current user
        """
        # get all admin except the current user id
        all_admins = self.admin_interface.get(page = page, exception_user_id=self.id)
        return (all_admins, self.user)
    
    def create_new_admin(self, form: ImmutableDict) -> None:
        """
        Creating new admin and save the history of the current user
        
        Parameters
        ----------
        form : ImmutableDict
            the user input from form at HTML
            
        Return
        ----------
        None
        """
        # cleaning form
        form = self._filter_form(form)
        
        # parsing form
        name = form['name']
        email = form['email'].lower()
        password = name.split(" ")[0].lower() + "123"
        
        # making new account using REST API (POST)
        new_admin = self.admin_interface.create(email = email,
                                                password = password,
                                                name = name)
        
        # creating history of the current user
        new_history_description = [f"created new user {new_admin['user_id']}", f"created new admin {new_admin['name']}"]
        self._create_history(*new_history_description)
    
    def delete_admin(self, form: ImmutableDict) -> None:
        """
        Deleting admin account and saving the history of the current user
        
        Parameters
        ----------
        form : ImmutableDict
            the user input from form at HTML
            
        Return
        ----------
        None
        """
        # cleaning form
        form = self._filter_form(form)
        
        # parsing form
        user_id = form['id']
        
        # deleting admin using REST API (DELETE)
        deleted_admin = self.admin_interface.delete(user_id = user_id)
        
        # creating history of the current user
        new_history_description = [f"delete user {deleted_admin['user_id']}", f"delete teacher {deleted_admin['name']}"]
        self._create_history(*new_history_description)
        
        
    def edit_user(self, form: ImmutableDict) -> None:
        """
        Editing the other user admin
        
        Parameters
        ----------
        form : ImmutableDict
            the user input from form at HTML
            
        Return
        ----------
        None
        """
        # cleaning form
        form = self._filter_form(form)
        
        # parsing form
        user_id = form['id']
        name = form['name']
        email = form['email'].lower()
        
        # updating data using REST API (PUT)
        updated_admin = self.admin_interface.update(user_id = user_id,
                                                    name=name,
                                                    email=email)
        
        # creating history
        new_history_description = [f"updated user {updated_admin['user_id']}", f"updated admin {updated_admin['name']}"]
        self._create_history(*new_history_description)
    #########################################################################################################
#########################################################################################################    


#########################################################################################################  
class AdminCategoryHandler(AdminHandler):
    """
    A class that handles admin page for category. Inherited from AdminHandler class
    
    ATTRIBUTES
    ----------
    admin_interface : AdminInterface
        a interface for making all admin data
        
    history_interface : HistoryInterface
        a interface for making all history data
        
    category_interface : CategoryInterface
        a interface for making all category data
        
    teacher_interface : TeacherInterface
        a interface for getting who can see all record
        
    
    METHODS (PUBLIC)
    ----------
    get_category_page(page : int) -> list
        a method for getting all category from database
        
    create_new_template(category_name: str, contents: str) -> None
        a method for creating new templates html for a record
    
    create_new_category(form : ImmutableDict) -> str
        a method for creating new category based on form and make history based on current user id
    
    change_visibility_category(form : ImmutableDict) -> None
        a method for disabling / enabling the category so that it will be / not be visible based on the form and make history based on current user id
    
    edit_category(form : ImmutableDict) -> str
        a method for editing category and make history based on current user id
        
    METHODS (PRIVATE)
    ----------
    __preparing_category(form : dict) -> Tuple[str, str, str, str, list, str]
        a method for preparing category data
        
    __filter_content(contents : str) -> str
        a method for filtering the content so that it will be no HTML code and changing parameter to dictionary data
        
    __get_columns(contents : str) -> list
        a method for extracting all columns that will be needed to fill for the records
    
    """
    def __init__(self, token: str, id: int) -> None:
        """
        Parameters
        ----------
        token : str
            a token for activating the API
            
        id : int
            current user id
        """
        super().__init__(token, id)
        self.__category_interface = CategoryInterface(token)
        self.__teacher_interface = TeacherInterface(token)
    #########################################################################################################
    # PUBLIC METHOD
    def get_category_page(self, page: int) -> list:
        """
        Getting all category from database
        
        Parameters
        ----------
        page : int
            page of web
        
        Return
        ----------
        categories : list
            the list of all categories
            
        self.user : dict
            current user 
        """
        
        # get all category
        categories = self.category_interface.get(page = page)
        return (categories, self.user)
    
    def create_new_category(self, form: ImmutableDict) -> str:
        """
        Creating new category 
        
        Parameters
        -----------
        form : ImmutableDict
            response data from the form
            
        Return
        -----------
        contents
            contents of the new category
        """
        # cleaning form
        form = self._filter_form(form)
        
        # preparing category property based on form data
        category_name, path_format, visible_role, required_role_accept, contents = self.__prepare_category(form)
        
        # creating new category using REST API (POST)
        new_category = self.category_interface.create(category_name=category_name,
                                                      path_format=path_format,
                                                      visible_role=visible_role,
                                                      required_role_accept=required_role_accept)
        
        # creating history 
        description = [f"creating new category {new_category['category_id']}"]
        self._create_history(*description)
        return contents
    
    def create_new_template(self, category_name: str, contents: str) -> None:
        """
        Creating new templates html for a record
        
        Parameters
        -----------
        category_name : str
            category name that will be generated for the new template 
            
        contents : str
            category content that will be generated
        
        Return
        -----------
        None
        """
        with app.app_context():
            # creating new template 
            new_template = render_template("pdf_template/template.html", contents = contents)
            
            with codecs.open(f"templates/pdf_template/{category_name.replace(' ', '_')}.html", 'w', encoding='utf-8') as f:
                f.write(new_template)
          
    def change_visibility_category(self, form: ImmutableDict) -> None:
        """
        Disabling / Enabling category
        
        Parameters
        ----------
        form : ImmutableDict
            response data from the form  
        
        Return 
        ----------
        None
        
        """
        # cleaning form
        form = self._filter_form(form)
        
        # change visibility of category based on id using REST API (PATCH)
        category_changed = self.category_interface.delete(category_id = form['id'])
            
        # creating history 
        description = [f"deleting category {category_changed['category_id']}"]
        self._create_history(*description)
       
    def edit_category(self, form: ImmutableDict) -> str:
        """
        Editing category
        
        Parameters
        ----------
        form : ImmutableDict
            response data from the form  
        
        Return 
        ----------
        contents : str
            content of the category
        
        """
        
        # cleaning form
        form = self._filter_form(form)
        
        # preparing the editted form
        category_name, path_format, visible_role, required_role_accept, contents = self.__prepare_category(form)
        
        # getting the previous category name
        category = self.category_interface.get(category_id = form['id'])['categories']
        category = category[0]
        
        # updating the category using REST API (PUT)   
        updated_category = self.category_interface.update(category_id = form['id'],
                                                          category_name = category_name,
                                                          path_format = path_format,
                                                          visible_role = visible_role,
                                                          required_role_accept = required_role_accept)
        
        # removing the old template
        if os.path.exists(f"templates/{category['path_format']}"):
            os.remove(f"templates/{category['path_format']}")
            
        # making history
        description = [f"updating category {updated_category['category_id']}"]
        self._create_history(*description)
        return contents
    #########################################################################################################
    
    #########################################################################################################
    # PRIVATE METHOD
    def __prepare_category(self, form: dict) -> Tuple[str, str, str, str, str]:
        """
        Preparing category data
        
        Parameters
        ----------
        form : dict
            cleaned form
        
        Return 
        ----------
        category_name : str
            the name of the category
        
        path_format : str
            path where the template of the category stored
        
        visible_role : str
            the role that is needed to see the record
            
        required_role_accept : str
            the role that is needed to give response of the record
            
            
        contents : str
            the content of the category
        """
        # parsing the content of the category
        contents = form['isicontent']
        contents = contents.replace("\r", "")
        
        # filtering the content and splitting it based on new line
        contents = self.__filter_content(contents)
        contents = contents.split("\n")
        
        # getting all teacher who has the ability to see all records to supervise
        can_see_records = self.teacher_interface.get(can_see_records=True)['teachers']
        can_see_records = [teacher['role'] for teacher in can_see_records]
        
        
        # append all teacher role who has the ability to see all records to visible_role attribute
        urutan_accepted = form['urutan_accepted'].split(",")
        urutan_accepted = [teacher.strip() for teacher in urutan_accepted if teacher not in can_see_records]
        visible_role = can_see_records
        visible_role.extend(urutan_accepted)
        visible_role = set(visible_role)
        visible_role = ",".join(visible_role)

        # the required role accept
        required_role_accept = form['urutan_accepted']
        
        
        
        # parsing the path where the category will be stored
        category_name = form['categoryname']
        category_name = category_name.split(" ")
        category_name = [name.capitalize() for name in category_name]
        category_name = " ".join(category_name)
        path_format = f"pdf_template/{form['categoryname'].replace(' ', '_')}.html"
        
        return (category_name, path_format, visible_role, required_role_accept, contents)
         
    def __filter_content(self, contents: str) -> str:
        """
        Filtering the content so that it will be no HTML code and changing parameter to dictionary data
        
        Parameters
        -----------
        contents : str
            category content that will be generated
        
        Return
        -----------
        contents
            category content that is already cleaned
        """
        # filtering all html tag
        contents = re.sub(r"\<([\S\s]*?)\>([\S\s]*?)\</([\S\s]*?)\>", "", contents)
        
        # data cleaning
        contents = re.sub(r'{{\s*(.*?)\s*}}', r'{{data.\1|safe}}', contents)
        contents = re.sub("(\s)+(?=[^.]*?\})","_", contents)
        contents = re.sub("(__)+(?=[^.]*?\})","_", contents)
        contents = re.sub(r"(\t)+","<span>", contents)
        return contents
    
    #########################################################################################################
        
    #########################################################################################################
    # PRIVATE VARIABLE      
    @property
    def category_interface(self):
        return self.__category_interface
    
    @category_interface.getter
    def category_interface (self):
        return self.__category_interface  
    
    @property
    def teacher_interface(self):
        return self.__teacher_interface
    
    @teacher_interface.getter
    def teacher_interface(self):
        return self.__teacher_interface   
    #########################################################################################################      
#########################################################################################################  
      
      
#########################################################################################################  
class AdminHistoryHandler(AdminHandler):
    """
    A class that handles admin page for history. Inherited from AdminHandler class
    
    ATTRIBUTES
    ----------
    admin_interface : AdminInterface
        a interface for making all admin data
        
    history_interface : HistoryInterface
        a interface for making all history data
        
    
    METHODS (PUBLIC)
    ----------
    get_admin_page(page : int) -> Tuple[list, dict]
        a method for getting all history from database
        
    delete_history(form : ImmutableDict) -> None
        a method for creating new category based on form and make history based on his / her id
        
    """
    def __init__(self, token: str, id: int) -> None:
        """
        Parameters
        ----------
        token : str
            a token for activating the API
            
        id : int
            current user id
        """
        super().__init__(token, id)
        
    #########################################################################################################
    # PUBLIC METHOD
    def get_admin_page(self, page: int) -> Tuple[list, dict]:
        """
        Getting all history based on id from the database
        
        Parameters
        -----------
        page : int
            the page of web (20 data per page)
            
        Return
        -----------
        histories
            all histories of the user
            
        user
            the current user admin data
        """
        user = self.user
        
        # get all histories data from database using REST API (GET)
        histories = self.history_interface.get(user_id=self.id, page=page)
        return (histories, user)
    
    def delete_history(self, form: ImmutableDict) -> None:
        """
        Deleting specific history from an admin user
        
        Parameters
        -----------
        form : ImmutableDict
            response data from the form
            
        Return
        -----------
        None
        
        """
        # cleaning form
        form = self._filter_form(form)

        # deleting specific history using REST API (DELETE)
        self.history_interface.delete(id=form['id'])
    #########################################################################################################
#########################################################################################################  


#########################################################################################################    
class AdminRecordHandler(AdminHandler):
    """
    A class that handles admin page for record. Inherited from AdminHandler class
    
    ATTRIBUTES
    ----------
    admin_interface : AdminInterface
        a interface for making all admin data
        
    history_interface : HistoryInterface
        a interface for making all history data
    
    record_interface : RecordInterface
        a interface for making all record data
        
    
    METHODS (PUBLIC)
    ----------
    get_admin_page(page : int) -> list
        a method for getting all record from database
        
    """
    def __init__(self, token: str, id: int) -> None:
        """
        Parameters
        ----------
        token : str
            a token for activating the API
            
        id : int
            current user id
        """
        super().__init__(token, id)        
        self.__record_interface = RecordInterface(token)
        
    #########################################################################################################
    # PUBLIC METHOD
    def get_admin_page(self, page: int) -> Tuple[list, dict]:
        """
        Getting all record based on id from the database
        
        Parameters
        -----------
        page : int
            the page of web (20 data per page)
            
        Return
        -----------
        records
            all records
            
        user
            the current user admin data
        """
        user = self.user

        # getting all records using REST API (GET)
        records = self.record_interface.get(page = page)
        return (records, user)
    #########################################################################################################
    
    #########################################################################################################
    # PRIVATE VARIABLE
    @property
    def record_interface(self):
        return self.__record_interface
    
    @record_interface.getter
    def record_interface(self):
        return self.__record_interface 
    #########################################################################################################           
#########################################################################################################  


#########################################################################################################  
class AdminStudentHandler(AdminHandler):
    """
    A class that handles admin page for student. Inherited from AdminHandler class
    
    ATTRIBUTES
    ----------
    admin_interface : AdminInterface
        a interface for making all admin data
        
    history_interface : HistoryInterface
        a interface for making all history data
    
    student_interface : StudentInterface
        a interface for making all student data
        
    
    METHODS (PUBLIC)
    ----------
    get_admin_page(page : int) -> Tuple[list, dict]:
        a method for getting all students from database
        
    create_new_student(form : ImmutableDict) -> None
        a method for creating new student based on form and make history based on current user id
    
    delete_student(form : ImmutableDict) -> None
        a method for deleting the student and make history based on current user id
        
    edit_user(form : ImmutableDict) -> None
        a method for updating student and make history based on current user id
    """
    def __init__(self, token: str, id : int) -> None:
        """
        Parameters
        ----------
        token : str
            a token for activating the API
            
        id : int
            current user id
        """
        super().__init__(token, id)
        self.__student_interface = StudentInterface(token)
    #########################################################################################################
    # PUBLIC METHOD
    def get_admin_page(self, page: int) -> Tuple[list, dict]:
        """
        Getting all students from database
        
        Parameters
        -----------
        page : int
            page of web
        
        Return
        -----------
        students
            list of all students in database
        
        user
            the current user admin data
        """
        user = self.user
        
        # getting all student using REST API (GET)
        students = self.student_interface.get(page = page)
        return (students, user)
        
    def create_new_student(self, form: ImmutableDict) -> None:
        """
        Creating new student
        
        Parameters
        -----------
        form : Immutable Dict
            response data from the form
        
        Return
        -----------
        None
        """
        # cleaning form
        form = self._filter_form(form)
        
        # parsing data
        email = form['email'].lower()
        password = form['name'].split(" ")[0].lower() + "123"
        name = form['name']
        nim = form['nim']
        jurusan = form['jurusan']
        
        # creating new student using REST API (POST)
        new_student = self.student_interface.create(email=email,
                                                    password=password,
                                                    name=name,
                                                    nim=nim,
                                                    jurusan=jurusan)
        
        # making history data 
        new_history_description = [f"created new user {new_student['user_id']}", f"created new student {new_student['name']}"]         
        self._create_history(*new_history_description)     
    
    def delete_student(self, form: ImmutableDict) -> None:
        """
        Deleting student
        
        Parameters
        -----------
        form : Immutable Dict
            response data from the form
        
        Return
        -----------
        None
        """
        
        # cleaning form
        form = self._filter_form(form)
        
        # deleting student using REST API (DELETE)
        deleted_student = self.student_interface.delete(user_id=form['id'])
        
        # making history
        new_history_description = [f"delete user {deleted_student['user_id']}", f"delete student {deleted_student['name']}"]
        self._create_history(*new_history_description)
    
    def edit_user(self, form: ImmutableDict) -> None:
        """
        Updating student
        
        Parameters
        -----------
        form : Immutable Dict
            response data from the form
        
        Return
        -----------
        None
        """
        # cleaning form
        form = self._filter_form(form)
        
        # parsing data
        user_id = form['id']
        name = form['name']
        nim = form['nim']
        jurusan = form['jurusan']
        email = form['email'].lower()
        can_see_records = True if form.get("can_see_records") else False
                                                    
        # updating student using REST API (PUT)                                    
        updated_student = self.student_interface.update(user_id = user_id,
                                                        name = name,
                                                        nim = nim,
                                                        jurusan = jurusan,
                                                        email = email,
                                                        can_see_records = can_see_records)
        
        # making history
        new_history_description = [f"updated student {updated_student['name']}"]         
        self._create_history(*new_history_description) 
    #########################################################################################################  
    
    #########################################################################################################
    # PRIVATE VARIABLE
    @property
    def student_interface(self):
        return self.__student_interface
    
    @student_interface.getter
    def student_interface(self):
        return self.__student_interface
    #########################################################################################################
#########################################################################################################  


#########################################################################################################      
class AdminTeacherHandler(AdminHandler):
    """
    A class that handles admin page for teacher. Inherited from AdminHandler class
    
    ATTRIBUTES
    ----------
    admin_interface : AdminInterface
        a interface for making all admin data
        
    history_interface : HistoryInterface
        a interface for making all history data
    
    teacher_interface : TeacherInterface
        a interface for making all teacher data
        
    
    METHODS (PUBLIC)
    ----------
    get_admin_page(page : int) -> Tuple[list, dict]
        a method for getting all teachers from database
        
    create_new_teacher(form : ImmutableDict) -> None
        a method for creating new teacher based on form and make history based on current user id
    
    delete_teacher(form : ImmutableDict) -> None
        a method for deleting the teacher and make history based on current user id
        
    """
    def __init__(self, token: str, id: int) -> None:
        """
        Parameters
        ----------
        token : str
            a token for activating the API
        
        id : int
            current user id
        """
        super().__init__(token, id)
        self.__teacher_interface  = TeacherInterface(token)
    
    #########################################################################################################
    # PUBLIC METHOD
    def get_admin_page(self, page: int) -> Tuple[list, dict]:
        """
        Getting all teachers from database
        
        Parameters
        -----------
        page : int
            page of web
        
        Return
        -----------
        teachers
            list of all teachers in database
            
        user
            current user admin data
        """
        user = self.user
        
        # getting all teacher using REST API (GET)
        teachers = self.teacher_interface.get(page = page)
        return (teachers, user)
        
    def create_new_teacher(self, form: ImmutableDict) -> None:
        """
        Creating new teacher
        
        Parameters
        -----------
        form : Immutable Dict
            response data from the form
        
        Return
        -----------
        None
        """
        # cleaning form
        form = self._filter_form(form, 'jurusan')
        
        # parsing form data
        email=form['email'].lower()
        password=form['name'].split(" ")[0].lower() + "123"
        name=form['name']
        role=form['role'].upper()
        jurusan=form['jurusan'].upper()
        can_see_records = True if form.get("can_see_records") else False
        
        # creating new teacher using REST API (POST)
        new_teacher = self.teacher_interface.create(email=email,
                                                    password=password,
                                                    name=name,
                                                    role=role,
                                                    jurusan=jurusan,
                                                    can_see_records=can_see_records)
                                            
        # making history                                            
        new_history_description = [f"created new user {new_teacher['user_id']}", f"created new teacher {new_teacher['name']}"]         
        self._create_history(*new_history_description) 
    
    def delete_teacher(self, form: ImmutableDict) -> None:
        """
        Deleting teacher
        
        Parameters
        -----------
        form : Immutable Dict
            response data from the form
        
        Return
        -----------
        None
        """
        # cleaning form        
        form = self._filter_form(form)
        
        # deleting teacher using REST API (DELETE)
        deleted_teacher = self.teacher_interface.delete(user_id=form['id'])
        
        # making history
        new_history_description = [f"delete user {deleted_teacher['user_id']}", f"delete teacher {deleted_teacher['name']}"]
        self._create_history(*new_history_description)
    
    def edit_teacher(self, form: ImmutableDict) -> None:
        """
        Updating teacher
        
        Parameters
        -----------
        form : Immutable Dict
            response data from the form
        
        Return
        -----------
        None
        """
        # cleaning form
        form = self._filter_form(form, 'jurusan')
        
        # parsing form data
        user_id = form['id']
        name = form['name']
        role = form['role'].upper()
        jurusan = form['jurusan'].upper()
        email = form['email'].lower()
        can_see_records = True if form.get("can_see_records") else False
        
        # updating teacher using REST API (PUT)
        updated_teacher = self.teacher_interface.update(user_id = user_id,
                                                        name = name,
                                                        role = role,
                                                        jurusan = jurusan,
                                                        email = email,
                                                        can_see_records = can_see_records)  

        # making history
        new_history_description = [f"update teacher {updated_teacher['user_id']}"]
        self._create_history(*new_history_description) 
    #########################################################################################################
    
    #########################################################################################################
    # PRIVATE VARIABLE
    @property
    def teacher_interface(self):
        return self.__teacher_interface
    
    @teacher_interface.getter
    def teacher_interface(self):
        return self.__teacher_interface    
    #########################################################################################################
#########################################################################################################      
