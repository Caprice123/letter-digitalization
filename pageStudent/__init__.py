from flask import render_template, request, url_for, redirect, flash
from server import app, check_token, role_required, autodoc
from flask_login import login_required, current_user, logout_user
from threading import Thread
import time
from Handler.Student import StudentHandler

@autodoc.doc(groups='student')
@app.route('/student')
@login_required
@role_required("Student")
@check_token

def student_page(token):
    """ This is endpoint for rendering student.html and showing all records sent by his / her id """
   
    # parsing arguments
    page = request.args.get("page", 1)
    if int(page) < 1:
        return redirect(url_for('student_page', page=1))
    
    # extracting current user id
    id =current_user.id
    
    # getting admin view 
    student_handler = StudentHandler(token, id)
    categories, records, user = student_handler.get_view(page)
    return render_template("Student_page/student.html", name = user['name'], records = records, categories = categories)


@autodoc.doc(groups='student')
@app.route('/student/add-record', methods=["POST"])
@login_required
@role_required("Student")
@check_token
def student_create_record(token):
    """ This is endpoint for creating new record """
   
    t0 = time.time()
    # extracting current user id
    id =current_user.id
    
    # creating new record
    student_handler = StudentHandler(token, id)
    (record, category) = student_handler.create_record(request.form)
    
    # sending emails
    thr = Thread(target=student_handler.send_email, args=[category, record, request.form])
    thr.start()
    print(time.time() - t0)
    
    # success and redirecting to student page at page 1
    flash("You have successfully made a record", "Success")
    return redirect(url_for('student_page', page = 1))

@autodoc.doc(groups='student')
@app.route('/student/change-password')
@login_required
@role_required("Student")
@check_token
def student_change_password(token):
    """ This is endpoint for rendering change_password.html """
    
    return render_template("change_password.html", user_role = "Student")
   
@autodoc.doc(groups='student')
@app.route('/student/update-password', methods=["POST"])
@login_required
@role_required("Student")
@check_token
def student_update_password(token):
    """ This is endpoint for updating user password """
    # extracting current user id
    id = current_user.id  
    
    # changing user password
    student_handler = StudentHandler(token, id)
    student_handler.change_password(current_user, request.form)
    
    # logoutting user
    logout_user()
    
    # success and redirecting to login page again
    flash("Your password has been successfully changed", "Success")
    return redirect(url_for('login_page'))