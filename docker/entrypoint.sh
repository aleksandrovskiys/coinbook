#!/bin/sh
cd /opt/personal_finances;
python manage.py makemigrations;
python manage.py migrate;
python manage.py createcachetable;
python manage.py runserver 0.0.0.0:8080 --noreload