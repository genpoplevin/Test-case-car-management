# Test-case-car-management
py -m venv venv
py -m pip install --upgrade pip
pip install -r requirements.txt
py manage.py migrate
py manage.py createsuperuser --username "admin" --email "admin@admin.com"
py manage.py runserver

npm i
