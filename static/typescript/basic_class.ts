import {HTML, int, str, bool, div, ListHTML, input, button} from './type'
class Clock{
    /**
     * This is class for making a clock UI in all pages
     * 
     * -------------------------------------------
     * Parameters:
     * id: str : id of the element
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PRIVATE
     * element: HTML - the target where the clock will be shown
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PUBLIC:
     * update(): void - a method for updating the clock of the page
     * 
     * PRIVATE
     * getDisplayTime(time: Date): str - a method for preparing and updating the time
     * cleanTime(time: int): str - a method for appending leading 0 if less than 10
     * -------------------------------------------
   */
    private element: HTML

    constructor(id: str) {
        /**
         * Parameter
         * id: str - the id of the clock element
         * 
         */
        this.element = document.getElementById(id)
    }

    /***************************************************************************************/
    // PUBLIC METHOD
    public update(): void{
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

        // getting the current time
        let now = new Date()

        // updating the text
        let text = this.getDisplayTime(now)
        this.element.textContent = text
        setTimeout(() => {
            this.update()
        }, 1000)
    }
    /***************************************************************************************/

    /***************************************************************************************/
    // PRIVATE METHOD
    private getDisplayTime(time: Date): str{
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
        let ampm: str = time.getHours() >= 12 ? 'PM' : 'AM'

        // parsing the hours
        let hours: str | int = time.getHours() % 12
        hours = hours ? hours : 12
        hours = this.cleanTime(hours)

        // parsing the minutes
        let minutes: str | int  = time.getMinutes()
        minutes = this.cleanTime(minutes)

        // parsing the seconds
        let seconds: str | int = time.getSeconds()
        seconds =  this.cleanTime(seconds)

        // parsing the month
        let month: str | int = time.getMonth() + 1
        month = this.cleanTime(month)

        // parsing the date
        let date: str | int = time.getDate()
        date = this.cleanTime(date)

        // parsing the year
        let year: str = time.getFullYear().toString()

        // combining all the date text
        let text = `${date}/${month}/${year} - ${hours}:${minutes}:${seconds} ${ampm}`
        return text
    }
    
    private cleanTime(time: int): str{
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
        let tmp: str = time.toString()

        // appending the leading zero if less than 10
        tmp = tmp.length == 1 ? '0' + tmp: tmp
        return tmp
    }
    /***************************************************************************************/
}

class Form{
    /**
     * This is class for form UI in all pages
     * 
     * -------------------------------------------
     * Parameters:
     * None
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * nameForm: input - input form for the name
     * emailForm: input - input form for the email
     * roleForm: input - input form for the teacher role
     * jurusanForm: input - input form for the student major
     * jurusanTeacherForm: input - input form for the teacher major
     * submitButton: button - button for submitting the form
     * nameCategoryForm: input - input form for the category name
     * contentCategoryForm: input - input form for the content of the category
     * urutanCategoryAccepted: input - input form for the acceptance order of the record
     * passwordForm: input - input form for the password of the user
     * confirmationPasswordForm: input - input form for the confirmation password if register or reset password
     * 
     * nameOk: int - indication whether the name input form is valid input
     * emailOk: int - indication whether the email input form is valid input
     * nimOk: int - indication whether the nim input form is valid input
     * roleOk: int -  indication whether the role of the teacher input form is valid input
     * jurusanOk: int -  indication whether the major of student input form is valid input
     * jurusanTeacherOk: int -  indication whether the major of teacher input form is valid input
     * nameCategoryOk: int -  indication whether the category name input form is valid input
     * contentCategoryOk: int -  indication whether the content of the category input form is valid input
     * passwordOk: int -  indication whether the password input form is valid input
     * urutanOk: int - indication whether the order of the acceptance input form is valid input
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PROTECTED:
     * checkNull(value: str): bool - a method for checking whether the input form value is empty
     * checkEmail(email: str): bool - a method for checking whether the email form value is valid input
     * validateStringOnly(e): void - a method for denying all integer input and only allow character input for the form
     * validateNumberOnly(e): void - a method for denying all character input and only allow integer input for the form
     * reset(): void - a method for initialize all indication of the form
     * validName(): void - a method for checking the name input form
     * validNim(): void - a method for checking the nim input form
     * validMajor(): void - a method for checking the major of the student input form
     * validRole(): void - a method for checking the role of the teacher input form
     * validMajorTeacher(): void - a method for checking the major of the teacher input form
     * validEmail(): void - a method for checking the email input form
     * validCategoryName(): void - a method for checking the category name input form
     * validCategoryContent(): void - a method for checking the content of category input form
     * validPassword(): void - a method for checking the password input form
     * validConfPassword(): void - a method for checking the confirmation password input form
     * validUrutanAccepted(): void - a method for checking the acceptance order input form
     * 
     * PRIVATE:
     * getInput(theEvent): str - a method for getting which input is being inserted to the form
     * 
     * -------------------------------------------
   */
    protected nameForm: input
    protected emailForm: input
    protected nimForm: input
    protected roleForm: input
    protected jurusanForm: input
    protected jurusanTeacherForm: input
    protected submitButton: button
    protected nameCategoryForm: input
    protected contentCategoryForm: input
    protected urutanCategoryAccepted: input
    protected passwordForm: input
    protected confirmationPasswordForm: input

    protected nameOk: int
    protected emailOk: int
    protected nimOk: int
    protected roleOk: int
    protected jurusanOk: int
    protected jurusanTeacherOk: int
    protected nameCategoryOk: int
    protected contentCategoryOk: int
    protected passwordOk: int
    protected urutanOk: int

    /***************************************************************************************/
    // PROTECTED METHOD
    protected checkNull(value: str): bool{
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
        return (value.length == 0) ? false : true
    }
    protected checkEmail(email: str): bool{
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

        const extension: str = "binus.ac.id"
        const indexadd: int = email.indexOf("@")
        // checking @ symbols
        if (indexadd == -1){
            return false
        }
        // checking the extension of the email
        if (email.substr(indexadd + 1, email.length) != extension){
            return false
        }
        return true
    }
    protected validateStringOnly(e): void{
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
        var theEvent = e || window.event
        let key: str|int|null = this.getInput(theEvent)
        var regex = /[a-zA-Z\s]/
        // checking for regex a - z or A - Z or space
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    protected validateNumberOnly(e): void{
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
        var theEvent = e || window.event
        let key: str|int|null = this.getInput(theEvent)
        var regex = /[0-9]|\./
        // checking regex for 0 - 9 or .
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    protected reset(): void{
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
        this.nameOk = 0
        this.emailOk = 0
        this.nimOk = 0
        this.roleOk = 0
        this.jurusanOk = 0
        this.jurusanTeacherOk = 0
        this.nameCategoryOk = 0
        this.contentCategoryOk = 0
        this.passwordOk = 0
    }
    protected validName(): void{
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
        let newName: str = this.nameForm.value.trim()

        // checking whether the value is null
        if (!this.checkNull(newName)){
            alert("Please insert the name")
            this.nameOk = 0
            return
        }
        this.nameOk = 1
    }
    protected validNim(): void{
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
        let newNim: str = this.nimForm.value.trim()
        // checking whether the value is null
        if (!this.checkNull(newNim)){
            alert("Please insert the nim")
            this.nimOk = 0
            return
        }
        // checking whether the nim is too short
        if (newNim.length < 5){
            alert("nim is invalid")
            this.nimOk = 0
            return
        }
        this.nimOk = 1
    }
    protected validMajor(): void{
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
        let newJurusan: str = this.jurusanForm.value.trim()
        let default_value: str = this.jurusanForm.children[0].value.trim()
        // checking the value if it is the default value or not
        if (newJurusan == default_value){
            alert("Please insert the major")
            this.jurusanOk = 0
            return
        }
        this.jurusanOk = 1
    }
    protected validRole(): void{
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
        let newRole = this.roleForm.value.trim()
        // checking whether the value is null
        if (!this.checkNull(newRole)){
            alert("Please insert the role of teacher")
            this.roleOk = 0
            return
        }
        this.roleOk = 1
    }
    protected validMajorTeacher(): void{
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
        let newJurusanTeacher = this.jurusanTeacherForm.value.trim()
        // checking whether the value is null
        if (!this.checkNull(newJurusanTeacher)){
            alert("Please insert the major of teacher")
            this.jurusanTeacherOk = 0
            return
        }
        this.jurusanTeacherOk = 1
    }
    protected validEmail(): void{
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
        let newEmail: str = this.emailForm.value.trim()
        // checking whether the value is null
        if (!this.checkNull(newEmail)){
            alert("Please insert the email")
            this.emailOk = 0
            return
        }
        // checking the extension of the email
        if (!this.checkEmail(newEmail)){
            alert("We only accept @binus.ac.id")
            this.emailOk = 0
            return
        }
        this.emailOk = 1
    }
    protected validCategoryName(): void{
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
        let newCategoryName: str = this.nameCategoryForm.value.trim()
        
        // checking whether the value is null
        if (!this.checkNull(newCategoryName)){
            alert("Please insert the category name")
            this.nameCategoryOk = 0
            return
        }
        this.nameCategoryOk = 1
    }
    protected validCategoryContent(): void{
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
        let newCategoryContent: str = this.contentCategoryForm.value.trim()
        
        // checking whether the value is null
        if (!this.checkNull(newCategoryContent)){
            alert("Please insert the category content")
            this.contentCategoryOk = 0
            return
        }
        this.contentCategoryOk = 1
    }
    protected validPassword(): void{
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
        let password: str = this.passwordForm.value.trim()
        // checking whether the value is null
        if (!this.checkNull(password)){
            alert("Please insert the password")
            this.passwordOk = 0
            return
        }
        this.passwordOk = 1
    } 
    protected validConfPassword(): void{
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
        let confPassword: str = this.confirmationPasswordForm.value.trim()
        let password: str = this.passwordForm.value.trim()

        // checking whether the value is null
        if (!this.checkNull(confPassword)){
            alert("Please insert the confirmation password")
            this.passwordOk = 0
            return
        }
        // checking whether the password and confirmation password is the same
        if (confPassword != password){
            alert("Confirmation password is not matched")
            this.passwordOk = 0
            return
        }
        this.passwordOk = 1
    }
    protected validUrutanAccepted(): void{
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
        let urutan = this.urutanCategoryAccepted.value.split(",")
        // checking whether the value is null
        if (urutan[0].length == 0){
            alert("Please insert one role for confirmation")
            this.urutanOk = 0
            return
        }
        this.urutanOk = 1
    }
    /***************************************************************************************/

    /***************************************************************************************/
    // PRIVATE METHOD
    private getInput(theEvent): str{
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
        let key: str|int|null = null
        // handle the paste command
        if (theEvent.type === 'paste') {
            key = (event as ClipboardEvent).clipboardData.getData('text/plain');
        } else {
        // Handle key press
            key = (theEvent as KeyboardEvent).keyCode || (theEvent as KeyboardEvent).which;
            key = String.fromCharCode(key);
        }
        return key
    }
    /***************************************************************************************/
}


class ProfileDropdown{
    /**
     * This is class for profile dropdown UI in all pages
     * 
     * -------------------------------------------
     * Parameters:
     * class_dropdown: str - class of the dropdown element
     * class_dropdown_button: str - class of the button that enables to open the dropdown
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PRIVATE
     * dropdown: HTML - the dropdown container
     * dropdownButton: button - the dropdown button
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PUBLIC:
     * openDropdown(): void - a method for opening the dropdown
     * closeDropdown(): void - a method for closing the dropdown
     * -------------------------------------------
   */
    private dropdown: HTML
    private dropdownButton: button


    constructor(class_dropdown: str, class_dropdown_button: str){
        /**
         * Parameter
         * class_dropdown: str - class of the dropdown element
         * class_dropdown_button: str - class of the button that enables to open the dropdown
         */
        this.dropdown = document.querySelector(class_dropdown)
        this.dropdownButton = document.querySelector(class_dropdown_button)
        
        // adding click event listener
        this.dropdownButton.addEventListener("click", e => this.openDropdown())

        // close the dropdown if user click outside the dropdown
        document.addEventListener("click", (e: Event)=> {
            if (!(e.target as Element).matches(class_dropdown_button)){
                this.closeDropdown()
            }
        }, true)
    }

    /***************************************************************************************/
    // PUBLIC METHOD
    public openDropdown(): void {
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
        this.dropdown.classList.toggle("show")
    }

    public closeDropdown(): void{
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
        this.dropdown.classList.remove("show")
    }
     /***************************************************************************************/
}

class Flash{
    /**
     * This is class for flash popup UI in all pages
     * 
     * -------------------------------------------
     * Parameters:
     * idfail: str - id of the flash popup window
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * failedform: HTML - the flash container
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PUBLIC:
     * closefailed(): void - a method for closing the flash popup window
     * -------------------------------------------
   */

    protected failedform: HTML
    constructor(idfail: str){
        /**
         * Parameter
         * idfail: str - id of the flash popup window
         */

        this.failedform = document.getElementById(idfail)

        // close the flash window if user click outside the popup window
        document.addEventListener("click", (e: Event)=> {
            if (!(e.target as Element).matches(`#${idfail}`)){
                this.closeFailed()
            }
        }, true)
    } 
    /***************************************************************************************/
    // PUBLIC METHODS
    public closeFailed(): void{
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
        if (this.failedform){
            this.failedform.style.display = "none"
        }
        
    }
    /***************************************************************************************/
}
