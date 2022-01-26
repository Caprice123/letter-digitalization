"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AdminTeacher = /** @class */ (function (_super) {
    __extends(AdminTeacher, _super);
    /**
     * This is class for making the table UI for the admin teacher page
     *
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas of all teachers
     * theadcolumns: str - the header of the table
     * -------------------------------------------
     *
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * datas: Array<any> - the datas of all teachers
     * theadcolumns: str - the header of the table
     * -------------------------------------------
     *
     *
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * updateTable(): void - a method for showing the datas in the tables
     * -------------------------------------------
   */
    function AdminTeacher(datas, theadcolumns) {
        var _this = 
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * theadcolumns: str - the header of the table
         */
        _super.call(this, datas, theadcolumns) || this;
        _this.updateTable();
        _this.updateEventListenerButton();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    AdminTeacher.prototype.updateTable = function () {
        var _this = this;
        /**
         * This is a method for showing the datas in the tables
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        this.datas.forEach(function (data) {
            // inserting all data and make the edit and delete button
            var new_row = "\n                <tr>\n                    <td>".concat(data.name, "</td>\n                    <td>").concat(data.role, " ").concat(data.jurusan, "</td>\n                    <td>\n                        <div class=\"response\">\n                            <button class=\"edit\" data-id=\"").concat(data.user_id, "\"> <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></button>\n                            <button class=\"delete\" data-id=\"").concat(data.user_id, "\"> <i class=\"fa fa-trash-o\"></i></button>\n                        </div> \n                    </td>\n                </tr>\n                ");
            _this.tbody.insertAdjacentHTML("beforeend", new_row);
        });
    };
    return AdminTeacher;
}(Admin));
var EditTeacherForm = /** @class */ (function (_super) {
    __extends(EditTeacherForm, _super);
    function EditTeacherForm(datas, class_edit_buttons, class_edit_container, class_back_button) {
        var _this = 
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * class_edit_buttons: str - the class of edit buttons
         * class_edit_container: str - the class of edit popup container
         * class_back_button: str - the class of back button
         */
        _super.call(this, datas, class_edit_buttons, class_edit_container, class_back_button) || this;
        _this.confirmButton = document.querySelector(".confirm");
        _this.submitButton = document.querySelector(".submit-edit");
        _this.nameForm = document.querySelector(".editnama");
        _this.roleForm = document.querySelector(".editrole");
        _this.jurusanForm = document.querySelector(".editjurusan");
        _this.emailForm = document.querySelector(".editemail");
        _this.canSeeRecordButtons = document.querySelector(".editcanseerecords");
        // remove all of the form initial value when user click outside the edit form
        document.addEventListener("click", function (e) {
            if (!e.target.closest(class_edit_container)) {
                _this.idForm.value = null;
                _this.nameForm.value = null;
                _this.roleForm.value = null;
                _this.jurusanForm.value = null;
                _this.emailForm.value = null;
                _this.canSeeRecordButtons.checked = false;
                _this.editContainer.classList.remove("show");
            }
        }, true);
        _this.updateInputEventListener();
        _this.updateEventListener();
        _this.updateConfirmationEventListener();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    EditTeacherForm.prototype.updateEventListener = function () {
        var _this = this;
        /**
         * This is a method for initializing the popup edit container when user click edit button
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // initialize initial value of each input form when user click the edit button
        this.editButtons.forEach(function (button) { return button.addEventListener("click", function (e) {
            var editData = _this.datas.filter(function (data) { return data['user_id'] == button.dataset.id; });
            editData = editData[0];
            _this.idForm.value = button.dataset.id;
            _this.nameForm.value = editData.name;
            _this.roleForm.value = editData.role;
            _this.jurusanForm.value = editData.jurusan;
            _this.emailForm.value = editData.email;
            if (editData.can_see_records) {
                _this.canSeeRecordButtons.checked = true;
            }
            else {
                _this.canSeeRecordButtons.checked = false;
            }
            _this.editContainer.classList.add("show");
        }); });
        // remove initial value of each input form when user click back button
        this.backButton.addEventListener("click", function (e) {
            _this.idForm.value = null;
            _this.nameForm.value = null;
            _this.roleForm.value = null;
            _this.jurusanForm.value = null;
            _this.emailForm.value = null;
            _this.canSeeRecordButtons.checked = false;
            _this.editContainer.classList.remove("show");
        });
    };
    EditTeacherForm.prototype.updateConfirmationEventListener = function () {
        var _this = this;
        /**
         * This is a method for validating the user input
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // validate user input when confirm button is clicked
        // submit form if already valid
        this.confirmButton.addEventListener("click", function (e) {
            _this.validID();
            _this.validName();
            _this.validRole();
            _this.validEmail();
            if (!_this.idOk || !_this.nameOk || !_this.roleOk || !_this.emailOk) {
                console.log("here");
                e.preventDefault();
                return;
            }
            _this.submitButton.click();
        });
    };
    EditTeacherForm.prototype.updateInputEventListener = function () {
        var _this = this;
        /**
         * This is a method for making some constraint in some inputs
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // adding some constraint for the name form so that it can be inputted only string data
        this.nameForm.addEventListener("keypress", function (e) { return _this.validateStringOnly(e); });
        // adding some constraint for the role form so that it can be inputted only string data
        this.roleForm.addEventListener("keypress", function (e) { return _this.validateStringOnly(e); });
        // adding some constraint for the major form so that it can be inputted only string data
        this.jurusanForm.addEventListener("keypress", function (e) { return _this.validateStringOnly(e); });
    };
    return EditTeacherForm;
}(EditForm));
var AddTeacherForm = /** @class */ (function (_super) {
    __extends(AddTeacherForm, _super);
    /**
     * This is class for making the add popup UI in admin teacher page
     *
     * -------------------------------------------
     * Parameters:
     * id: str - the id of the add popup window
     * -------------------------------------------
     *
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * nameForm: input - the input form for the name
     * roleForm: input - the input form for the role of the teacher
     * jurusanTeacherForm: input - the input form for the major of the teacher
     * emailForm: input - the input form for the email
     * submitButton: str - the hidden button for submitting the form
     * -------------------------------------------
     *
     *
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * updateSubmitEventListener(): void - a method for validating the user input
     * updateKeyPressEventListener(): void - a method for making some constraint in some inputs
     * -------------------------------------------
   */
    function AddTeacherForm(id) {
        var _this = 
        /**
         * Parameters:
         * id: str - the id of the add popup window
         */
        _super.call(this, id) || this;
        _this.nameForm = document.querySelector(".addname");
        _this.roleForm = document.querySelector(".addrole");
        _this.jurusanTeacherForm = document.querySelector(".addjurusanteacher");
        _this.emailForm = document.querySelector(".addemail");
        _this.submitButton = document.querySelector(".btnsubmit");
        _this.updateSubmitEventListener();
        _this.updateKeyPressEventListener();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    AddTeacherForm.prototype.updateSubmitEventListener = function () {
        var _this = this;
        /**
         * This is a method for validating the user input
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // validate user input when confirm button is clicked
        this.submitButton.addEventListener("click", function (e) {
            _this.validName();
            _this.validRole();
            _this.validEmail();
            if (!_this.nameOk || !_this.roleOk || !_this.emailOk) {
                e.preventDefault();
                return;
            }
        });
    };
    AddTeacherForm.prototype.updateKeyPressEventListener = function () {
        var _this = this;
        /**
         * This is a method for validating the user input
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // adding some constraint for the name form so that it can be inputted only string data
        this.nameForm.addEventListener("keypress", function (e) { return _this.validateStringOnly(); });
        // adding some constraint for the role form so that it can be inputted only string data
        this.roleForm.addEventListener("keypress", function (e) { return _this.validateStringOnly(); });
        // adding some constraint for the major form so that it can be inputted only string data
        this.jurusanTeacherForm.addEventListener("keypress", function (e) { return _this.validateStringOnly(); });
    };
    return AddTeacherForm;
}(AddForm));
// the table columns
var theadColumns = "\n<tr>\n    \n    <th>Name</th>\n    <th>Role</th>\n    <th>Actions</th>\n</tr>\n";
// make the admin teacher data UI
var teacherAdmin = new AdminTeacher(datas.teachers, theadColumns);
// make the edit popup window UI
var editForm = new EditTeacherForm(datas.teachers, ".edit", ".teachereditpopupcontainer", ".back");
// make the add popup window UI
var addForm = new AddTeacherForm("myForm");
