import requests
from server import HOST
from Interface.Interface import Interface
from flask import abort

class AdminInterface(Interface):
    """
    A class that handles all simple CRUD database actions for table admin. Inherited from Interface class.
    
    ATTRIBUTES
    -----------
    api_link : str
        link that will be used to send requests
        
    token : str
        jwt token for calling the API
        
    METHODS (PUBLIC)
    ----------
        
    change_password(**kwargs) -> dict
        a method for changing password of admin
    """
    def __init__(self, token: str) -> None:
        """
        Parameters
        -----------
        token : str
            jwt token for calling the API
        """
        super().__init__(f"{HOST}/api/admin/", token)

    
    def update(self, **kwargs):
        updated_admin = requests.put(self.api_link, data=kwargs, headers={'x-access-tokens': self.token})
        if updated_admin.status_code >= 400:
            abort(updated_admin.status_code)
        return updated_admin.json()
    
    
    def change_password(self, **kwargs) -> dict:
        changed_password_admin = requests.patch(self.api_link, kwargs, headers={'x-access-tokens': self.token})
        if changed_password_admin.status_code >= 400:
            abort(changed_password_admin.status_code)
        return changed_password_admin.json()