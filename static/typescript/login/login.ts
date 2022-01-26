import {HTML, int, str, bool, ListHTML, ListInput, ListButton, input, button, div} from '../type'

class LoginForm extends Form{
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
    constructor(class_email: str, class_password: str, class_button: str){
        /**
         * 
         * Parameters:
         * class_email: str - the class of the email form
         * class_password: str - the class of the password form
         * class_button: str - the class for submit button
         */
        super()
        this.emailForm = document.querySelector(class_email)
        this.passwordForm = document.querySelector(class_password)
        this.submitButton = document.querySelector(class_button)
        this.updateEventListener()
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    private updateEventListener(): void{
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
        this.submitButton.addEventListener("click", e=>{
            this.validEmail()
            this.validPassword()
            if (!this.emailOk || !this.passwordOk){
                e.preventDefault()
                return
            }
        })
    }
    /***************************************************************************************/
}

class ForgotPasswordForm extends Form{
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
    constructor(class_email: str, class_button: str){
        /**
         * Parameters:
         * class_email: str - the class of the email form
         * class_button: str - the class for submit button
         */
        super()
        this.emailForm = document.querySelector(class_email)
        this.submitButton = document.querySelector(class_button)
        this.validate()
    }

    /***************************************************************************************/
    // PRIVATE METHOD
    private validate(): void{
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
        this.submitButton.addEventListener("click", e=>{
            this.validEmail()
            if (!this.emailOk){
                e.preventDefault()
                return
            }
        })
    }
    /***************************************************************************************/
    
}

class SignUpForm extends Form{
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
    constructor(class_name: str, class_nim: str, class_jurusan: str, class_email: str, class_password: str, class_conf: str, class_button: str){
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
        super()
        this.nameForm = document.querySelector(class_name)
        this.nimForm = document.querySelector(class_nim)
        this.jurusanForm = document.querySelector(class_jurusan)
        this.emailForm = document.querySelector(class_email)
        this.passwordForm = document.querySelector(class_password)
        this.confirmationPasswordForm = document.querySelector(class_conf)
        this.submitButton = document.querySelector(class_button)
        this.validate()
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    private validate(): void{
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
        this.nameForm.addEventListener("keypress", e=>this.validateStringOnly())
        // make name form can be inputted with integer
        this.nimForm.addEventListener("keypress", e=>this.validateNumberOnly())

        // add event listener for validating user input when submitted
        this.submitButton.addEventListener("click", e => {
            this.validName()
            this.validNim()
            this.validMajor()
            this.validEmail()
            this.validPassword()
            this.validConfPassword()
            if (!this.nameOk || !this.nimOk || !this.jurusanOk || !this.emailOk || !this.passwordOk){
                e.preventDefault()
                return
            }
        })

    }
    /***************************************************************************************/
    
}


// make reset flash form UI
let flash = new Flash("failedsignin")

const openforgot = () => flash.openforgot()
const closeForm = () => flash.closeform()
const openNav = () => flash.openNav()
const closeNav = () => flash.closeNav()
const closefailed = () => flash.closeFailed()
const closeall = () => flash.closeAll()


// make login form UI
let loginForm = new LoginForm(".emailaddress", ".password", ".signin")


// make forgot password form UI
let forgotPassword = new ForgotPasswordForm(".restoration-email", ".btnsubmit")


// make sign up form UI
let signUpForm = new SignUpForm(".new-name", ".new-nim", ".new-jurusan", ".new-email",".new-password", ".confirmation-password", ".register")

