# letter-digitalization
UAS database
How to run?
1. Clone repository
2. Make .env which includes
  > FLASK_ENV=development
  > FLASK_APP=server
3. Run 
  > pip install -r requirements.txt
4. Change the setting inside config.py in SQLALCHEMY_DATABASE_URI using your database and create new database
5. Open the autodoc.ext and remove the .ext inside the python file
6. Run the run.py and the system is run to go
