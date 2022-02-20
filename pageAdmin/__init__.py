from server import app, role_required, check_token
from flask import request, render_template, redirect, url_for, flash
from Handler.Admin import AdminHandler
from flask_login import current_user, logout_user, login_required

# @autodoc.doc('admin')
@app.route('/admin/change-password')
@login_required
@role_required("Admin")
@check_token
def admin_change_password(token):
    """ This is endpoint for rendering change_password.html """
    return render_template("change_password.html", user_role = "Admin")
    
# @autodoc.doc('admin')
@app.route('/admin/update-password', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_update_password(token):
    """ This is endpoint for updating admin password """
    
    # getting current user id
    id = current_user.id
    
    # changing password of user
    admin_handler = AdminHandler(token, id)
    admin_handler.change_password(current_user, request.form)
    
    # logoutting user
    logout_user()
    flash("Your password has been successfully changed", "Success")
    return redirect(url_for('login_page'))




from pageAdmin import pageCategory, pageHistory, pageRecords, pageAdmin, pageStudent, pageTeacher