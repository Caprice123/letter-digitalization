import requests
from server import HOST
from Interface.Interface import Interface
from flask import abort
class CategoryInterface(Interface):
    """
    A class that handles all simple CRUD database actions for table category. Inherited from Interface class.
    
    ATTRIBUTES
    -----------
    api_link : str
        link that will be used to send requests
        
    token : str
        jwt token for calling the API
        
    METHODS (PUBLIC)
    ----------
    delete(**kwargs) -> dict
        a method for disabling a specific category
        
    undelete(**kwargs) -> dict
        a method for enabling a specific category
    """
    def __init__(self, token: str) -> None:
        """
        Parameters
        -----------
        token : str
            jwt token for calling the API
        """
        super().__init__(f"{HOST}/api/category/", token)

    
    def update(self, **kwargs):
        
        updated_category = requests.put(self.api_link, data = kwargs, headers={'x-access-tokens': self.token})
        if updated_category.status_code >= 400:
            abort(updated_category.status_code)
        return updated_category.json()
    
    def delete(self, **kwargs) -> dict:
        """
        Disabling a specific category based on kwargs arguments (dict)
        
        Parameters
        -----------
        **kwargs
            arguments to deleting the category
            
        Return
        -----------
        category_deleted
            a dictionary of disabled category
        """
        data = kwargs
        data['change_visibility'] = True
        category_delete = requests.patch(self.api_link, data=data, headers={'x-access-tokens': self.token})
        if category_delete.status_code >= 400:
            abort(category_delete.status_code)
        return category_delete.json()
    