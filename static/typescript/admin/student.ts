import {HTML, input, int, str, bool, ListHTML, button, ListButton, ListInput} from '../type'

class AdminStudent extends Admin{
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
    constructor(datas: Array<any>, theadcolumns: str){
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * theadcolumns: str - the header of the table
         */
        super(datas, theadcolumns)
        this.updateTable()
        this.updateEventListenerButton()
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    private updateTable(): void{
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
        if (this.datas){
            this.datas.forEach(
                (data: any) => {
                    // inserting all data and make the edit and delete button
                
                    const new_row: str = 
                    `
                    <tr>
                        <td>${data.nim}</td>
                        <td>${data.name}</td>
                        <td>${data.batch}</td>
                        <td>${data.jurusan}</td>
                        <td>
                            <div class="response">
                                <button class="edit" data-id="${data.user_id}"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                <button class="delete" data-id="${data.user_id}"> <i class="fa fa-trash-o"></i></button>
                            </div> 
                        </td>
                    </tr>
                    `
                    
                    this.tbody.insertAdjacentHTML("beforeend", new_row)
                }
            )
        }
    }
    /***************************************************************************************/
}
class EditStudentForm extends EditForm{
    /**
     * This is class for making the edit popup UI in admin teacher page
     * 
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas of all teachers
     * class_edit_buttons: str - the class of edit buttons 
     * class_edit_container: str - the class of edit popup container
     * class_back_button: str - the class of back button
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * submitButton: str - the hidden button for submitting the form
     * nameForm: input - the input form for the name
     * nimForm: input - the input form for the nim
     * jurusanForm: input - the input form for the major of the teacher
     * emailForm: input - the input form for the email
     * 
     * PRIVATE:
     * confirmButton: button - the button for confirming the form
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * updateEventListener(): void - a method for initializing the popup edit container when user click edit button
     * updateConfirmationEventListener(): void - a method for validating the user input
     * updateInputEventListener(): void - a method for making some constraint in some inputs
     * -------------------------------------------
   */
    private confirmButton: button

    constructor(datas: Array<any>, class_edit_buttons: str, class_edit_container: str, class_back_button: str){
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * class_edit_buttons: str - the class of edit buttons 
         * class_edit_container: str - the class of edit popup container
         * class_back_button: str - the class of back button
         */
        super(datas, class_edit_buttons, class_edit_container, class_back_button)
        this.confirmButton = document.querySelector(".confirm")
        this.submitButton = document.querySelector(".submit-edit")
        this.nameForm = document.querySelector(".editnama")
        this.nimForm = document.querySelector(".editnim")
        this.jurusanForm = document.querySelector(".editjurusan")
        this.emailForm = document.querySelector(".editemail")
        
        
        // remove all of the form initial value when user click outside the edit form
        document.addEventListener("click", e=>{
            if (!(e.target as Element).closest(class_edit_container)){
                this.idForm.value = null
                this.nameForm.value = null
                this.nimForm.value = null
                this.jurusanForm.value = this.jurusanForm.children[0].value
                this.emailForm.value = null
                this.editContainer.classList.remove("show")
            }
        }, true)
        this.updateInputEventListener()
        this.updateEventListener()
        this.updateConfirmationEventListener()
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    private updateEventListener(): void{
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
        this.editButtons.forEach(
            (button: button) => button.addEventListener("click", e => {
                let editData = this.datas.filter(data => data['user_id'] == button.dataset.id)
                editData = editData[0]
                this.idForm.value = button.dataset.id
                this.nameForm.value = editData.name
                this.nimForm.value = editData.nim
                this.jurusanForm.value = editData.jurusan
                this.emailForm.value = editData.email
                this.editContainer.classList.add("show")
            })
        )
        // remove initial value of each input form when user click back button
        this.backButton.addEventListener("click", e => {
            this.idForm.value = null
            this.nameForm.value = null
            this.nimForm.value = null
            this.jurusanForm.value = this.jurusanForm.children[0].value
            this.emailForm.value = null
            this.editContainer.classList.remove("show")
        })
    }

    private updateConfirmationEventListener(): void{
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
        this.confirmButton.addEventListener("click", e => {
            this.validID(this.confirmButton)
            this.validName(this.confirmButton)
            this.validNim(this.confirmButton)
            this.validMajor(this.confirmButton)
            this.validEmail(this.confirmButton)
            if (!this.idOk || !this.nameOk || !this.nimOk || !this.jurusanOk || !this.emailOk){
                e.preventDefault()
                return
            }
            this.submitButton.click()
        })
    }

    private updateInputEventListener(){
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
        this.nameForm.addEventListener("keypress", e=>this.validateStringOnly(e))

        // adding some constraint for the nim form so that it can be inputted only integer data
        this.nimForm.addEventListener("keypress", e=>this.validateNumberOnly(e))
    }
    /***************************************************************************************/
}
class AddStudentForm extends AddForm{
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
    constructor(id: str){
        /**
         * Parameters:
         * id: str - the id of the add popup window
         */
        super(id)
        this.nameForm = document.querySelector(".addname")
        this.nimForm = document.querySelector(".addnim")
        this.jurusanForm = document.querySelector(".addjurusan")
        this.emailForm = document.querySelector(".addemail")
        this.submitButton = document.querySelector(".btnsubmit")
        
        this.updateSubmitEventListener()
        this.updateKeyPressEventListener()
    }
    /***************************************************************************************/
    // PRIVATE METHOD
    private updateSubmitEventListener(): void{
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
        this.submitButton.addEventListener("click", e=>{
            this.validName()
            this.validNim()
            this.validMajor()
            this.validEmail()
            if (!this.nameOk || !this.nimOk || !this.jurusanOk || !this.emailOk){
                e.preventDefault()
                return
            }
        })
        
    }

    private updateKeyPressEventListener(): void{
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
        this.nameForm.addEventListener("keypress", () => this.validateStringOnly())
        
        // adding some constraint for the nim form so that it can be inputted only integer data
        this.nimForm.addEventListener("keypress", () => this.validateNumberOnly())
    }
    /***************************************************************************************/
    
}
// the table columns
const theadColumns = 
`
<tr>
    <th>NIM</th>
    <th>Name</th>
    <th>Batch</th>
    <th>Program</th>
    <th>Actions</th>
</tr>
`
// make the admin student data UI
var studentAdmin = new AdminStudent(datas.students, theadColumns)

// make the edit popup window UI
var editStudent = new EditStudentForm(datas.students, ".edit", ".studenteditpopupcontainer", ".back")

// make the add popup window UI
let addForm = new AddStudentForm("myForm")