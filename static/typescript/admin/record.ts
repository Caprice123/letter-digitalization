import {HTML, input, int, str, bool, ListHTML, button, ListButton, ListInput} from '../type'

class AdminRecord extends Admin{
    /**
     * This is class for making the table UI for the admin record page
     * 
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas of all records
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
     * updateTable(): void - a method for showing the datas in the tables
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
        this.datas.forEach(
            (data: any) => {
                // parsing the status of the records
                let status: str
                if (data.status == "accepted"){
                    status = "accepted"
                }
                else if (data.status == "rejected"){
                    status = "rejected"
                }
                else{
                    status = "sent"
                }
                // inserting all data and make the edit and delete button
                const new_row = 
                `
                <tr class="${status}">
                    <td>${data.record_id}</td>
                    <td>${data.title}</td>
                    <td>${data.has_record.name}</td>
                    <td>${data.has_record.nim}</td>
                    <td>${data.date_sent}</td>
                    <td>${data.status}</td>
                </tr>
                `
                this.tbody.insertAdjacentHTML("beforeend", new_row)
            }
        )
    }
    /***************************************************************************************/
}
// the table columns
const theadColumns = 
`
<tr>
    <th>ID</th>
    <th>Subject</th>
    <th>Name</th>
    <th>NIM</th>
    <th>Sent</th>
    <th>Status</th>
</tr>
`
// make the admin record data UI
var record_admin = new AdminRecord(datas.records, theadColumns)