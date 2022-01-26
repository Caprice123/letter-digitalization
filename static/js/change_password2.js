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
var ChangePasswordForm = /** @class */ (function (_super) {
    __extends(ChangePasswordForm, _super);
    function ChangePasswordForm(class_curr_pass, class_new_pass, class_conf_pass, class_submit) {
        var _this = _super.call(this) || this;
        _this.currentPasswordForm = document.querySelector(class_curr_pass);
        _this.newPasswordForm = document.querySelector(class_new_pass);
        _this.confirmPasswordForm = document.querySelector(class_conf_pass);
        _this.submitButton = document.querySelector(class_submit);
        _this.validate();
        return _this;
    }
    ChangePasswordForm.prototype.validate = function () {
        var _this = this;
        this.submitButton.addEventListener("click", function (e) {
            var currentPassword = _this.currentPasswordForm.value.trim();
            var newPassword = _this.newPasswordForm.value.trim();
            var confirmPassword = _this.confirmPasswordForm.value.trim();
            if (!_this.checkNull(currentPassword)) {
                alert("Please insert current password");
                e.preventDefault();
                return;
            }
            if (!_this.checkNull(newPassword)) {
                alert("Please insert new password");
                e.preventDefault();
                return;
            }
            if (!_this.checkNull(confirmPassword)) {
                alert("Please insert confirmation password");
                e.preventDefault();
                return;
            }
            if (newPassword != confirmPassword) {
                alert("Password doesn't match");
                e.preventDefault();
                return;
            }
        });
    };
    return ChangePasswordForm;
}(Form));
var changePasswordForm = new ChangePasswordForm(".curpassword", ".crepassword", ".conpassword", ".submit");
