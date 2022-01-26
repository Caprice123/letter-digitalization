import requests
from server import HOST
from Interface.Interface import Interface
from flask import abort

class RecordInterface(Interface):
    """
    A class that handles all simple CRUD database actions for table record. Inherited from Interface class.
    
    ATTRIBUTES
    -----------
    api_link : str
        link that will be used to send requests
        
    token : str
        jwt token for calling the API
        
    METHODS (PUBLIC)
    ----------
    update(data : dict, role : str) -> dict
        a method for updating the status of record
    """
    def __init__(self, token: str) -> None:
        """
        Parameters
        -----------
        token : str
            jwt token for calling the API
        """
        super().__init__(f"{HOST}/api/record/", token)

    
    def update(self, data: dict, role: str) -> dict:
        """
        Updating the status of record
        
        Parameters
        -----------
        data : dict
            data for updating the record
            
        role : str
            role of the teacher who update the record
        
        Return
        -----------
        record
            a dictionary of updated record object
        """
        record = requests.patch(self.api_link,
                                data={
                                    "record_id": data['id'],
                                    "status": data['response'],
                                    "last_updated_by": role
                                    },
                                headers={'x-access-tokens': self.token})
        if record.status_code >= 400:
            abort(record.status_code)
        
        return record.json()