from flask import render_template, request, redirect, url_for, flash, abort
from server import app, check_token, role_required, autodoc
from flask_login import login_required, current_user, logout_user
import time
from threading import Thread
from Handler.Teacher import TeacherHandler

@autodoc.doc(groups='teacher')
@app.route('/teacher/<string:status>')
@login_required
@role_required("Teacher")
@check_token
def teacher_page(token, status):
    """ This is endpoint for showing all records """
    
    # filtering status of the record
    allowed_status = ["sent", "all", "accepted", "rejected"]
    if (status not in allowed_status):
        abort(404)
    
    # parsing arguments
    page = request.args.get("page", 1)
    if int(page) < 1:
        return redirect(url_for('teacher_page', page=1))
    
    # extracting current user id
    id = current_user.id
    
    # getting all records according to the status
    teacher_handler = TeacherHandler(token, id)
    (teacher, records) = teacher_handler.get_view(page, status)
    return render_template("Teacher_page/teacher.html", teacher=teacher, records = records, name=teacher['name'], status = status)


@autodoc.doc(groups='teacher')
@app.route('/teacher/update-record', methods=["POST"])
@login_required
@role_required("Teacher")
@check_token
def teacher_update_record(token):
    """ This is endpoint for accepting or rejecting the record """
    
    t0  = time.time()
    
    # extracting current user id
    id = current_user.id
    
    # updating the status of the record
    teacher_handler = TeacherHandler(token, id)
    teacher, record = teacher_handler.process_action(request.form)
    
    # sending emails
    thr = Thread(target=teacher_handler.send_email, args=[teacher, record, request.form])
    thr.start()
    t1 = time.time()
    print(t1 - t0)
    
    # success and redirecting to teacher page with status sent and page = 1
    flash("You have successfully updated the record", "Success")
    return redirect(url_for('teacher_page', status="sent", page = 1))

@autodoc.doc('teacher')
@app.route('/teacher/change-password')
@login_required
@role_required("Teacher")
@check_token
def teacher_change_password(token):
    """ This is endpoint for rendering change_password.html """
    return render_template("change_password.html", user_role = "Teacher")
    
@autodoc.doc(groups='teacher')
@app.route('/teacher/change-password', methods=["POST"])
@login_required
@role_required("Teacher")
@check_token
def teacher_update_password(token):
    """ This is endpoint for updating teacher password """
    
    # extracting current user id
    id = current_user.id
    
    # changing user password
    teacher_handler = TeacherHandler(token, id)
    teacher_handler.change_password(current_user, request.form)
    
    # logoutting user
    logout_user()
    
    # success and redirect to login page again
    flash("Your password has been successfully changed", "Success")
    return redirect(url_for('login_page'))

