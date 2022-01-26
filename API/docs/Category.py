get_documentation = \
"""
    Get all of record category (20 data per page).  It will query the all categories based on the argument.\n
    Example request: http://<host>/api/category/?page=1. \n
    Example response: 
                    {
                        "max_page": 1,
                        "has_prev": false,
                        "has_next": false,
                        "categories": [
                            {
                                'category_id': 1,
                                'category_name': "surat internship",
                                'path_format': "pdf_template/surat_internship.html",
                                'disabled': false, 
                                'visible_role': ["OPERATIONAL","HOP","Dekan"],
                                'required_role_accept':  ["HOP","Dekan"],
                                'columns': ["nama perusahaan", "alamat perusahaan"]
                            }
                        ]
                    }
"""


post_documentation = \
"""
    Creating new category. \n
    Example request: http://<host>/api/category/?category_name=surat%20mahasiswa%20aktif&path_format=pdf_template/surat_mahasiswa_aktif.html&disabled=false&visible_role=DEKAN,OPERATIONAL&required_role_accept=DEKAN.\n
    Example response: 
                    {
                        "category_id": 2,
                        "category_name": "surat mahasiswa aktif",
                        "path_format": "pdf_template/surat_mahasiswa_aktif.html",
                        "disabled": false,
                        "visible_role": "DEKAN,OPERATIONAL",
                        "required_role_accept: "DEKAN"
                        
                    }

"""


patch_documentation = \
"""
    Updating the visibility of category. \n
    Example request: http://<host>/api/category/?category_id=2&disabled=true\n
    Example response: 
                    {
                        "category_id": 2,
                        "category_name": "surat mahasiswa aktif",
                        "path_format": "pdf_template/surat_mahasiswa_aktif.html",
                        "disabled": true,
                        "visible_role": "DEKAN,OPERATIONAL",
                        "required_role_accept: "DEKAN
                    }
"""

put_documentation = \
"""
    Updating category. \n
    Example request: http://<host>/api/category/?category_id=2&category_name=surat%20aktif&path_format=pdf_remplate/surat_mahasiswa_aktif&visible_role=DEKAN,OPERATIONAL&required_role_accept=DEKAN\n
    Example response: 
                    {
                        "category_id": 2,
                        "category_name": "surat mahasiswa aktif",
                        "path_format": "pdf_template/surat_mahasiswa_aktif.html",
                        "disabled": false,
                        "visible_role": "DEKAN,OPERATIONAL",
                        "required_role_accept: "DEKAN
                        
                    }
"""