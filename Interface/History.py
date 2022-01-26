import requests
from server import HOST
from Interface.Interface import Interface

class HistoryInterface(Interface):
    """
    A class that handles all simple CRUD database actions for table history. Inherited from Interface class.
    
    ATTRIBUTES
    -----------
    api_link : str
        link that will be used to send requests
        
    token : str
        jwt token for calling the API
        
    METHODS (PUBLIC)
    ----------
    None
    """
    def __init__(self, token: str) -> None:
        """
        Parameters
        -----------
        token : str
            jwt token for calling the API
        """
        super().__init__(f"{HOST}/api/history/", token)

    