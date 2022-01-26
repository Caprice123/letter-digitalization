from enum import auto
from flask import render_template, request, redirect, url_for, flash
from server import app, check_token, role_required, autodoc
from flask_login import current_user, login_required
from Handler.Admin import AdminAdminHandler
    
@autodoc.doc(groups='admin')
@app.route('/admin/user/admin')
@login_required
@role_required("Admin")
@check_token
def admin_user_admin_page(token):
    """ This is endpoint for rendering admin.html and showing all admins except his / her own account """
    
    # parsing arguments
    page = request.args.get("page", 1)
    if int(page) < 1:
        return redirect(url_for('admin_user_admin_page', page=1))
    
    # extracting current user id
    id =  current_user.id
    
    # getting admin view 
    admin_handler = AdminAdminHandler(token, id)
    all_admins, user = admin_handler.get_admin_page(page)
    return render_template("Admin_page/admin.html", datas = all_admins, destination="admin", name=user['name'])
    
@autodoc.doc(groups='admin')
@app.route('/admin/user/admin/create', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_user_add_admin(token):
    """ This is endpoint for creating new admin account """
    
    # extracting current user id
    id =  current_user.id
    
    # creating new admin
    admin_handler = AdminAdminHandler(token, id)
    data = request.form
    admin_handler.create_new_admin(data)
    
    # redirect to admin page at page 1
    flash("You have successfully added new admin", "Success")
    return redirect(url_for('admin_user_admin_page', page = 1))


@autodoc.doc(groups='admin')   
@app.route('/admin/user/admin/delete', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_user_delete_admin_page(token):
    """ This is endpoint for deleting other admin account """
    
    # extracting current user id
    id = current_user.id
    
    # deleting admin account
    admin_handler = AdminAdminHandler(token, id)
    data = request.form
    admin_handler.delete_admin(data)
    
    # redirect to admin page at page 1
    flash("You have successfully deleted admin", "Success")
    return redirect(url_for("admin_user_admin_page", page = 1))

@autodoc.doc(groups='admin') 
@app.route('/admin/user/admin/edit', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_user_edit_admin_page(token):
    """ This is endpoint for editting other admin account """
    
    # extracting current user id
    id = current_user.id
    
    # editting other admin account
    admin_handler = AdminAdminHandler(token, id)
    data = request.form
    admin_handler.edit_user(data)
    
    # redirect to admin page at page 1
    flash("You have successfully edited admin", "Success")
    return redirect(url_for('admin_user_admin_page', page=1))
    