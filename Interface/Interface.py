import requests
from typing import List
from flask import request, abort

class Interface:
    """
    A class that handles all simple CRUD database actions
    
    ATTRIBUTES
    -----------
    api_link : str
        link that will be used to send requests
        
    token : str
        jwt token for calling the API
        
    METHODS (PUBLIC
    ----------
    
    create(**data) -> dict
        a method for creating new data based on data argument (dict) 
        
    get(**kwargs) -> dict
        a method for getting data based on data argunment (dict)
        
    delete(**kwargs) -> dict
        a method for deleting data based on data argument (dict)
        
    """
    def __init__(self, api_link: str, token: str) -> None:
        """
        Parameters
        -----------
        api_link : str
            link for calling the API
            
        token : str
            jwt token for calling the API
        """
        self.__api_link = api_link
        self.__token = token
        
    def create(self, **data) -> dict:
        """
        Creating new data based on data argument (dict) 
        
        Parameters
        -----------
        **kwargs
            arguments to create new data
            
        Return 
        -----------
        new_data
            a dictionary for created data
        """
        new_data = requests.post(self.__api_link, data=data, headers={'x-access-tokens': self.token})
        if new_data.status_code >= 400:
            abort(new_data.status_code)
        return new_data.json()
        
            
    
    def get(self, **kwargs) -> List[dict]:
        """
        Getting data based on data argunment (dict) 
        
        Parameters
        -----------
        **kwargs
            arguments to filtering data
            
        Return 
        -----------
        data
            list of data that is filtered
        """
        data = requests.get(self.__api_link, kwargs, headers={'x-access-tokens': self.token})
        return data.json()
    
    def delete(self, **kwargs) -> dict:
        """
        Deleting data based on data argument (dict) 
        
        Parameters
        -----------
        **kwargs
            arguments to filtering data for deletion
            
        Return 
        -----------
        deleted
            a dictionary for the deleted data
        """
        
        deleted = requests.delete(self.__api_link, data = kwargs, headers={'x-access-tokens': self.token})
        if deleted.status_code >= 400:
            abort(deleted.status_code)
        return deleted.json()
    
    
    @property
    def api_link(self):
        return self.__api_link
    
    @api_link.setter
    def api_link(self, link):
        self.__api_link = link
        
    @property
    def token(self):
        return self.__token

    @token.setter
    def token(self, token):
        self.__token = token
    
    @token.getter
    def token(self):
        return self.__token
        
    
    
