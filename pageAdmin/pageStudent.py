from flask import render_template, request, redirect, url_for, flash
from server import app, check_token, role_required, autodoc
from flask_login import current_user, login_required
from Handler.Admin import AdminStudentHandler
from Models.Teacher import Teachers

@autodoc.doc(groups='admin')
@app.route('/admin/user/student')
@login_required
@role_required("Admin")
@check_token
def admin_user_student_page(token):
    """ This is endpoint for rendering student.html and showing all students account """
    
    # parsing argument
    page = request.args.get("page", 1)
    if int(page) < 1:
        return redirect(url_for('admin_user_student_page', page=1))
    
    # extracting current user id
    id = current_user.id
    
    # getting student view
    student_handler = AdminStudentHandler(token, id)
    all_students, user = student_handler.get_admin_page(page)
    
    # extracting all available major based on all major in teacher database
    available_jurusan = Teachers.query.with_entities(Teachers.jurusan).distinct().all()[1:]
    available_jurusan = [str(jurusan[0]) for jurusan in available_jurusan]
    
    return render_template("Admin_page/student.html", datas = all_students, destination="student", name=user['name'], available_jurusan=available_jurusan)
        
@autodoc.doc(groups='admin')
@app.route('/admin/user/student/create', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_user_add_student(token):
    """ This is endpoint for creating new student account """
    
    # extracting current user id
    id = current_user.id
    
    # creating new student account
    student_handler = AdminStudentHandler(token, id)
    student_handler.create_new_student(request.form)
    
    # redirecting to student page at page 1
    flash("You have successfully added new student", "Success")
    return redirect(url_for('admin_user_student_page', page = 1))
    
    
@autodoc.doc(groups='admin')
@app.route('/admin/user/student/delete', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_user_delete_student_page(token):
    """ This is endpoint for deleting a student account """
    
    # extracting current user id
    id = current_user.id
    
    # removing a student account
    student_handler = AdminStudentHandler(token, id)
    student_handler.delete_student(request.form)
    
    # redirecting to student page at page 1 
    flash("You have successfully deleted student", "Success")
    return redirect(url_for('admin_user_student_page', page = 1))

@autodoc.doc(groups='admin')
@app.route('/admin/user/student/edit', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_user_edit_student_page(token):    
    """ This is endpoint for editting a student account """
    
    # extracting current user id
    id = current_user.id
    
    # editting a student account
    student_handler = AdminStudentHandler(token, id)
    student_handler.edit_user(request.form)
    
    # redirecting to student page at page 1 
    flash("You have successfully edited student", "Success")
    return redirect(url_for('admin_user_student_page', page = 1))
