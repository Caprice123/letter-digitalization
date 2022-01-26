import requests
from server import HOST
from Interface.Interface import Interface
from flask import abort
class StudentInterface(Interface):
    """
    A class that handles all simple CRUD database actions for table student. Inherited from Interface class.
    
    ATTRIBUTES
    -----------
    api_link : str
        link that will be used to send requests
        
    token : str
        jwt token for calling the API
        
    METHODS (PUBLIC)
    ----------
    change_password(**kwargs) -> dict
        a method for changing student password
    """
    def __init__(self, token: str) -> None:
        """
        Parameters
        -----------            
        token : str
            jwt token for calling the API
        """
        super().__init__(f"{HOST}/api/student/", token)

    
    def update(self, **kwargs):
        student = requests.put(self.api_link, data=kwargs, headers={'x-access-tokens': self.token})
        if student.status_code >= 400:
            abort(student.status_code)
        return student.json()

    def change_password(self, **kwargs) -> dict:
        """
        Changing student password
        
        Parameters
        -----------
        **kwargs
            arguments to updating the student
            
        Return
        -----------
        student
            a dictionary of updated student
        """
        student = requests.patch(self.api_link, data=kwargs, headers={'x-access-tokens': self.token})
        if student.status_code >= 400:
            abort(student.status_code)
        return student.json()