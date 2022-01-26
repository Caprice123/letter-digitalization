get_documentation = \
"""
    Get all admins (20 data per page). It will query the admin accounts based on the argument.\n
    Example request: http://<host>/api/admin/?user_id=1&page=1. \n
    Example response: 
                    
                    {
                        "max_page": 1,
                        "has_prev": false,
                        "has_next": false,
                        "admins": [
                            {
                                "user_id": 1,
                                "name": "Admin",
                                "history": []
                            }
                        ]
                    }
                    
"""


post_documentation = \
"""
    Creating new user admin.\n
    Example request: http://<host>/api/admin/?name=yosica&email=yosica@binus.ac.id&password=123123.\n
    Example response: 
                    {
                        "user_id": 2,
                        "name": "yosica"
                    }

"""


patch_documentation = \
"""
    Updating the admin password account.\n
    Example request: http://<host>/api/admin/?email=yosica@binus.ac.id&password=yos123\n
    Example response: 
                    {
                        "user_id": 2,
                        "email": "yosica@binus.ac.id",
                        "password": "$2b$12$BF10807zE71Cdfi1.5KdMeYow7W1MqRGeS9DKbkuzdPVFClCGa8Su"
                    }
"""

put_documentation = \
"""
    Updating user account.\n
    Example request: http://<host>/api/admin/?user_id=2&name=yosicadua&email=yosica@binus.ac.id\n
    Example response:
                    {
                        "user_id": 2,
                        "name": "yos"
                    }
"""

delete_documentation = \
"""
    Delete admin. \n
    Example request: http://<host>/api/record?user_id=2\n
    Example response: 
                    {
                        "user_id": 2,
                        "name": "yosica"
                    }
"""