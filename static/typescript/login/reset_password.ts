import {HTML, int, str, bool, ListHTML, ListInput, ListButton, input, button, div} from '../type'

class ResetPassword extends Form{
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
    constructor(class_pass_form: str, class_conf_form: str, class_button: str){
        /**
         * Parameters:
         * class_pass_form: str - class of password form
         * class_conf_form: str - class of confirmation password form
         * class_button: str - class of submit button
         */
        super()
        this.passwordForm = document.querySelector(class_pass_form)
        this.confirmationPasswordForm = document.querySelector(class_conf_form)
        this.submitButton = document.querySelector(class_button)
        this.validate()
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    private validate(): void{
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
        this.submitButton.addEventListener("click", e=>{
            this.validPassword()
            this.validConfPassword()
            if (!this.passwordOk){
                e.preventDefault()
                return
            }
        })
    }
    /***************************************************************************************/    
}

class ResetFlash extends Flash{
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
    constructor(id_flash: str){
        /**
         * Parameters:
         * id_flash: str - id of flash container
         */
        super(id_flash)
    }
    /***************************************************************************************/
    // PUBLIC METHOD
    public openfailed(): void{
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
        this.failedform.style.display = "block"
    }
    public closefailed(): void{
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
        this.failedform.style.display = "none"
    }
    /***************************************************************************************/
}

// make reset password form UI
let reset_password = new ResetPassword(".crepassword", ".conpassword", ".submit")

// make the reset flash message for the page
let flash_reset_password  = new ResetFlash("failedsignin")
const openfailed = () => flash_reset_password.openfailed()
const closefailed = () => flash_reset_password.closefailed()