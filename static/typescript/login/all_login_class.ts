import {HTML, int, str, bool, div, ListHTML, input, button} from '../type'




class Flash{
    /**
     * This is class for reset flash in reset page
     * 
     * -------------------------------------------
     * Parameters:
     * idfail: str - id of the flash container
     * -------------------------------------------
     * 
     * -------------------------------------------
     * ATTRIBUTES:
     * PRIVATE
     * form: HTML - the forgot password form
     * nav: HTML - the container for the sign up 
     * 
     * PROTECTED
     * failedform: HTML - the form for the flash message
     * -------------------------------------------
     * 
     * 
     * -------------------------------------------
     * Methods:
     * PUBLIC:
     * openforgot(): void - a method for opening forgot password popup
     * closeform(): void - a method for closing forgot password popup
     * openNav(): void - a method for opening sign up form
     * closeNav(): void - a method for closing sign up form
     * closeFailed(): void - a method for closing flash popup
     * closeAll(): void - a method for closing all popup window
     * -------------------------------------------
   */
    private form: HTML
    private nav: HTML
    protected failedform: HTML

    constructor(idfail: str){
        /**
         * Parameters:
         * idfail: str - id of the flash container
         */
        this.form = document.getElementById("myForm")
        this.nav = document.getElementById("myNav")
        this.failedform = document.getElementById(idfail)
        document.addEventListener("click", (e: Event)=> {
            
           
            if (this.failedform){
                // close all if the user click outside the flash
                if (!this.failedform.contains((e.target) as Element) && !this.form.contains((e.target) as Element)){
                    this.closeAll()
                }
                // close the forgot password form if user click inside the flash
                else if (!this.failedform.contains((e.target) as Element)){
                    this.closeFailed()
                }
                // close the flash if user clic inside the forgot password
                else if (!this.form.contains((e.target) as Element)){
                    this.closeform()
                }
            }

            else{
                if (!this.form.contains((e.target) as Element)){
                    this.closeform()
                }
            }
        }, true)
    } 
    /***************************************************************************************/
    // PUBLIC METHOD
    public openforgot(): void{
        /**
         * This is a method for opening forgot password popup
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
        if (this.failedform){
            this.failedform.style.display = "none"
        }
        this.form.style.display = "block"
    }
    public closeform(): void{
        /**
         * This is a method for closing forgot password popup
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
        if (this.failedform){
            this.failedform.style.display = "flex"
        }
        this.form.style.display = "none"    
    }
    public openNav(): void{
        /**
         * This is a method for opening sign up form
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
        this.nav.style.width = "100%"
    }
    public closeNav(): void{
        /**
         * This is a method for closing sign up form
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
        this.nav.style.width = "0%"
    }
    public closeFailed(): void{
        /**
         * This is a method for closing flash popup
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
        this.form.style.display = "block"
        if (this.failedform){
            this.failedform.style.display = "none"
        }
    }
    public closeAll(): void{
        /**
         * This is a method for closing all popup window
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
        this.form.style.display = "none"
        this.failedform.style.display = "none"
    }
    /***************************************************************************************/
}

