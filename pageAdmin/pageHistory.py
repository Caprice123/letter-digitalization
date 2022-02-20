from flask import render_template, request, redirect, url_for
from server import app, check_token, role_required
from flask_login import current_user, login_required
from Handler.Admin import AdminHistoryHandler

# @autodoc.doc(groups='admin')
@app.route('/admin/history')
@login_required
@role_required("Admin")
@check_token
def admin_history_page(token):
    """ This is endpoint for rendering history.html and showing all histories based on current user id """
    
    # parsing argument
    page = request.args.get("page", 1)
    if int(page) < 1:
        return redirect(url_for('admin_category_page', page=1))

    # extracting current user id
    id = current_user.id
    
    # getting history view
    handler = AdminHistoryHandler(token, id)
    histories, user = handler.get_admin_page(page)
    return render_template("Admin_page/history.html", datas = histories, name=user['name'])

# @autodoc.doc(groups='admin')
@app.route('/admin/history/delete', methods=["POST"])
@login_required
@role_required("Admin")
@check_token
def admin_delete_history_page(token):
    """ This is endpoint for deleting a history """
    
    # extracting current user id
    id = current_user.id
    
    # deleting a history
    handler = AdminHistoryHandler(token, id)
    handler.delete_history(request.form)
    return redirect(url_for('admin_history_page', page=1))