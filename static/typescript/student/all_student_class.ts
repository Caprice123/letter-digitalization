import {HTML, int, str, bool, ListHTML, ListInput, ListButton, input, button, div} from '../type'

class AddRecordForm{
    /**
     * This is class for adding new record popup window in student page
     * 
     * -------------------------------------------
     * Parameters:
     * categories: Array<any> - all available record category
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PRIVATE
     * addButton: button - add button for opening the popup window
     * popupContainer: HTML - the main popup container for adding new record
     * backpopupButton: button - the button for back to the previous popup window
     * containerPopupPage: HTML - inner container for adding new record
     * popup: HTML - the form container
     * buttonContainer: HTML - the container for all button new category
     * submitPopupButton: button - the submit button UI
     * inputContainer: HTML -  the container that contains all form
     * idInput: input - input form for the category id of the record
     * submitFormButton: button - button for submitting the form
     * categories: Array<any> - all available categories
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PUBLIC:
     * getCategory(): void - a method for showing all category of the letter
     * 
     * PRIVATE:
     * updateEventListener(): void - a method for assigning event listener to all buttons
     * updateCategoryForm(): void - a method for making input form as many as needed for the record
     * -------------------------------------------
   */
    private addButton: button
    private popupContainer: HTML
    private backpopupButton: button
    private containerPopupPage: HTML
    private popup: HTML
    private buttonContainer: HTML
    private submitPopupButton: button
    private inputContainer: HTML
    private idInput: input
    private submitFormButton: button
    private categories: Array<any>

    constructor(categories: Array<any>){
        /**
         * Parameters:
        * categories: Array<any> - all available record category
         */
        this.addButton = document.querySelector(".button1")
        this.popupContainer = document.querySelector(".popup1")
        this.backpopupButton = document.querySelector(".back")
        this.containerPopupPage = document.querySelector(".containerpopuppage")
        this.popup = document.querySelector(".containerpopup")
        this.buttonContainer = document.querySelector(".pop1")
        this.submitPopupButton = document.querySelector(".submit")
        this.inputContainer = document.querySelector(".new-record-form")
        this.idInput = document.querySelector(".category_id")
        this.submitFormButton = document.querySelector(".submit-form")
        this.categories = categories
        this.updateEventListener()
    }
    /***************************************************************************************/
    // PUBLIC METHODS
    public getCategory(): void{
        /**
         * This is a method for showing all category of the letter
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
        if (this.categories){
            // making button that can be clicked for making new records
            this.categories.forEach(
                (category: any) => {
                    let newCategoryButton: str = 
                    `
                        <button  data-name=${category.category_name.replaceAll(" ", "_")} data-categoryID=${category.category_id} class="cat">
                        <h1>${category.category_name}</h1
                        </button>
                    `
                    this.buttonContainer.insertAdjacentHTML("beforeend", newCategoryButton)
                }
            )
        }
        
        this.updateCategoryForm()
    }
    /***************************************************************************************/
    

    /***************************************************************************************/
    // PRIVATE METHODS
    private updateEventListener(): void{
        /**
         * This is a method for assigning event listener to all buttons
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
        // open the popup window if add button is clicked
        this.addButton.addEventListener("click", e=>{
            this.popupContainer.classList.add("show")
        })
        
        // back to original popup window view and remove all value inside the form
        this.backpopupButton.addEventListener("click", e=>{
            this.inputContainer.innerHTML = ''
            this.popup.classList.remove("buttonselected")
            this.idInput.value = null
            this.containerPopupPage.classList.add("hidden")
        })

        // validate all input inside the form if submit button is clicked
        this.submitPopupButton.addEventListener("click", e=>{
            var inputs: ListInput = this.inputContainer.querySelectorAll("input")
            var accepted: bool = true
            for (let x = 0; x < inputs.length; x++){
                if (inputs[x].value.length == 0){
                    accepted = false
                    break
                }
            }
            if (accepted){
                this.submitFormButton.click()
            }
            else{
                alert("Please input all input form")
                e.preventDefault()
            }
        })

        // close the popup window if user click outside the window
        window.addEventListener("click", e=> {
            if (!(e.target as any).closest(".popup1")){
                this.popupContainer.classList.remove("show")
            }

        }, true)
    }
    
    private updateCategoryForm(): void{
        /**
         * This is a method for making input form as many as needed for the record
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
        let categoryButtons: ListButton = document.querySelectorAll(".cat")
        categoryButtons.forEach(
            (button: button) => button.addEventListener("click", e=>{
                // assign the category id of the record
                this.idInput.value = button.dataset.categoryid
                var category = this.categories.filter(category => category.category_id == button.dataset.categoryid)
                fetch(`admin/${category[0].path_format}`)
                .then(res => res.text())
                .then( (content: str) => {
                    
                    content = (content.match(/<div class="content">([\S\s]*?)<\/div>/) as any)[1]
                    content = content.replaceAll("|safe", "")
                    console.log(content)

                    content = (content.match(/{{data.(.*?)}}/g) as any)
                    
                    content = content.map(text => {
                        text = text.replaceAll("{{data.","")
                        text = text.replaceAll("}}", "")
                        text = text.replaceAll("_", " ")
                        return text
                    })
                    var alr_have_column = ["no", "date", "month", "year", "bulan terbit", "name", "nim", "major", "subject"]
                    content = content.filter(text => !alr_have_column.includes(text) )
                    
                    var columns = new Set(content)
                    console.log(columns)
                    // if no need column that is needed to be submitted then
                    // auto submit the form
                    if (columns.length == 0){
                        this.submitFormButton.click()
                        return
                    }

                    // make the form based on the category column needed to be inserted
                    columns.forEach(
                        (column: str) => {
                            let new_input: str = 
                            `
                                <tr>
                                    <td>${column}</td>
                                    <td>
                                        <input type="text" name=${column.replace(/\s/g, "_")} style="resize: vertical;"required>
                                    </td>
                                </tr>
                            `
                            this.inputContainer.insertAdjacentHTML("beforeend", new_input)
                        }
                )
                
                // slide to the input form that will be needed to be filled
                this.popup.classList.add("buttonselected")
                this.containerPopupPage.classList.remove("hidden")
                })
            })
        )
    }
    /***************************************************************************************/
    
}


class RecordTable{
    /**
     * This is class for table records UI in the student page
     * 
     * -------------------------------------------
     * Parameters:
     * id_table: str - id of the table
     * records: Array<any> - the records data
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PRIVATE
     * recordTable: HTML - table of the page that contains all records
     * records: Array<any> - the records data
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PUBLIC:
     * updateRecordTable(): void - a method for showing records in the table
     * -------------------------------------------
   */
    private recordTable: HTML
    private records: Array<any>
    constructor(id_table: str, records: Array<any>){
        /**
         * id_table: str - id of the table
         * records: Array<any> - the records data
         */
        this.recordTable = document.querySelector(id_table)
        this.records = records
    }

    public updateRecordTable(): void{
        /**
         * This is a method for showing records in the table
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
        if (this.records){
            this.records.forEach(
                (record: any) => {
                    // if not yet updated then show the '-'
                    var updated: str = '-'
                    if (record.last_updated_by[record.last_updated_by.length - 1]){
                        updated = record.last_updated_by[record.last_updated_by.length - 1]
                    }
                    // if not yet updated by any teacher then show the '-'
                    var last_updated = "-"
                    if (record.last_updated){
                        last_updated = record.last_updated
                    }
                    // add new row
                    var new_records: str = 
                    `
                    <tr class="${record.status.replaceAll(" ", "_")}">
                        <td>${record.record_id}</td>
                        <td>${record.title}</td>
                        <td>${record.date_sent}</td>
                        <td>${record.status}</td>
                        <td>${updated}</td>
                        <td>${last_updated}</td>
                    </tr>
                    `
                    this.recordTable.insertAdjacentHTML("beforeend", new_records)
                }
            )
        }
        
    }
}

