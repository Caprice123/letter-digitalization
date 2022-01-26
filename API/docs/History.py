get_documentation = \
"""
    Get all of history of an admin (20 data per page). It will query the history of specific admin accounts based on the argument.\n
    Example request: http://<host>/api/history/?user_id=1. \n
    Example response: 
                    {
                        "max_page": 1,
                        "has_prev": false,
                        "has_next": false,
                        "histories": [
                            {
                                "id": 1,
                                "description": "created user 2",
                                "date": "2022-01-01  16:02:05"
                            }
                        ]
                    }
"""


post_documentation = \
"""
    Creating new category. \n
    Example request: http://<host>/api/history/?user_id=3&description=testing%20new%20history.\n
    Example response: 
                    {
                        "id": 2,
                        "description": "testing new history",
                        "date": "2021-09-30  16:20:20"
                    }

"""

delete_documentation = \
"""
    Delete history. \n
    Example request: http://<host>/api/history/?id=1\n
    Example response: 
                    {
                        "id": 1,
                        "description": "created user 2",
                        "date": "2022-01-01  16:02:05"
                    }
"""