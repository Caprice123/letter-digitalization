import secrets
import keyring
import os

import sqlalchemy 

#########################################################################################################
PATH_DATABASE = os.path.join(os.getcwd(), "databases")
#########################################################################################################

class Config:
    """
    BASIC CONFIGURATION OF SERVER
    
    """
    TESTING = False
    DEBUG = True
    SECRET_KEY = secrets.token_hex(16)
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    JWT_SECRET_KEY = secrets.token_hex(16)
    MAIL_SERVER = "smtp.office365.com"
    MAIL_PORT = 587
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "kelvin.cendra001@binus.ac.id")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_DEBUG = False
    DATA_PER_PAGE = 20
    SECURITY_PASSWORD_SALT = secrets.token_hex(16)
    COMPRESS_MIMEYPE = [
    'text/html',
    'text/css',
    'text/xml',
    'application/json',
    'application/javascript',
    'text/plain'
    ]
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{PATH_DATABASE}/testing.db' 
    
class DevelopmentConfig(Config):
    # SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI",f"mysql://root:{keyring.get_password('UAS_DATABASE', 'password_mysql')}@localhost/letter_digitalization")  
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "kelvin.cendra001@binus.ac.id")
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")  
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    # MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", keyring.get_password("UAS_DATABASE", MAIL_USERNAME))
    
class ProductionConfig(Config): 
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")  
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", "kelvin.cendra001@binus.ac.id")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    