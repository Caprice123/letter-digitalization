import {HTML, input, int, str, bool, ListHTML, button, ListButton, ListInput} from '../type'

class AdminHistory extends Admin{
    /**
     * This is class for making the table UI for the admin history page
     * 
     * -------------------------------------------
     * Parameters:
     * datas: Array<any> - the datas of all teachers
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
                        <td>${data.id}</td>
                        <td>${data.date}</td>
                        <td>${data.description}</td>
                        <td>
                            <div class="response">
                                <button class="delete" data-id="${data.id}"> <i class="fa fa-trash-o"></i></button>
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
// the table columns
const theadColumns = 
`
<tr>
    <th>ID</th>
    <th>Date</th>
    <th>Description</th>
    <th>Action</th>
</tr>
`

// make the admin history data UI
let adminHistory = new AdminHistory(datas.histories, theadColumns)
