get_documentation = \
"""
    Get all of student records. It will query the admin accounts based on the argument.\n
    Example request: http://<host>/api/record/?page=1. \n
    Example response: 
                    {
                        "max_page": 1,
                        "has_prev": false,
                        "has_next": false,
                        "records": [
                            'record_id': 1,
                            'title': "surat internship",
                            'jurusan': "ARE",
                            'status': "sent",
                            'date_sent': "2022-01-01  20:10:05",
                            'last_updated': null,
                            'has_record': {
                                'user_id': 3,
                                'name': "richie",
                                'nim': "2301919243"
                            },
                            'visible_role': "OPERATIONAL,HOP",
                            'required_role_accept': "HOP",
                            'last_updated_by': null,                
                        ]
                    }
"""


post_documentation = \
"""
    Creating new student records. \n
    Example request: http://<host>/api/record/?user_id=1&title=testing&status=sent&description=testing.\n
    Example response: 
                    {
                        "record_id": 2,
                        "title": "testing",
                        "jurusan": "ARE",
                        "status": "sent",
                        "date_sent": "2021/12/13  11:29:31",
                        "last_updated": null,
                        "has_record": {
                            "user_id": 1,
                            "name": "Richie",
                            "nim": 2301919001
                        },
                        "visible_role": "OPERATIONAL",
                        "required_role_accept": "OPERATIONAL",
                        "last_updated_by": null
                    }

"""


patch_documentation = \
"""
    Updating the status of record. \n
    Example request: http://<host>/api/record/?record_id=2&status=accepted&last_updated_by=OPERATIONAL\n
    Example response: 
                    {
                        "record_id": 2,
                        "title": "testing",
                        "jurusan": "ARE",
                        "status": "accepted",
                        "date_sent": "2021/12/13  11:29:31",
                        "last_updated": "2022/01/01  10:10:10",
                        "has_record": {
                            "user_id": 1,
                            "name": "Richie",
                            "nim": 2301919001
                        },
                        "visible_role": "OPERATIONAL",
                        "required_role_accept": "OPERATIONAL",
                        "last_updated_by": "OPERATIONAL"
                    }
"""

delete_documentation = \
"""
    Delete record. \n
    Example request: http://<host>/api/record/?record_id=2\n
    Example response: 
                    {
                        "record_id": 2,
                        "title": "testing",
                        "jurusan": "ARE",
                        "status": "accepted",
                        "date_sent": "2021/12/13  11:29:31",
                        "last_updated": "2022/01/01  10:10:10",
                        "has_record": {
                            "user_id": 1,
                            "name": "Richie",
                            "nim": 2301919001
                        },
                        "visible_role": "OPERATIONAL",
                        "required_role_accept": "OPERATIONAL",
                        "last_updated_by": "OPERATIONAL"
                    }
"""