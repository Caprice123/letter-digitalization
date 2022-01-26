get_documentation = \
"""
    Get all of student name (20 data per page). It will query the teacher accounts based on the argument.\n\n
    Example request: http://<host>/api/teacher/?page=1. \n
    Example response: 
                    {
                        "max_page": 1,
                        "has_prev": false,
                        "has_next": false,
                        "teachers":[
                            {
                                "user_id": 2,
                                "name": "Endra",
                                "role": "HOP",
                                "jurusan": "AUTOMOTIVE AND ROBOTICS ENGINEERING",
                                "can_see_records": true,
                                "email": "hopare@binus.ac.id"
                            }
                        ]
                    }
"""


post_documentation = \
"""
    Creating new Teacher . \n
    Example request: http://<host>/api/teacher/?name=Endra&email=hopare@binus.ac.id&password=endra123&role=HOP&jurusan=AUTOMOTIVE%20AND%20ROBOTICS%20ENGINEERING&can_see_records=True.\n
    Example response: 
                    {
                        "user_id": 2,
                        "name": "Endra",
                        "role": "HOP",
                        "jurusan": "AUTOMOTIVE AND ROBOTICS ENGINEERING",
                        "can_see_records": true
                    }

"""


patch_documentation = \
"""
    Updating the password of teacher account. \n
    Example request: http://<host>/api/teacher/?email=endra@binus.ac.id&password=en123\n
    Example response: 
                    {
                        "user_id": 2,
                        "email": "endra@binus.ac.id",
                        "password": "$2b$12$BF10807zE71Cdfi1.5KdMeYow7W1MqRGeS9DKbkuzdPVFClCGa8Su" 
                    }
"""

delete_documentation = \
"""
    Delete teacher. \n
    Example request: http://<host>/api/teacher?user_id=2\n
    Example response: 
                    {
                        "user_id": 2,
                        "name": "Endra",
                        "role": "HOP",
                        "jurusan": "AUTOMOTIVE AND ROBOTICS ENGINEERING",
                        "can_see_records": true
                    }
"""