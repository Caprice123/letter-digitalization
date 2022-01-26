import {HTML, input, int, str, bool, ListHTML, button, ListButton, ListInput, div} from '../type'

class Admin{
    /**
     * This is class for making the table UI for all admin pages
     * 
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas that will be displayed
     * theadcolumns: str - the header of the table
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * thead: HTML - the thead of the table
     * tbody: HTML - the tbody of the table
     * idInputDelete: button - the input form for deleting record based on id
     * submitBtnDelete: button- the submit button for deleting data
     * idInputEdit: button - the input form for editing record based on id
     * submitBtnEdit: button - the submit button for editing data
     * editButtons: ListHTML - all edit buttons
     * deleteButtons: ListHTML - all delete buttons
     * datas: Array<any> - the datas that will be displayed
     * theadcolumns: str - the string for the column of the table
     * editContainer: HTML - the edit popupcntainer
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PROTECTED:
     * updateEventListenerButton(): void - a method for giving event listener for all delete buttons
     * -------------------------------------------
   */
    protected thead: HTML
    protected tbody: HTML
    protected idInputDelete: input
    protected submitBtnDelete: button
    protected idInputEdit: input
    protected submitBtnEdit: button
    protected editButtons: ListHTML
    protected deleteButtons: ListHTML
    protected datas: Array<any>
    protected theadcolumns: str
    protected editContainer: HTML

    constructor(datas: Array<any>, theadcolumns: str){
        /**
         * Parameters:
         * datas: Array<any> - the datas that will be displayed
         * theadcolumns: str - the header of the table
         */
        this.thead = document.querySelector(".table-header")
        this.tbody = document.querySelector(".table-body")
        this.idInputDelete = document.querySelector(".id-input-delete")
        this.submitBtnDelete = document.querySelector(".submit-delete")
        this.idInputEdit = document.querySelector(".id-input-edit")
        this.submitBtnEdit = document.querySelector(".submit-edit")
        this.editButtons = null
        this.deleteButtons = null
        this.datas = datas
        this.theadcolumns = theadcolumns
        this.editContainer = document.querySelector(".editpopupcontainer")
        this.thead.insertAdjacentHTML("beforeend", this.theadcolumns)
    }
    /***************************************************************************************/
    // PROTECTED METHOD
    protected updateEventListenerButton(): void{
        /**
         * This is a method for giving event listener for all delete buttons
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
        // confirmation for deleting the record
        this.deleteButtons = document.querySelectorAll(".delete")
        this.deleteButtons.forEach(
            (deleteButton: HTML) => deleteButton.addEventListener("click", e => {
                if (confirm("Do you want to delete this record ?")){
                    this.idInputDelete.value = deleteButton.dataset.id
                    this.submitBtnDelete.click()
                }
            })
        )
        // adding some validation so user cannot bypass
        this.submitBtnDelete.addEventListener("click", e=>{
            if (this.idInputDelete.value == null){
                alert("You cannot bypass this")
                e.preventDefault()
                return
            }
        })
    }
    /***************************************************************************************/
}

class AddForm extends Form{
    /**
     * This is class for making add popup UI for all admin pages
     * 
     * -------------------------------------------
     * Parameters:
     * id: str - the id of the add popup container
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PRIVATE
     * form: HTML - the form of the add popup container
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * None
     * -------------------------------------------
   */
    private form: HTML
    

    constructor(id: str){
        /**
         * Parameters:
         * id: str - the id of the add popup container
         */
        super()
        this.form = document.getElementById(id)
        let addButton = document.querySelector(".addbutton")
        let backButton= document.querySelector(".btncancel")
        // close popup window if user click outside the popup window
        document.addEventListener("click", e=> {
            if (!(e.target as Element).closest(`#${id}`)){
                this.form.style.display = "none"
            }
        }, true)

        // open the popup window if user click add button
        if (addButton){
            addButton.addEventListener("click", () => this.form.style.display = "block")
        }
        // close popup window if user click the back button
        if (backButton){
            backButton.addEventListener('click', () => this.form.style.display = "none")
        }
    }
}

class SidebarDropdown{
    /**
     * This is class for making sidebar at all admin pages
     * 
     * -------------------------------------------
     * Parameters:
     * class_button: str - the class of the user dropdown in the sidebar
     * class_container: str - the class of the sidebar content that will be dropdowned
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PRIVATE
     * button: button - button for opening the dropdown
     * container: HTML - the container that contains the dropdown
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * None
     * -------------------------------------------
   */
    private button: button
    private container: HTML

    constructor(class_button: str, class_container: str){
        /**
         * Parameters:
         * class_button: str - the class of the user dropdown in the sidebar
         * class_container: str - the class of the sidebar content that will be dropdowned
         */
        this.button = document.querySelector(class_button)
        this.container = document.querySelector(class_container)

        // open or close the container if user click the button
        this.button.addEventListener("click", e=> {
            this.button.classList.toggle("active")
            this.container.classList.toggle("active")
        })
    }

}

class EditForm extends Form{
    /**
     * This is class for making edoit popup UI for all admin pages
     * 
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas that can be modified
     * class_edit_buttons: str - the class of edit buttons
     * class_edit_container: str - the class of edit popup window
     * class_back_button: str - the class for closing the popup window
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * editButtons: ListButton - the edit buttons
     * editContainer: div - the edit popup window
     * backButton: button - the button for closing the popup window
     * idForm: input - the input form that contains the id of the data that is changed
     * datas: Array<any> - the datas that can be modified
     * idOk: int - indication whether id form is valid
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PROTECTED
     * validID() : void - a method for validating the id form
     * -------------------------------------------
   */
    protected editButtons: ListButton
    protected editContainer: div
    protected backButton: button
    protected idForm: input
    protected datas: Array<any>
    protected idOk: int

    constructor(datas: Array<any>, class_edit_buttons: str, class_edit_container: str, class_back_button: str){
        /**
         * Parameters:
         * datas: Array<any> - the datas that can be modified
         * class_edit_buttons: str - the class of edit buttons
         * class_edit_container: str - the class of edit popup window
         * class_back_button: str - the class for closing the popup window
         */
        super()
        this.editButtons = document.querySelectorAll(class_edit_buttons)
        this.editContainer = document.querySelector(class_edit_container)
        this.backButton = document.querySelector(class_back_button)
        this.idForm = document.querySelector(".id-input-edit")
        this.datas = datas
        this.idOk = 0
        this.reset()
    }
    /***************************************************************************************/
    // PROTECTED METHOD
    protected validID(): void{
        /**
         * This is a method for validating the id form
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
        // make some validation for id so that user cannot bypass it
        if (!this.checkNull(this.idForm.value.trim())){
            alert("You cannot Bypass this")
            this.idOk = 0
            return
        }
        this.idOk = 1
    }
    /***************************************************************************************/
    
}



