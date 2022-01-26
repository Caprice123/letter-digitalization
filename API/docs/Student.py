get_documentation = \
"""
    Get all of student name (20 data per page). It will query the student accounts based on the argument.\n\n
    Example request: http://<host>/api/student/?page=1. \n
    Example response: 
                    {
                        "max_page": 1,
                        "has_prev": false,
                        "has_next": false,
                        "students": [
                            {
                                'user_id': 3,
                                'name': "richie",
                                'nim': "2301919231",
                                'batch': 23,
                                'jurusan': "AUTOMOTIVE AND ROBOTICS ENGINEERING",
                                'email': "richie@binus.ac.id"    
                            }
                        ]
                    }
"""
post_documentation = \
"""
    Creating new student . \n
    Example request: http://<host>/api/student/?name=kelvin&nim=2301919460&jurusan=AUTOMOTIVE%20AND%20ROBOTICS%20ENGINEERING&email=kelvin@binus.ac.id. \n
    Example response:     
                        {
                            'user_id': 4,
                            'name': "kelvin",
                            'nim': "2301919460",
                            'batch': 23,
                            'jurusan': "AUTOMOTIVE AND ROBOTICS ENGINEERING",
                            'email': "kelvin@binus.ac.id"    
                        }             
"""


patch_documentation = \
"""
    Updating the password of student account. \n
    Example request: http://<host>/api/student/?email=kelvin@binus.ac.id&password=kel123. \n
    Example response: 
                        {
                            'user_id': 4,
                            'email: 'kelvin@binus.ac.id',
                            'password': 'kel123'   
                        }             
"""

put_documentation = \
"""
    Update the student account
    Example request: http://<host>/api/student/?name=kelvin&nim=2301923232&jurusan=AUTOMOTIVE%20AND%20ROBOTICS%20ENGINEERING&email=kelvin@binus.ac.id. \n
    Example response:     
                        {
                            'user_id': 4,
                            'name': "kelvin",
                            'nim': "2301923232",
                            'batch': 23,
                            'jurusan': "AUTOMOTIVE AND ROBOTICS ENGINEERING",
                            'email': "kelvin@binus.ac.id"    
                        }        
"""

delete_documentation = \
"""
    Delete student. \n
    Example request: http://<host>/api/student/?user_id-4. \n
    Example response: 
                        {
                            'user_id': 4,
                            'name': "kelvin",
                            'nim': "2301923232",
                            'batch': 23,
                            'jurusan': "AUTOMOTIVE AND ROBOTICS ENGINEERING",
                            'email': "kelvin@binus.ac.id"    
                        }          
"""    