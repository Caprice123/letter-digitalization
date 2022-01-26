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
var ResetPassword = /** @class */ (function (_super) {
    __extends(ResetPassword, _super);
    /**
     * This is class for reset password
     *
     * -------------------------------------------
     * Parameters:
     * class_pass_form: str - class of password form
     * class_conf_form: str - class of confirmation password form
     * class_button: str - class of submit button
     * -------------------------------------------
     *
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * passwordForm: input - the input form for password
     * confirmationPasswordForm: input - the input form for confirmation password
     * submitButton: button - the button for submitting the form
     * -------------------------------------------
     *
     *
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * validate(): void - a method for validating the confirmation password and password
     * -------------------------------------------
   */
    function ResetPassword(class_pass_form, class_conf_form, class_button) {
        var _this = 
        /**
         * Parameters:
         * class_pass_form: str - class of password form
         * class_conf_form: str - class of confirmation password form
         * class_button: str - class of submit button
         */
        _super.call(this) || this;
        _this.passwordForm = document.querySelector(class_pass_form);
        _this.confirmationPasswordForm = document.querySelector(class_conf_form);
        _this.submitButton = document.querySelector(class_button);
        _this.validate();
        return _this;
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    ResetPassword.prototype.validate = function () {
        var _this = this;
        /**
         * This is a method for validating the confirmation password and password
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
        // add event listener for clicking submit button and validate password and validate the confirmation password
        this.submitButton.addEventListener("click", function (e) {
            _this.validPassword();
            _this.validConfPassword();
            if (!_this.passwordOk) {
                e.preventDefault();
                return;
            }
        });
    };
    return ResetPassword;
}(Form));
var ResetFlash = /** @class */ (function (_super) {
    __extends(ResetFlash, _super);
    /**
     * This is a class for making reset flash
     *
     * -------------------------------------------
     * Parameters:
     * id_flash: str - id of flash container
     * -------------------------------------------
     *
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * failedform: HTML - flash container
     * -------------------------------------------
     *
     *
     * -------------------------------------------
     * Methods:
     * PUBLIC:
     * openfailed(): void - a method for opening the reset flash
     * closeDropdown(): void - a method for closing the reset flash
     * -------------------------------------------
     */
    function ResetFlash(id_flash) {
        /**
         * Parameters:
         * id_flash: str - id of flash container
         */
        return _super.call(this, id_flash) || this;
    }
    /***************************************************************************************/
    // PUBLIC METHOD
    ResetFlash.prototype.openfailed = function () {
        /**
         * This is a method for opening the reset flash
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
        this.failedform.style.display = "block";
    };
    ResetFlash.prototype.closefailed = function () {
        /**
         * This is a method for cllosing the reset flash
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
        this.failedform.style.display = "none";
    };
    return ResetFlash;
}(Flash));
// make reset password form UI
var reset_password = new ResetPassword(".crepassword", ".conpassword", ".submit");
// make the reset flash message for the page
var flash_reset_password = new ResetFlash("failedsignin");
var openfailed = function () { return flash_reset_password.openfailed(); };
var closefailed = function () { return flash_reset_password.closefailed(); };
