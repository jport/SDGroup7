# SDGroup7

## Requirments

MySQL 8.0

Python 3.5 to 3.7

Django

mysqlclient

## Environment Set Up

Check python version: python3 --version

sudo -s

apt-get install mysql-server

apt-get install libmysqlclient-dev

apt-get install python3-django

apt-get install python3-mysqldb

apt-get install docker.io

pip3 install -U channels

pip3 install channels_redis

pip3 install Pillow

docker run --name rt_redis -p 6379:6379 -d redis:2.8

[press control+d]

**for mac**

export PATH=$PATH:/usr/local/mysql/bin

export DYLD_LIBRARY_PATH=/usr/local/mysql/lib/

## Database Set Up

sudo mysql -u root -p

Press enter for an empty password
> CREATE DATABASE appdata;

> GRANT ALL PRIVILEGES ON \*.* TO 'group7'@'localhost' IDENTIFIED BY 'seniordesign2';

## Create admin account

python3 manage.py createsuperuser
>User: admin

>Email: admin@recipetop.com

>Password: seniordesign2

## Running the app


python3 manage.py migrate

python3 manage.py loaddata data.json

python3 manage.py runserver

## Dumping data

./manage.py dumpdata --exclude=auth --exclude=sessions --exclude=contenttypes --exclude=admin > data.json

## Github Intructions

1) How to Clone the repository:
    
    git clone https://github.com/jport/SDGroup7.git
    
    This will create a folder in the active directory called SDGroup7
    
2) How to pull updates from repository

    git pull origin master
    
    This will pull any changes made to the repository since your last pull or clone
    If there are any conflicting changes you made, it will ask you to resolve them somehow
    
3) Pushing your changes
    First run this command:
    
    git status
    
    This will give you a report of all the changes you have made
    Always pull before you push (see above)
    If you created a new file you have to add it to the checkout with:
    
    git add <file name>
    
    Next, you have to commit your changes as well as give a description of the commit
    
    git commit -m "Description"
    
    Finally, you can push your changes with:
    
    git push origin master
