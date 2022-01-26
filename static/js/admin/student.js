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
var AdminStudent = /** @class */ (function (_super) {
    __extends(AdminStudent, _super);
    /**
     * This is class for making the table UI for the admin student page
     *
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas of all students
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
     * oupdateTable(): void - a method for showing the datas in the tables
     * -------------------------------------------
   */
    function AdminStudent(datas, theadcolumns) {
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
    AdminStudent.prototype.updateTable = function () {
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
        if (this.datas) {
            this.datas.forEach(function (data) {
                // inserting all data and make the edit and delete button
                var new_row = "\n                    <tr>\n                        <td>".concat(data.nim, "</td>\n                        <td>").concat(data.name, "</td>\n                        <td>").concat(data.batch, "</td>\n                        <td>").concat(data.jurusan, "</td>\n                        <td>\n                            <div class=\"response\">\n                                <button class=\"edit\" data-id=\"").concat(data.user_id, "\"> <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></button>\n                                <button class=\"delete\" data-id=\"").concat(data.user_id, "\"> <i class=\"fa fa-trash-o\"></i></button>\n                            </div> \n                        </td>\n                    </tr>\n                    ");
                _this.tbody.insertAdjacentHTML("beforeend", new_row);
            });
        }
    };
    return AdminStudent;
}(Admin));
var EditStudentForm = /** @class */ (function (_super) {
    __extends(EditStudentForm, _super);
    function EditStudentForm(datas, class_edit_buttons, class_edit_container, class_back_button) {
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
        _this.nimForm = document.querySelector(".editnim");
        _this.jurusanForm = document.querySelector(".editjurusan");
        _this.emailForm = document.querySelector(".editemail");
        // remove all of the form initial value when user click outside the edit form
        document.addEventListener("click", function (e) {
            if (!e.target.closest(class_edit_container)) {
                _this.idForm.value = null;
                _this.nameForm.value = null;
                _this.nimForm.value = null;
                _this.jurusanForm.value = _this.jurusanForm.children[0].value;
                _this.emailForm.value = null;
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
    EditStudentForm.prototype.updateEventListener = function () {
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
            _this.nimForm.value = editData.nim;
            _this.jurusanForm.value = editData.jurusan;
            _this.emailForm.value = editData.email;
            _this.editContainer.classList.add("show");
        }); });
        // remove initial value of each input form when user click back button
        this.backButton.addEventListener("click", function (e) {
            _this.idForm.value = null;
            _this.nameForm.value = null;
            _this.nimForm.value = null;
            _this.jurusanForm.value = _this.jurusanForm.children[0].value;
            _this.emailForm.value = null;
            _this.editContainer.classList.remove("show");
        });
    };
    EditStudentForm.prototype.updateConfirmationEventListener = function () {
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
            _this.validID(_this.confirmButton);
            _this.validName(_this.confirmButton);
            _this.validNim(_this.confirmButton);
            _this.validMajor(_this.confirmButton);
            _this.validEmail(_this.confirmButton);
            if (!_this.idOk || !_this.nameOk || !_this.nimOk || !_this.jurusanOk || !_this.emailOk) {
                e.preventDefault();
                return;
            }
            _this.submitButton.click();
        });
    };
    EditStudentForm.prototype.updateInputEventListener = function () {
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
        // adding some constraint for the nim form so that it can be inputted only integer data
        this.nimForm.addEventListener("keypress", function (e) { return _this.validateNumberOnly(e); });
    };
    return EditStudentForm;
}(EditForm));
var AddStudentForm = /** @class */ (function (_super) {
    __extends(AddStudentForm, _super);
    /**
     * This is class for making the add popup UI in admin studen page
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
     * nimForm: input - the input form for the nim
     * jurusanForm: input - the input form for the major of the stjudent
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
    function AddStudentForm(id) {
        var _this = 
        /**
         * Parameters:
         * id: str - the id of the add popup window
         */
        _super.call(this, id) || this;
        _this.nameForm = document.querySelector(".addname");
        _this.nimForm = document.querySelector(".addnim");
        _this.jurusanForm = document.querySelector(".addjurusan");
        _this.emailForm = document.querySelector(".addemail");
        _this.submitButton = document.querySelector(".btnsubmit");
        _this.updateSubmitEventListener();
        _this.updateKeyPressEventListener();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    AddStudentForm.prototype.updateSubmitEventListener = function () {
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
            _this.validNim();
            _this.validMajor();
            _this.validEmail();
            if (!_this.nameOk || !_this.nimOk || !_this.jurusanOk || !_this.emailOk) {
                e.preventDefault();
                return;
            }
        });
    };
    AddStudentForm.prototype.updateKeyPressEventListener = function () {
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
        this.nameForm.addEventListener("keypress", function () { return _this.validateStringOnly(); });
        // adding some constraint for the nim form so that it can be inputted only integer data
        this.nimForm.addEventListener("keypress", function () { return _this.validateNumberOnly(); });
    };
    return AddStudentForm;
}(AddForm));
// the table columns
var theadColumns = "\n<tr>\n    <th>NIM</th>\n    <th>Name</th>\n    <th>Batch</th>\n    <th>Program</th>\n    <th>Actions</th>\n</tr>\n";
// make the admin student data UI
var studentAdmin = new AdminStudent(datas.students, theadColumns);
// make the edit popup window UI
var editStudent = new EditStudentForm(datas.students, ".edit", ".studenteditpopupcontainer", ".back");
// make the add popup window UI
var addForm = new AddStudentForm("myForm");
