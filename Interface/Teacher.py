import requests
from server import HOST
from Interface.Interface import Interface
from flask import abort

class TeacherInterface(Interface):
    """
    A class that handles all simple CRUD database actions for table teacher. Inherited from Interface class.
    
    ATTRIBUTES
    -----------
    api_link : str
        link that will be used to send requests
        
    token : str
        jwt token for calling the API
        
    METHODS (PUBLIC)
    ----------
    change_role(**kwargs) -> dict
        a method for changing current role teacher
        
    change_password(**kwargs) -> dict
        a method for changing teacher password
    """
    def __init__(self, token: str) -> None:
        """
        Parameters
        -----------            
        token : str
            jwt token for calling the API
        """
        super().__init__(f"{HOST}/api/teacher/", token)

    
    def update(self, **kwargs):
        updated_teacher = requests.put(self.api_link, data=kwargs, headers={'x-access-tokens': self.token})
        if updated_teacher.status_code >= 400:
            abort(updated_teacher.status_code)
        return updated_teacher.json()
    
    
    
    def change_password(self, **kwargs) -> dict:
        """
        Changing teacher password
        
        Parameters
        -----------
        **kwargs
            arguments to updating the teacher
            
        Return
        -----------
        teacher
            a dictionary of updated teacher
        """
        teacher = requests.patch(self.api_link, kwargs, headers={'x-access-tokens': self.token})
        if teacher.status_code >= 400:
            abort(teacher.status_code)
        return teacher.json()
    