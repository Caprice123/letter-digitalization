import {HTML, int, str, bool, ListHTML, ListInput, ListButton, input, button, div} from '../type'


class RecordTable{
    /**
     * This is class for table that contains all records correspondents to the teacher UI in teacher page
     * 
     * -------------------------------------------
     * Parameters:
     * records: Array<any> - all records that is visible at that subpage
     * role: str - the role of the current teacher
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PRIVATE
     * titleForm: input - the title form that the record status will be updated
     * idForm: input - the id form that the record will be updated
     * responseForm: input - the response form of the teacher (accepted or deleted)
     * submitButton: button - the button for submitting the form
     * tbody: HTML - the body of the table
     * acceptButtons: ListButton - all accept buttons that are seen in the page
     * rejectButtons: ListButton - all reject buttons that are seen in the page
     * datas: Array<any> - all the records that is visible at that subpage
     * role: str - the role of the current teacher
     * teacher: JSON - the current user teacher
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PRIVATE:
     * getData(): void - a method for updating the record table and adding event listener to all button
     * updateTable(): void - a method for making the record seen in the page
     * -------------------------------------------
   */
    private titleForm: input
    private idForm: input
    private responseForm: input
    private submitButton: button
    private tbody: HTML
    private acceptButtons: ListButton
    private rejectButtons: ListButton
    private datas: Array<any>
    private role: str
    private teacher: JSON

    constructor(records: Array<any>, teacher: JSON){
        /**
         * Parameters:
        * records: Array<any> - all records that is visible at that subpage
        * role: str - the role of the current teacher
         */
        this.titleForm = document.querySelector(".title-input")
        this.idForm = document.querySelector(".id-input")
        this.responseForm = document.querySelector(".response-input")
        this.submitButton = document.querySelector(".submit")
        this.tbody = document.querySelector("tbody")

        this.acceptButtons = document.querySelectorAll(".button-accepted")
        this.rejectButtons = document.querySelectorAll(".button-rejected")
        this.datas = records
        this.teacher = teacher
        this.role = teacher.role

        console.log(this.teacher.can_see_records)
        this.getData()
    }
    /***************************************************************************************/
    // PRIVATE METHODS
    private getData(): void{
        /**
         * This is a method for updating the record table and adding event listener to all button
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

        // update the table
        this.updateTable(this.datas)

        // find all accept and reject button
        this.acceptButtons = document.querySelectorAll(".button-accepted")
        this.rejectButtons = document.querySelectorAll(".button-rejected")

        // make confirmation before accepting the record
        this.acceptButtons.forEach(
            button => button.addEventListener("click", e => {
                e.preventDefault()
                if (confirm("Do you want to accept this response?")) {
                  this.titleForm.value = button.dataset.title
                  this.idForm.value = button.dataset.id
                  this.responseForm.value = "accepted"
                  this.submitButton.click()
                }
            })
        )

        // make confirmation before rejecting the record
        this.rejectButtons.forEach(
            button => button.addEventListener("click", e => {
                e.preventDefault()
                if (confirm("Do you want to reject this response?")) {
                    this.titleForm.value = button.dataset.title
                    this.idForm.value = button.dataset.id
                    this.responseForm.value = "rejected"
                    this.submitButton.click()
                }
            })
        )

        // validating the form whether it is bypassed or not
        this.submitButton.addEventListener('click', e=>{
            if (this.titleForm.value.length == 0 || this.idForm.value.length == 0 || this.responseForm.value.length == 0){
                alert("You cannot bypass this")
                e.preventDefault()
            }
        })
    }
    private updateTable(datas: any[]): void{
        /**
         * This is a method for making the record seen in the page
         * 
         * -------------------------------------------
         * Parameter
         * datas: any[] - all datas that will be seen in the page
         * -------------------------------------------
         * 
         * -------------------------------------------
         * Return
         * None
         * -------------------------------------------
         */
        
        console.log(datas)
        datas.forEach(
                d => {
                    // parsing the current progress in the required role accept
                    var index: int = d.required_role_accept.indexOf(this.role)
                    var new_row: str = ""
    
                    // if the status is still sent and current role is the same as the next order for accepting or rejecting
                    // make button for accepting and rejecting the record and show it in white color
                    if (d.status == "sent" && index == 0){
                        new_row = 
                        `
                        <tr>
                            <td>${d.record_id}</td>
                            <td class="redirect" style="cursor: pointer;">${d.title}</td>
                            <td>${d.has_record.name}</td>
                            <td>${d.has_record.nim}</td>
                            <td>${d.date_sent}</td>
                            <td>
                            <div class="response">
                                <button class="button-accepted" data-title="${d.title}" data-id="${d.record_id}"> &#10004</button>
                                <button class="button-rejected" data-title="${d.title}" data-id="${d.record_id}"> &#10006</button>
                                </div>
                            </td>
                        </tr>
                        `
                    }
                    // if the status is contains accepted then filter again
                    else if (d.status.includes("accepted")){
                        let progress: str = d.status.replaceAll("accepted ", "").split("/")
                        progress = progress[0]
    
                        // if the status already accepted then dont make the accept and reject button and show it in green colo
                        if (d.status == "accepted"){
                            new_row = 
                            `
                            <tr class="accepted">
                                <td>${d.record_id}</td>
                                <td>${d.title}</td>
                                <td>${d.has_record.name}</td>
                                <td>${d.has_record.nim}</td>
                                <td>${d.date_sent}</td>
                                <td>DONE</td>
                            </tr>
                            `
                        }
    
                        // if the next step acceptance or rejectance is the same as current position then
                        // make accept and reject buttons and show it in white color
                        else if (+progress == index){
                            new_row = 
                            `
                            <tr>
                                <td>${d.record_id}</td>
                                <td class="redirect">${d.title}</td>
                                <td>${d.has_record.name}</td>
                                <td>${d.has_record.nim}</td>
                                <td>${d.date_sent}</td>
                                <td>
                                <div class="response">
                                    <button class="button-accepted" data-title="${d.title}" data-id="${d.record_id}"> &#10004</button>
                                    <button class="button-rejected" data-title="${d.title}" data-id="${d.record_id}"> &#10006</button>
                                    </div>
                                </td>
                            </tr>
                            `
                        }
                        // if the current teacher already pass the current step of acceptance or rejectance then
                        // show it in green color 
                        else if (+progress > index){
                            var url = window.location.pathname.split("/")[2]
                            if (url != "sent"){
                                new_row =
                                `
                                <tr class="accepted">
                                    <td>${d.record_id}</td>
                                    <td>${d.title}</td>
                                    <td>${d.has_record.name}</td>
                                    <td>${d.has_record.nim}</td>
                                    <td>${d.date_sent}</td>
                                    <td></td>
                                </tr>
                                `
                            }
                        }
                        // if the current role not in required role accept means that the teacher can see all records then
                        // make it light mode without accept or reject button
                        else{
                            new_row =
                            `
                            <tr>
                                <td>${d.record_id}</td>
                                <td>${d.title}</td>
                                <td>${d.has_record.name}</td>
                                <td>${d.has_record.nim}</td>
                                <td>${d.date_sent}</td>
                                <td></td>
                            </tr>
                            `
                        }
                    }
                    // if the status is rejected then 
                    // show it in red color
                    else if (d.status == "rejected"){
                        new_row = 
                        `
                        <tr class="rejected">
                            <td>${d.record_id}</td>
                            <td>${d.title}</td>
                            <td>${d.has_record.name}</td>
                            <td>${d.has_record.nim}</td>
                            <td>${d.date_sent}</td>
                            <td></td>
                        </tr>
                        `
                    }
                    // else show it in light color
                    else{
                        if (this.teacher.can_see_records == false){
                            console.log(window.location.pathname.split("/")[2])
                            if (window.location.pathname.split("/")[2] == "all"){
                                new_row = 
                                `
                                <tr>
                                    <td>${d.record_id}</td>
                                    <td>${d.title}</td>
                                    <td>${d.has_record.name}</td>
                                    <td>${d.has_record.nim}</td>
                                    <td>${d.date_sent}</td>
                                    <td></td>
                                </tr>
                                `
                            }
                        }
                        else{

                            new_row = 
                            `
                            <tr>
                                <td>${d.record_id}</td>
                                <td>${d.title}</td>
                                <td>${d.has_record.name}</td>
                                <td>${d.has_record.nim}</td>
                                <td>${d.date_sent}</td>
                                <td></td>
                            </tr>
                            `
                        }
                    }
                    this.tbody.insertAdjacentHTML("beforeend", new_row)
                }
            )
        
        
        
        
        // make all row that can accept or reject can open new tab and open outlook when it is clicked
        let redirectBtns: ListButton = document.querySelectorAll(".redirect")
        redirectBtns.forEach(
            button => button.addEventListener("click", e=>{
                window.open("https://outlook.office.com/mail/inbox")
            })
        )
    }
    /***************************************************************************************/
}



