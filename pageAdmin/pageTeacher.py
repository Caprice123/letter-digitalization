from flask import render_template, request, redirect, url_for, abort, flash
from server import app, check_token, role_required, autodoc
from flask_login import current_user, login_required
from Handler.Admin import AdminTeacherHandler

@autodoc.doc(groups='admin')
@app.route('/admin/user/teacher')
@login_required
@role_required("Admin")
@check_token
def admin_user_teacher_page(token):
    """ This is endpoint for rendering teacher.html and showing all teachers account """
    
    # parsing argument
    page = request.args.get("page", 1)
    if int(page) < 1:
        return redirect(url_for('admin_user_teacher_page', page=1))
    
    # extracting current user id
    id = current_user.id
    
    # getting teacher view
    teacher_handler = AdminTeacherHandler(token, id)
    all_teachers, user = teacher_handler.get_admin_page(page)
    return render_template("Admin_page/teacher.html", datas = all_teachers, destination="teacher", name=user['name'])
    
@autodoc.doc(groups='admin')
@app.route('/admin/user/teacher/create', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_user_add_teacher(token):
    """ This is endpoint for creating new teachers account """
    
    # extracting current user id
    id = current_user.id
    
    # creating new teacher
    teacher_handler = AdminTeacherHandler(token, id)
    teacher_handler.create_new_teacher(request.form)
    
    # redirecting to teacher page at page 1
    flash("You have successfully added new teacher", "Success")
    return redirect(url_for("admin_user_teacher_page", page = 1))

@autodoc.doc(groups='admin')
@app.route('/admin/user/teacher/delete', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_user_delete_teacher_page(token):
    """ This is endpoint for deleting teachers account """
    
    # extracting current user id
    id = current_user.id
    
    # deleting teacher
    teacher_handler = AdminTeacherHandler(token, id)
    teacher_handler.delete_teacher(request.form)
    
    # redirecting to teacher page at page 1
    flash("You have successfully deleted teacher", "Success")
    return redirect(url_for("admin_user_teacher_page", page = 1))

@autodoc.doc(groups='admin')
@app.route('/admin/user/teacher/edit', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_user_edit_teacher_page(token):
    """ This is endpoint for editting teachers account """
    
    # extracting current user id
    id = current_user.id
    
    # editting teacher
    teacher_handler = AdminTeacherHandler(token, id)
    teacher_handler.edit_teacher(request.form)
    
    # redirecting to teacher page at page 1
    flash("You have successfully edited teacher", "Success")
    return redirect(url_for("admin_user_teacher_page", page = 1))
    