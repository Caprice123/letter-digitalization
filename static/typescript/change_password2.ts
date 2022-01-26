import {HTML, int, str, bool, ListHTML, ListInput, ListButton, input, button, div} from './type'

class ChangePasswordForm extends Form{
    private currentPasswordForm: input
    private newPasswordForm: input 
    private confirmPasswordForm: input
    private submitButton: button
    constructor(class_curr_pass: str, class_new_pass: str, class_conf_pass: str, class_submit: str){
        super()
        this.currentPasswordForm = document.querySelector(class_curr_pass)
        this.newPasswordForm = document.querySelector(class_new_pass)
        this.confirmPasswordForm = document.querySelector(class_conf_pass)
        this.submitButton = document.querySelector(class_submit)
        this.validate()
    }
    private validate(): void{
        this.submitButton.addEventListener("click", e => {
            let currentPassword: str = this.currentPasswordForm.value.trim()
            let newPassword: str = this.newPasswordForm.value.trim()
            let confirmPassword: str = this.confirmPasswordForm.value.trim()
                    
            if (!this.checkNull(currentPassword)){
                alert("Please insert current password")
                e.preventDefault()
                return
            }
            if (!this.checkNull(newPassword)){
                alert("Please insert new password")
                e.preventDefault()
                return
            }
            if (!this.checkNull(confirmPassword)){
                alert("Please insert confirmation password")
                e.preventDefault()
                return
            }
            if (newPassword != confirmPassword){
                alert("Password doesn't match")
                e.preventDefault()
                return
            }
        })
    }
}
let changePasswordForm = new ChangePasswordForm(".curpassword", ".crepassword", ".conpassword", ".submit")
