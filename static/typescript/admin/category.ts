import {HTML, input, int, str, bool, ListHTML, button, ListButton, ListInput} from '../type'

class AdminAdmin extends Admin{
    /**
     * This is class for making the table UI for the admin category page
     * 
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas of all categories
     * theadcolumns: str - the header of the table
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * datas: Array<any> - the datas of all teachers
     * theadcolumns: str - the header of the table
     * 
     * PRIVATE
     * textarea: input - textarea for the content of the category
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * updateEventListenerButton(): void - a method for adding event listener for all buttons
     * updateTable(): void - a method for showing the datas in the tables
     * -------------------------------------------
   */
    private textarea: input
    constructor(datas: Array<any>, theadcolumns: str){
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * theadcolumns: str - the header of the table
         */
        super(datas, theadcolumns)

        // sorting the data based on which one is active
        this.datas.sort((a, b) => {
            return a.disabled - b.disabled || a.category_name.localeCompare(b.category_name) 
        })
        this.updateTable()
        this.updateEventListenerButton()

        // enabling tab for the content of the category
        this.textarea = document.getElementById("contentt") as input
        this.textarea.onkeydown = (e: KeyboardEvent) => {
            if (e.keyCode === 9) { // tab was pressed
  
                // get caret position/selection
                var val = this.textarea.value,
                    start = this.textarea.selectionStart,
                    end = this.textarea.selectionEnd;
      
                // set textarea value to: text before caret + tab + text after caret
                this.textarea.value = val.substring(0, start) + '\t' + val.substring(end);
      
                // put caret at right position again
                this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
      
                // prevent the focus lose
                return false;
            }
        }
    }

    /***************************************************************************************/
    // PRIVATE METHOD
    private updateEventListenerButton(): void{
        /**
         * This is a method for adding event listener for all buttons
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

        // adding event listener for delete button 
        this.deleteButtons = document.querySelectorAll(".delete")
        this.deleteButtons.forEach(
            (deleteButton: HTML) => deleteButton.addEventListener("click", e => {
                var data = this.datas.filter(data => data.category_id == deleteButton.dataset.id)
                data = data[0]

                // confirmation for enabling the category again
                if (data.disabled){
                    if (confirm("Do you want to enable this record ?")){
                        this.idInputDelete.value = deleteButton.dataset.id
                        this.submitBtnDelete.click()
                    }
                }

                // confirmation for disabling the category again
                else{
                    if (confirm("Do you want to delete this record ?")){
                        this.idInputDelete.value = deleteButton.dataset.id
                        this.submitBtnDelete.click()
                    }
                }
                
            })
        )

        // validate the submit button so that it cannot be bypassed
        this.submitBtnDelete.addEventListener("click", e=>{
            if (this.idInputDelete.value == null){
                alert("You cannot bypass this")
                e.preventDefault()
                return
            }
        })
    }
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
        if(this.datas){
            this.datas.forEach(
                (data: any) => {
                    // inserting all data and make the edit and delete button
                    var new_row: str
                    // enabled visualization
                    if (data.disabled == false){
                        new_row = 
                        `
                        <tr>
                            <td>${data.category_id}</td>
                            <td>${data.category_name}</td>
                            <td>
                                <div class="response">
                                    <button class="edit" data-id="${data.category_id}"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                    <button class="delete" data-id="${data.category_id}"> <i class="fa fa-trash-o"></i></button>
                                </div> 
                            </td>
                        </tr>
                        `
                    }
                     // disabled visualization
                    else{
                        new_row = 
                        `
                        <tr style="text-decoration:line-through;">
                            <td>${data.category_id}</td>
                            <td>${data.category_name}</td>
                            <td>
                                <div class="response">
                                    <button class="edit" data-id="${data.category_id}"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                    <button class="delete" data-id="${data.category_id}"> <i class="fa fa-refresh" aria-hidden="true"></i></button>
                                </div> 
                            </td>
                        </tr>
                        `
                    }
                    
                    this.tbody.insertAdjacentHTML("beforeend", new_row)
                    
                   
                }
            )
        }
        
    }
    /***************************************************************************************/
    
}
class AddCategoryForm extends AddForm{
    /**
     * This is class for making the add popup UI in admin category page
     * 
     * -------------------------------------------
     * Parameters:
     * id: str - the id of the add popup window
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * nameCategoryForm: input - the input form for name of the category
     * contentCategoryForm: input - the input form for the content of category
     * urutanCategoryAccepted: input - the input form for the acceptance order
     * submitButton: str - the hidden button for submitting the form
     * 
     * PRIVATE
     * available_jurusan: HTML - the container for available major of the teacher
     * accepted_by: HTML - the container for accepted by data
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * updateSubmitEventListener(): void - a method for validating the user input
     * add_accepted_by(element): void - a method for adding the accepted by role for the required role accept
     * remove_accepted_by(element): void - a method for removing the accepted by role for the required role accept
     * updateKeyPressEventListener(): void - a method for making some constraint in some inputs
     * -------------------------------------------
   */
    private available_jurusan: HTML
    private accepted_by: HTML

    constructor(id : str){
        /**
         * Parameters:
         * id: str - the id of the add popup window
         */
        super(id)
        this.nameCategoryForm = document.querySelector(".addcategoryname")
        this.contentCategoryForm = document.querySelector(".addcategorycontent")
        this.submitButton = document.querySelector(".btnsubmit")
        this.urutanCategoryAccepted = document.querySelector(".urutan-accepted")
        this.available_jurusan = document.getElementById("add-available-jurusan")
        this.accepted_by = document.getElementById("add-accepted-by")
        this.updateSubmitEventListener()
        this.updateKeyPressEventListener()
    }
    private updateSubmitEventListener(): void{
        this.submitButton.addEventListener("click", e=>{
            console.log("This")
            this.validCategoryName()
            this.validCategoryContent()
            this.validUrutanAccepted()
            console.log(this.nameCategoryOk, this.contentCategoryOk,this.urutanOk)
            if (!this.nameCategoryOk || !this.contentCategoryOk || !this.urutanOk){
                e.preventDefault()
                return
            }
            
        })
        

        let available_jurusan_childrens = this.available_jurusan.children
        let accepted_by_childrens = this.accepted_by.children
        for (let index = 0; index < available_jurusan_childrens.length; index++) {
            const element = available_jurusan_childrens[index];
            const checkbox = element.querySelector("input[type=checkbox]")
            checkbox.addEventListener("change", e => this.add_accepted_by(e))
        }

        for (let index = 0; index < accepted_by_childrens.length; index++) {
            const element = accepted_by_childrens[index];
            const checkbox = element.querySelector("input[type=checkbox]")
            checkbox.addEventListener("change", e => this.remove_accepted_by(e))
        }
        console.log(available_jurusan_childrens)
    }

    private add_accepted_by(element): void{
        /**
         * This is a method for adding the accepted by role for the required role accept
         * 
         * -------------------------------------------
         * Parameter
         * element - the element that is clicked
         * -------------------------------------------
         * 
         * -------------------------------------------
         * Return 
         * None
         * -------------------------------------------
         */
        // parsing which element is clicked
        var updated = element.target.parentNode
        var clone_updated = updated.cloneNode(true)
        
        // remove it from the available jurusan
        this.available_jurusan.removeChild(updated)

        // append it to the accepted by order
        this.accepted_by.appendChild(clone_updated)

        // add the event listener for it
        clone_updated.addEventListener("change", e => this.remove_accepted_by(e))

        // insert new data into the form
        var new_role = element.target.nextElementSibling.textContent
        this.urutanCategoryAccepted.value += (this.urutanCategoryAccepted.value) ? `,${new_role}` : `${new_role}`
    }
    private remove_accepted_by(element): void{
        /**
         * This is a method for removing the accepted by role for the required role accept
         * 
         * -------------------------------------------
         * Parameter
         * element - the element that is clicked
         * -------------------------------------------
         * 
         * -------------------------------------------
         * Return 
         * None
         * -------------------------------------------
         */
        // parsing which element is clicked
        var updated = element.target.parentNode
        var clone_updated = updated.cloneNode(true)

        // remove it from the accepted by order
        this.accepted_by.removeChild(updated)

        // append it to the available jurusan
        this.available_jurusan.appendChild(clone_updated)

        // add the event listener for it
        clone_updated.addEventListener("change", e =>  this.add_accepted_by(e))

        // delete the data from the form
        var deleted_role = element.target.nextElementSibling.textContent
        var urutan = this.urutanCategoryAccepted.value.split(",")
        urutan = urutan.filter(data => data != deleted_role)
        this.urutanCategoryAccepted.value = urutan.join(",")
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
        // adding some constraint for the category name form so that it can be inputted only string data
        this.nameCategoryForm.addEventListener("keypress", () => this.validateStringOnly())
    }
}
class EditCategroryForm extends EditForm{
     /**
     * This is class for making the edit popup UI in admin category page
     * 
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the avaiable categories
     * class_edit_buttons: str - the class for edit buttons
     * class_edit_container: str - the class for edit popup
     * class_back_button: button - the button for back popup
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PROTECTED
     * nameCategoryForm: input - the input form for name of the category
     * contentCategoryForm: input - the input form for the content of category
     * urutanCategoryAccepted: input - the input form for the acceptance order
     * submitButton: str - the hidden button for submitting the form
     * 
     * PRIVATE
     * confirmButton: button - the button for confirming the input
     * availableJurusanList: HTML - the container for available major of the teacher
     * acceptedByList: HTML - the container for accepted by data
     * availableJurusan: str[] - the initial value
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * updateSubmitEventListener(): void - a method for initialize the edit popup
     * add_accepted_by(element): void - a method for adding the accepted by role for the required role accept
     * remove_accepted_by(element): void - a method for removing the accepted by role for the required role accept
     * filterContent(content: str): str - a method for filtering the data from the previous template
     * updateConfirmationEventListener(): void - a method for validating user input
     * updateKeyPressEventListener(): void - a method for making some constraint in some inputs
     * -------------------------------------------
   */
    private confirmButton: button
    private availableJurusanList: HTML
    private acceptedByList: HTML
    private availableJurusan: str[]

    constructor(datas: Array<any>, class_edit_buttons: str, class_edit_container: str, class_back_button: str){
        /**
         * Parameters:
         * datas: Array<any> - the datas of all teachers
         * class_edit_buttons: str - the class of edit buttons 
         * class_edit_container: str - the class of edit popup container
         * class_back_button: str - the class of back button
         */
        
        super(datas, class_edit_buttons, class_edit_container, class_back_button)
        this.nameCategoryForm = document.querySelector(".editcategoryname")
        this.contentCategoryForm = document.querySelector(".editcontent")
        this.urutanCategoryAccepted = document.querySelector(".edit-urutan-accepted")
        this.availableJurusanList = document.querySelector(".edit-available-jurusan")
        this.acceptedByList = document.querySelector(".edit-accepted-by")
        this.availableJurusan = []
        this.confirmButton = document.querySelector(".confirm")
        this.submitButton = document.querySelector(".submit-edit")
        var tmp = document.querySelector("#add-available-jurusan")
        
        // insert initial available major of the teacher
        for (let index = 0; index < tmp.children.length; index++) {
            const element = tmp.children[index];
            (this.availableJurusan as any).push(element.lastChild.textContent)
        }
        
        // remove the value for each form if user click outside the popup
        document.addEventListener("click", e=>{
            if (!(e.target as Element).closest(class_edit_container)){
                this.idForm.value = null
                this.nameCategoryForm.value = null
                this.contentCategoryForm.value = null
                this.urutanCategoryAccepted.value = null
                this.acceptedByList.innerHTML = ''
                this.availableJurusanList.innerHTML = ''
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
         * This is a method for initialize the edit popup
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
        // get initial value for each form when user click an edit button
        this.editButtons.forEach(
            (button: button) => 
            button.addEventListener("click", e => {
                let editData = this.datas.filter(data => data['user_id'] == button.dataset.id)
                editData = editData[0]
                var data = this.datas.filter(d => d.category_id == button.dataset.id)
                data = data[0]

                // fetch the data from the server and initialize the value for each form
                fetch(data.path_format)
                .then(res => res.text())
                .then((content: str) => {
                    this.idForm.value = button.dataset.id
                    this.nameCategoryForm.value = data.category_name
                    this.contentCategoryForm.value = this.filterContent(content)
                    this.urutanCategoryAccepted.value = data.required_role_accept.join(",")
                    this.editContainer.classList.add("show")
                    var available_jurusan = this.availableJurusan.filter(role => data.required_role_accept.indexOf(role) == -1 )
            
                    available_jurusan.forEach(
                        role => {
                            var checkbox = `<li><input type="checkbox" id=${role}><label for=${role}>${role}</label></li>`
                            this.availableJurusanList.insertAdjacentHTML("beforeend", checkbox)
                        }
                    )

                    data.required_role_accept.forEach(
                        role => {
                            var checkbox = `<li><input type="checkbox" id=${role} checked><label for=${role}>${role}</label></li>`
                            this.acceptedByList.insertAdjacentHTML("beforeend", checkbox)
                        }
                    )

                    // updating the event listener
                    for (let index = 0; index < this.availableJurusanList.children.length; index++) {
                        const element = this.availableJurusanList.children[index]
                        element.addEventListener("click", e => this.add_accepted_by(e))
                    }
                    for (let index = 0; index < this.acceptedByList.children.length; index++) {
                        const element = this.acceptedByList.children[index]
                        element.addEventListener("click", e => this.remove_accepted_by(e))
                    }
                })
            })
        )
        // remove the value if user click outside the popup window
        this.backButton.addEventListener("click", e => {
            this.idForm.value = null
            this.nameCategoryForm.value = null
            this.contentCategoryForm.value = null
            this.urutanCategoryAccepted.value = null
            this.acceptedByList.innerHTML = ''
            this.availableJurusanList.innerHTML = ''
            this.editContainer.classList.remove("show")
        })
    }

    private add_accepted_by(e): void{
        /**
         * This is a method for adding the accepted by role for the required role accept
         * 
         * -------------------------------------------
         * Parameter
         * element - the element that is clicked
         * -------------------------------------------
         * 
         * -------------------------------------------
         * Return 
         * None
         * -------------------------------------------
         */
        // parsing which element is clicked
        var updated = e.target.parentNode
        var add = updated.cloneNode(true)
        
        // remove it from the available jurusan
        this.availableJurusanList.removeChild(updated)

        // append it to the accepted by order
        this.acceptedByList.appendChild(add)

        // add the event listener for it
        add.querySelector("input[type=checkbox]").checked = true
        add.addEventListener("click", e=> this.remove_accepted_by(e))

        // insert new data into the form
        var new_role = add.querySelector("label").textContent
        this.urutanCategoryAccepted.value += (this.urutanCategoryAccepted.value) ? `,${new_role}` : `${new_role}`
    }
    private remove_accepted_by(e): void{
        /**
         * This is a method for removing the accepted by role for the required role accept
         * 
         * -------------------------------------------
         * Parameter
         * element - the element that is clicked
         * -------------------------------------------
         * 
         * -------------------------------------------
         * Return 
         * None
         * -------------------------------------------
         */
        // parsing which element is clicked
        var updated = e.target.parentNode
        var removed = updated.cloneNode(true)
        
        // remove it from the accepted by order
        this.acceptedByList.removeChild(updated)
        
        // append it to the available jurusan
        this.availableJurusanList.appendChild(removed)
        
        // add the event listener for it
        removed.querySelector("input[type=checkbox]").checked = false
        removed.addEventListener("click", e=> this.add_accepted_by(e))

        // delete the data from the form
        var removed_role = removed.querySelector("label").textContent
        var urutan = this.urutanCategoryAccepted.value.split(",")
        urutan = urutan.filter(data => data != removed_role)
        this.urutanCategoryAccepted.value = urutan.join(",")
    }

    private filterContent(content: str): str{
        /**
         * This is a method for filtering the data from the previous template
         * 
         * -------------------------------------------
         * Parameter
         * content: str - the content of the letter
         * -------------------------------------------
         * 
         * -------------------------------------------
         * Return 
         * content: str - cleaned content of the letter
         * -------------------------------------------
         */
        // filter only the content of the letter
        content = (content.match(/<div class="content">([\S\s]*?)<\/div>/) as any)[1]
        
        // remove the <p>, <span>, data. and <br>
        content = content.replaceAll(/<p>|<\/p>|<\/span>|data.|<br>|\|safe/g, "")
        
        // convert <span> to tab
        content = content.replaceAll("<span>", "\t")
        let splitcontent: str[] = content.split("\n")
        
        // clean the content
        for (let index = 0; index < splitcontent.length; index++) {
            splitcontent[index] = splitcontent[index].trim()
        }
        return splitcontent.join("\n").trim()
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
            this.validCategoryName()
            this.validCategoryContent()
            this.validUrutanAccepted()
            console.log(this.nameCategoryOk, this.contentCategoryOk, this.urutanOk)
            if (!this.nameCategoryOk || !this.contentCategoryOk || !this.urutanOk){
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
        // adding some constraint for the category name form so that it can be inputted only string data
        this.nameCategoryForm.addEventListener("keypress", e=>this.validateStringOnly(e))
    }
    /***************************************************************************************/
    
}
// the table columns
const theadColumns = 
`
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Actions</th>
</tr>
`
// make the admin category data UI
var categoryrAdmin = new AdminAdmin(datas.categories, theadColumns)

// make the add popup window UI
var addForm = new AddCategoryForm("myForm")

// make the edit popup window UI
var editForm = new EditCategroryForm(datas.categories, ".edit", ".categoryeditpopupcontainer", ".back")