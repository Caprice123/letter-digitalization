from flask import render_template, request, redirect, url_for
from server import app, check_token, role_required, autodoc
from flask_login import current_user, login_required
from Handler.Admin import AdminRecordHandler


@autodoc.doc(groups='admin')
@app.route('/admin/records', methods=["GET"])
@login_required
@role_required("Admin")
@check_token
def admin_record_page(token):
    """ This is endpoint for rendering record.html and showing all records """
    
    # parsing argument
    page = request.args.get("page", 1)
    if int(page) < 1:
        return redirect(url_for('admin_record_page', page=1))
    
    # extracting current user id
    id = current_user.id
    
    # getting record view
    record_handler = AdminRecordHandler(token, id)
    records, user = record_handler.get_admin_page(page = page)
    return render_template("Admin_page/record.html", datas = records, destination="record", name=user['name'])
    

