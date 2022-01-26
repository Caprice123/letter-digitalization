"use strict";
exports.__esModule = true;
var Clock = /** @class */ (function () {
    function Clock(id) {
        /**
         * Parameter
         * id: str - the id of the clock element
         *
         */
        this.element = document.getElementById(id);
    }
    /***************************************************************************************/
    // PUBLIC METHOD
    Clock.prototype.update = function () {
        /**
         * This is a method for updating the clock of the page
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
         *
         */
        var _this = this;
        // getting the current time
        var now = new Date();
        // updating the text
        var text = this.getDisplayTime(now);
        this.element.textContent = text;
        setTimeout(function () {
            _this.update();
        }, 1000);
    };
    /***************************************************************************************/
    /***************************************************************************************/
    // PRIVATE METHOD
    Clock.prototype.getDisplayTime = function (time) {
        /**
         * This is a method for preparing and updating the time
         *
         * -------------------------------------------
         * Parameter
         * time: Date - the current time object
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * text: str - the clean current time that will be displayed
         * -------------------------------------------
         *
         */
        // parsing the AM and PM
        var ampm = time.getHours() >= 12 ? 'PM' : 'AM';
        // parsing the hours
        var hours = time.getHours() % 12;
        hours = hours ? hours : 12;
        hours = this.cleanTime(hours);
        // parsing the minutes
        var minutes = time.getMinutes();
        minutes = this.cleanTime(minutes);
        // parsing the seconds
        var seconds = time.getSeconds();
        seconds = this.cleanTime(seconds);
        // parsing the month
        var month = time.getMonth() + 1;
        month = this.cleanTime(month);
        // parsing the date
        var date = time.getDate();
        date = this.cleanTime(date);
        // parsing the year
        var year = time.getFullYear().toString();
        // combining all the date text
        var text = "".concat(date, "/").concat(month, "/").concat(year, " - ").concat(hours, ":").concat(minutes, ":").concat(seconds, " ").concat(ampm);
        return text;
    };
    Clock.prototype.cleanTime = function (time) {
        /**
         * This is a method for appending leading 0 if less than 10
         *
         * -------------------------------------------
         * Parameter
         * time: int - the time that will be cleaned
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * tmp: str - the time that has been cleaned
         * -------------------------------------------
         */
        // converting to string
        var tmp = time.toString();
        // appending the leading zero if less than 10
        tmp = tmp.length == 1 ? '0' + tmp : tmp;
        return tmp;
    };
    return Clock;
}());
var Form = /** @class */ (function () {
    function Form() {
    }
    /***************************************************************************************/
    // PROTECTED METHOD
    Form.prototype.checkNull = function (value) {
        /**
         * This is a method for checking whether the input form value is empty
         *
         * -------------------------------------------
         * Parameter
         * value: str - the value of the form that will be checked
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * false if the value is empty
         * true if the value is not empty
         * -------------------------------------------
         */
        return (value.length == 0) ? false : true;
    };
    Form.prototype.checkEmail = function (email) {
        /**
         * This is a method for checking whether the email form value is valid input
         * -------------------------------------------
         * Parameter
         * email: str - the email that will be checked
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * false if the there is no binus.ac.id and no @ symbols
         * true if there is binus.ac.id and @ symbols
         * -------------------------------------------
         */
        var extension = "binus.ac.id";
        var indexadd = email.indexOf("@");
        // checking @ symbols
        if (indexadd == -1) {
            return false;
        }
        // checking the extension of the email
        if (email.substr(indexadd + 1, email.length) != extension) {
            return false;
        }
        return true;
    };
    Form.prototype.validateStringOnly = function (e) {
        /**
         * This is a method for denying all integer input and only allow character input for the form
         *
         * -------------------------------------------
         * Parameter
         * e - the event of the form when inputted
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        var theEvent = e || window.event;
        var key = this.getInput(theEvent);
        var regex = /[a-zA-Z\s]/;
        // checking for regex a - z or A - Z or space
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault)
                theEvent.preventDefault();
        }
    };
    Form.prototype.validateNumberOnly = function (e) {
        /**
         * This is a method for denying all character input and only allow integer input for the form
         *
         * -------------------------------------------
         * Parameter
         * e - the event of the form when inputted
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        var theEvent = e || window.event;
        var key = this.getInput(theEvent);
        var regex = /[0-9]|\./;
        // checking regex for 0 - 9 or .
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault)
                theEvent.preventDefault();
        }
    };
    Form.prototype.reset = function () {
        /**
         * This is a method for initialize all indication of the form
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
        this.nameOk = 0;
        this.emailOk = 0;
        this.nimOk = 0;
        this.roleOk = 0;
        this.jurusanOk = 0;
        this.jurusanTeacherOk = 0;
        this.nameCategoryOk = 0;
        this.contentCategoryOk = 0;
        this.passwordOk = 0;
    };
    Form.prototype.validName = function () {
        /**
         * This is a method for checking the name input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var newName = this.nameForm.value.trim();
        // checking whether the value is null
        if (!this.checkNull(newName)) {
            alert("Please insert the name");
            this.nameOk = 0;
            return;
        }
        this.nameOk = 1;
    };
    Form.prototype.validNim = function () {
        /**
         * This is a method for checking the nim input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var newNim = this.nimForm.value.trim();
        // checking whether the value is null
        if (!this.checkNull(newNim)) {
            alert("Please insert the nim");
            this.nimOk = 0;
            return;
        }
        // checking whether the nim is too short
        if (newNim.length < 5) {
            alert("nim is invalid");
            this.nimOk = 0;
            return;
        }
        this.nimOk = 1;
    };
    Form.prototype.validMajor = function () {
        /**
         * This is a method for checking the major of the student input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var newJurusan = this.jurusanForm.value.trim();
        var default_value = this.jurusanForm.children[0].value.trim();
        // checking the value if it is the default value or not
        if (newJurusan == default_value) {
            alert("Please insert the major");
            this.jurusanOk = 0;
            return;
        }
        this.jurusanOk = 1;
    };
    Form.prototype.validRole = function () {
        /**
         * This is a method for checking the role of the teacher input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var newRole = this.roleForm.value.trim();
        // checking whether the value is null
        if (!this.checkNull(newRole)) {
            alert("Please insert the role of teacher");
            this.roleOk = 0;
            return;
        }
        this.roleOk = 1;
    };
    Form.prototype.validMajorTeacher = function () {
        /**
         * This is a method for checking the major of the teacher input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var newJurusanTeacher = this.jurusanTeacherForm.value.trim();
        // checking whether the value is null
        if (!this.checkNull(newJurusanTeacher)) {
            alert("Please insert the major of teacher");
            this.jurusanTeacherOk = 0;
            return;
        }
        this.jurusanTeacherOk = 1;
    };
    Form.prototype.validEmail = function () {
        /**
         * This is a method for checking the email input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var newEmail = this.emailForm.value.trim();
        // checking whether the value is null
        if (!this.checkNull(newEmail)) {
            alert("Please insert the email");
            this.emailOk = 0;
            return;
        }
        // checking the extension of the email
        if (!this.checkEmail(newEmail)) {
            alert("We only accept @binus.ac.id");
            this.emailOk = 0;
            return;
        }
        this.emailOk = 1;
    };
    Form.prototype.validCategoryName = function () {
        /**
         * This is a method for checking the category name input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var newCategoryName = this.nameCategoryForm.value.trim();
        // checking whether the value is null
        if (!this.checkNull(newCategoryName)) {
            alert("Please insert the category name");
            this.nameCategoryOk = 0;
            return;
        }
        this.nameCategoryOk = 1;
    };
    Form.prototype.validCategoryContent = function () {
        /**
         * This is a method for checking the content of category input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var newCategoryContent = this.contentCategoryForm.value.trim();
        // checking whether the value is null
        if (!this.checkNull(newCategoryContent)) {
            alert("Please insert the category content");
            this.contentCategoryOk = 0;
            return;
        }
        this.contentCategoryOk = 1;
    };
    Form.prototype.validPassword = function () {
        /**
         * This is a method for checking the password input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var password = this.passwordForm.value.trim();
        // checking whether the value is null
        if (!this.checkNull(password)) {
            alert("Please insert the password");
            this.passwordOk = 0;
            return;
        }
        this.passwordOk = 1;
    };
    Form.prototype.validConfPassword = function () {
        /**
         * This is a method for checking the confirmation password input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var confPassword = this.confirmationPasswordForm.value.trim();
        var password = this.passwordForm.value.trim();
        // checking whether the value is null
        if (!this.checkNull(confPassword)) {
            alert("Please insert the confirmation password");
            this.passwordOk = 0;
            return;
        }
        // checking whether the password and confirmation password is the same
        if (confPassword != password) {
            alert("Confirmation password is not matched");
            this.passwordOk = 0;
            return;
        }
        this.passwordOk = 1;
    };
    Form.prototype.validUrutanAccepted = function () {
        /**
         * This is a method for checking the acceptance order input form
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         */
        var urutan = this.urutanCategoryAccepted.value.split(",");
        // checking whether the value is null
        if (urutan[0].length == 0) {
            alert("Please insert one role for confirmation");
            this.urutanOk = 0;
            return;
        }
        this.urutanOk = 1;
    };
    /***************************************************************************************/
    /***************************************************************************************/
    // PRIVATE METHOD
    Form.prototype.getInput = function (theEvent) {
        /**
         * This is a method for getting which input is being inserted to the form
         *
         * -------------------------------------------
         * Parameter
         * theEvent - event of the user input
         * -------------------------------------------
         *
         * -------------------------------------------
         * Return
         * key: str - the key what the user inputted
         * -------------------------------------------
         */
        var key = null;
        // handle the paste command
        if (theEvent.type === 'paste') {
            key = event.clipboardData.getData('text/plain');
        }
        else {
            // Handle key press
            key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        return key;
    };
    return Form;
}());
var ProfileDropdown = /** @class */ (function () {
    function ProfileDropdown(class_dropdown, class_dropdown_button) {
        var _this = this;
        /**
         * Parameter
         * class_dropdown: str - class of the dropdown element
         * class_dropdown_button: str - class of the button that enables to open the dropdown
         */
        this.dropdown = document.querySelector(class_dropdown);
        this.dropdownButton = document.querySelector(class_dropdown_button);
        // adding click event listener
        this.dropdownButton.addEventListener("click", function (e) { return _this.openDropdown(); });
        // close the dropdown if user click outside the dropdown
        document.addEventListener("click", function (e) {
            if (!e.target.matches(class_dropdown_button)) {
                _this.closeDropdown();
            }
        }, true);
    }
    /***************************************************************************************/
    // PUBLIC METHOD
    ProfileDropdown.prototype.openDropdown = function () {
        /**
         * This is a method for opening the dropdown
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
        this.dropdown.classList.toggle("show");
    };
    ProfileDropdown.prototype.closeDropdown = function () {
        /**
         * This is a method for closing the dropdown
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
        this.dropdown.classList.remove("show");
    };
    return ProfileDropdown;
}());
var Flash = /** @class */ (function () {
    function Flash(idfail) {
        /**
         * Parameter
         * idfail: str - id of the flash popup window
         */
        var _this = this;
        this.failedform = document.getElementById(idfail);
        // close the flash window if user click outside the popup window
        document.addEventListener("click", function (e) {
            if (!e.target.matches("#".concat(idfail))) {
                _this.closeFailed();
            }
        }, true);
    }
    /***************************************************************************************/
    // PUBLIC METHODS
    Flash.prototype.closeFailed = function () {
        /**
         * This is a method for closing the flash popup window
         *
         * -------------------------------------------
         * Parameter
         * None
         * -------------------------------------------
         *
         *
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        // closing the flash popup window
        if (this.failedform) {
            this.failedform.style.display = "none";
        }
    };
    return Flash;
}());
