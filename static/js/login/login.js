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
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    /**
     * This is class for login form UI in login pages
     *
     * -------------------------------------------
     * Parameters:
     * class_email: str - the class of the email form
     * class_password: str - the class of the password form
     * class_button: str - the class for submit button
     * -------------------------------------------
     *
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * emailForm: input - the input form for the email
     * passwordForm: input - the input form for the password
     * submitButton: button - the button for login
     * -------------------------------------------
     *
     *
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * updateEventListener(): void - a method for validating user input when user submit the form
     * -------------------------------------------
   */
    function LoginForm(class_email, class_password, class_button) {
        var _this = 
        /**
         *
         * Parameters:
         * class_email: str - the class of the email form
         * class_password: str - the class of the password form
         * class_button: str - the class for submit button
         */
        _super.call(this) || this;
        _this.emailForm = document.querySelector(class_email);
        _this.passwordForm = document.querySelector(class_password);
        _this.submitButton = document.querySelector(class_button);
        _this.updateEventListener();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    LoginForm.prototype.updateEventListener = function () {
        var _this = this;
        /**
         * This is a method for validating user input when user submit the form
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
        // add event listener for validating user input when submitted
        this.submitButton.addEventListener("click", function (e) {
            _this.validEmail();
            _this.validPassword();
            if (!_this.emailOk || !_this.passwordOk) {
                e.preventDefault();
                return;
            }
        });
    };
    return LoginForm;
}(Form));
var ForgotPasswordForm = /** @class */ (function (_super) {
    __extends(ForgotPasswordForm, _super);
    /**
     * This is class for forgot password UI in login pages
     *
     * -------------------------------------------
     * Parameters:
     * class_email: str - the class of the email form
     * class_button: str - the class for submit button
     * -------------------------------------------
     *
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * emailForm: input - the input form for the email
     * submitButton: button - the button for login
     * -------------------------------------------
     *
     *
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * validate(): void - a method for validating user input when user submit the form
     * -------------------------------------------
   */
    function ForgotPasswordForm(class_email, class_button) {
        var _this = 
        /**
         * Parameters:
         * class_email: str - the class of the email form
         * class_button: str - the class for submit button
         */
        _super.call(this) || this;
        _this.emailForm = document.querySelector(class_email);
        _this.submitButton = document.querySelector(class_button);
        _this.validate();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    ForgotPasswordForm.prototype.validate = function () {
        var _this = this;
        /**
         * This is a method for validating user input when user submit the form
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
        // add event listener for validating user input when submitted
        this.submitButton.addEventListener("click", function (e) {
            _this.validEmail();
            if (!_this.emailOk) {
                e.preventDefault();
                return;
            }
        });
    };
    return ForgotPasswordForm;
}(Form));
var SignUpForm = /** @class */ (function (_super) {
    __extends(SignUpForm, _super);
    /**
     * This is class for sign up UI in login pages
     *
     * -------------------------------------------
     * Parameters:
     * class_name: str - the class of name input form
     * class_nim: str - the class of nim input form
     * class_jurusan: str - the class of major input form
     * class_email: str - the class of email input form
     * class_password: str - the class of password input form
     * class_conf: str - the class of confirmation password input form
     * class_button: str - the class of submit button input form
     * -------------------------------------------
     *
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * nameForm: input - the input form for the name
     * nimForm: input - the input form for the nim
     * jurusanForm: input - the input form for the major
     * emailForm: input - the input form for the email
     * passwordForm: input - the input form for the password
     * confirmationPasswordForm: input - the input form for the confirmation password
     * submitButton: button - the button for registering
     * -------------------------------------------
     *
     *
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * validate(): void - a method for validating user input when user submit the form
     * -------------------------------------------
   */
    function SignUpForm(class_name, class_nim, class_jurusan, class_email, class_password, class_conf, class_button) {
        var _this = 
        /**
         * Parameters:
         * class_name: str - the class of name input form
         * class_nim: str - the class of nim input form
         * class_jurusan: str - the class of major input form
         * class_email: str - the class of email input form
         * class_password: str - the class of password input form
         * class_conf: str - the class of confirmation password input form
         * class_button: str - the class of submit button input form
         */
        _super.call(this) || this;
        _this.nameForm = document.querySelector(class_name);
        _this.nimForm = document.querySelector(class_nim);
        _this.jurusanForm = document.querySelector(class_jurusan);
        _this.emailForm = document.querySelector(class_email);
        _this.passwordForm = document.querySelector(class_password);
        _this.confirmationPasswordForm = document.querySelector(class_conf);
        _this.submitButton = document.querySelector(class_button);
        _this.validate();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    SignUpForm.prototype.validate = function () {
        var _this = this;
        /**
         * This is a method for validating user input when user submit the form
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
        // make name form can be inputted with character
        this.nameForm.addEventListener("keypress", function (e) { return _this.validateStringOnly(); });
        // make name form can be inputted with integer
        this.nimForm.addEventListener("keypress", function (e) { return _this.validateNumberOnly(); });
        // add event listener for validating user input when submitted
        this.submitButton.addEventListener("click", function (e) {
            _this.validName();
            _this.validNim();
            _this.validMajor();
            _this.validEmail();
            _this.validPassword();
            _this.validConfPassword();
            if (!_this.nameOk || !_this.nimOk || !_this.jurusanOk || !_this.emailOk || !_this.passwordOk) {
                e.preventDefault();
                return;
            }
        });
    };
    return SignUpForm;
}(Form));
// make reset flash form UI
var flash = new Flash("failedsignin");
var openforgot = function () { return flash.openforgot(); };
var closeForm = function () { return flash.closeform(); };
var openNav = function () { return flash.openNav(); };
var closeNav = function () { return flash.closeNav(); };
var closefailed = function () { return flash.closeFailed(); };
var closeall = function () { return flash.closeAll(); };
// make login form UI
var loginForm = new LoginForm(".emailaddress", ".password", ".signin");
// make forgot password form UI
var forgotPassword = new ForgotPasswordForm(".restoration-email", ".btnsubmit");
// make sign up form UI
var signUpForm = new SignUpForm(".new-name", ".new-nim", ".new-jurusan", ".new-email", ".new-password", ".confirmation-password", ".register");
