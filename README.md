# AirBnB Clone - The Console
<p align="center">
  <img width="100%" height="auto" src="./readme_images/hbnb.png">
</p>

## Description  
This project cover fundamental concepts of higher level programming. The goal is to eventually deploy a server with a clone of the web application of the popular digital platform dedicated to the supply of accommodation AirBnB. built in phyton, HTML, CSS JavaScript and MySQL. Deployed on two Linux servers each with an application server made in Flask, a NGINX web server and a MySQL database in master-slave configuration, with a HAProxy load balancer at the front of the whole architecture.

<p align="center">
  <img width="100%" height="auto" src="./readme_images/hbnb_step5.png">
</p>

## Table of Content
* [Environment](#environment)
* [Installation](#installation)
* [File Descriptions](#file-descriptions)
* [Usage](#usage)
* [Examples of use](#examples-of-use)
* [Bugs](#bugs)
* [Authors](#authors)
* [License](#license)

## Environment
This project was interpreted/tested on Ubuntu (20.04.1 LTS) using python3  (3.8.5), and MySql (8.0.25)

## Installation
* First you must have a my sql and python3 database server installed:  
**MySql:** [Install MySQL Server on the Ubuntu operating system](https://docs.rackspace.com/support/how-to/install-mysql-server-on-the-ubuntu-operating-system/)  
**Python 3:** [How to Install Python 3 on Ubuntu 18.04 or 20.04](https://phoenixnap.com/kb/how-to-install-python-3-ubuntu)  
* Clone this repository:  
```
$ git clone "https://github.com/santiagopemo/AirBnB_clone_v4"
```
* Access to the AirBnb_clone_v4 directory:  
```
$ cd AirBnb_clone_v4
```
* Once you have installed python3 install all pip3 dependencies in the [requirements.txt](./requirements.txt) file: 
```
$ pip3 install -r requirements.txt
```
### Setting up the database
* Once you have installed the MySQL-server make sure to have the service running:
```
$ sudo service mysql start
```
* Run the commands in the [setup_mysql_dev.sql](./setup_mysql_dev.sql) file to prepare the development database:
```
cat setup_mysql_dev.sql | sudo mysql
```
or
```
cat setup_mysql_dev.sql | mysql -hlocalhost -uroot -p
```
**Note:** The operation of the two previous commands depend on how you have configured your mysql server, in general terms these commands work with the default configuration.

### Populate the database
Files [7-dump.sql](./7-dump.sql), [10-dump.sql](./10-dump.sql) and [100-dump.sql](./100-dump.sql) have SQL statements that you can run to populate the database:
```
cat 100-dump.sql | sudo mysql
```
or
```
cat 100-dump.sql | mysql -hlocalhost -uroot -p
```
**Note:** The operation of the two previous commands depend on how you have configured your mysql server, in general terms these commands work with the default configuration.

## File Descriptions
[console.py](console.py) - the console contains the entry point of the command interpreter. 
List of commands this console current supports:
* `EOF` - exits console 
* `quit` - exits console
* `<emptyline>` - overwrites default emptyline method and does nothing
* `create` - Creates a new instance of`BaseModel`, saves it (to the JSON file) and prints the id
* `destroy` - Deletes an instance based on the class name and id (save the change into the JSON file). 
* `show` - Prints the string representation of an instance based on the class name and id.
* `all` - Prints all string representation of all instances based or not on the class name. 
* `update` - Updates an instance based on the class name and id by adding or updating attribute (save the change into the JSON file). 

#### `models/` directory contains classes used for this project:
[base_model.py](/models/base_model.py) - The BaseModel class from which future classes will be derived
* `def __init__(self, *args, **kwargs)` - Initialization of the base model
* `def __str__(self)` - String representation of the BaseModel class
* `def save(self)` - Updates the attribute `updated_at` with the current datetime
* `def to_dict(self)` - returns a dictionary containing all keys/values of the instance

Classes inherited from Base Model:
* [amenity.py](/models/amenity.py)
* [city.py](/models/city.py)
* [place.py](/models/place.py)
* [review.py](/models/review.py)
* [state.py](/models/state.py)
* [user.py](/models/user.py)

#### `/models/engine` directory contains File Storage class that handles JASON serialization and deserialization :
[file_storage.py](/models/engine/file_storage.py) - serializes instances to a JSON file & deserializes back to instances
* `def all(self)` - returns the dictionary __objects
* `def new(self, obj)` - sets in __objects the obj with key <obj class name>.id
* `def save(self)` - serializes __objects to the JSON file (path: __file_path)
* ` def reload(self)` -  deserializes the JSON file to __objects

#### `/tests` directory contains all unit test cases for this project:
[/test_models/test_base_model.py](/tests/test_models/test_base_model.py) - Contains the TestBaseModel and TestBaseModelDocs classes
TestBaseModelDocs class:
* `def setUpClass(cls)`- Set up for the doc tests
* `def test_pep8_conformance_base_model(self)` - Test that models/base_model.py conforms to PEP8
* `def test_pep8_conformance_test_base_model(self)` - Test that tests/test_models/test_base_model.py conforms to PEP8
* `def test_bm_module_docstring(self)` - Test for the base_model.py module docstring
* `def test_bm_class_docstring(self)` - Test for the BaseModel class docstring
* `def test_bm_func_docstrings(self)` - Test for the presence of docstrings in BaseModel methods

TestBaseModel class:
* `def test_is_base_model(self)` - Test that the instatiation of a BaseModel works
* `def test_created_at_instantiation(self)` - Test created_at is a pub. instance attribute of type datetime
* `def test_updated_at_instantiation(self)` - Test updated_at is a pub. instance attribute of type datetime
* `def test_diff_datetime_objs(self)` - Test that two BaseModel instances have different datetime objects

[/test_models/test_amenity.py](/tests/test_models/test_amenity.py) - Contains the TestAmenityDocs class:
* `def setUpClass(cls)` - Set up for the doc tests
* `def test_pep8_conformance_amenity(self)` - Test that models/amenity.py conforms to PEP8
* `def test_pep8_conformance_test_amenity(self)` - Test that tests/test_models/test_amenity.py conforms to PEP8
* `def test_amenity_module_docstring(self)` - Test for the amenity.py module docstring
* `def test_amenity_class_docstring(self)` - Test for the Amenity class docstring

[/test_models/test_city.py](/tests/test_models/test_city.py) - Contains the TestCityDocs class:
* `def setUpClass(cls)` - Set up for the doc tests
* `def test_pep8_conformance_city(self)` - Test that models/city.py conforms to PEP8
* `def test_pep8_conformance_test_city(self)` - Test that tests/test_models/test_city.py conforms to PEP8
* `def test_city_module_docstring(self)` - Test for the city.py module docstring
* `def test_city_class_docstring(self)` - Test for the City class docstring

[/test_models/test_file_storage.py](/tests/test_models/test_file_storage.py) - Contains the TestFileStorageDocs class:
* `def setUpClass(cls)` - Set up for the doc tests
* `def test_pep8_conformance_file_storage(self)` - Test that models/file_storage.py conforms to PEP8
* `def test_pep8_conformance_test_file_storage(self)` - Test that tests/test_models/test_file_storage.py conforms to PEP8
* `def test_file_storage_module_docstring(self)` - Test for the file_storage.py module docstring
* `def test_file_storage_class_docstring(self)` - Test for the FileStorage class docstring

[/test_models/test_place.py](/tests/test_models/test_place.py) - Contains the TestPlaceDoc class:
* `def setUpClass(cls)` - Set up for the doc tests
* `def test_pep8_conformance_place(self)` - Test that models/place.py conforms to PEP8.
* `def test_pep8_conformance_test_place(self)` - Test that tests/test_models/test_place.py conforms to PEP8.
* `def test_place_module_docstring(self)` - Test for the place.py module docstring
* `def test_place_class_docstring(self)` - Test for the Place class docstring

[/test_models/test_review.py](/tests/test_models/test_review.py) - Contains the TestReviewDocs class:
* `def setUpClass(cls)` - Set up for the doc tests
* `def test_pep8_conformance_review(self)` - Test that models/review.py conforms to PEP8
* `def test_pep8_conformance_test_review(self)` - Test that tests/test_models/test_review.py conforms to PEP8
* `def test_review_module_docstring(self)` - Test for the review.py module docstring
* `def test_review_class_docstring(self)` - Test for the Review class docstring

[/test_models/state.py](/tests/test_models/test_state.py) - Contains the TestStateDocs class:
* `def setUpClass(cls)` - Set up for the doc tests
* `def test_pep8_conformance_state(self)` - Test that models/state.py conforms to PEP8
* `def test_pep8_conformance_test_state(self)` - Test that tests/test_models/test_state.py conforms to PEP8
* `def test_state_module_docstring(self)` - Test for the state.py module docstring
* `def test_state_class_docstring(self)` - Test for the State class docstring

[/test_models/user.py](/tests/test_models/test_user.py) - Contains the TestUserDocs class:
* `def setUpClass(cls)` - Set up for the doc tests
* `def test_pep8_conformance_user(self)` - Test that models/user.py conforms to PEP8
* `def test_pep8_conformance_test_user(self)` - Test that tests/test_models/test_user.py conforms to PEP8
* `def test_user_module_docstring(self)` - Test for the user.py module docstring
* `def test_user_class_docstring(self)` - Test for the User class docstring


## Examples of use
```
vagrantAirBnB_clone$./console.py
(hbnb) help

Documented commands (type help <topic>):
========================================
EOF  all  create  destroy  help  quit  show  update

(hbnb) all MyModel
** class doesn't exist **
(hbnb) create BaseModel
7da56403-cc45-4f1c-ad32-bfafeb2bb050
(hbnb) all BaseModel
[[BaseModel] (7da56403-cc45-4f1c-ad32-bfafeb2bb050) {'updated_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772167), 'id': '7da56403-cc45-4f1c-ad32-bfafeb2bb050', 'created_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772123)}]
(hbnb) show BaseModel 7da56403-cc45-4f1c-ad32-bfafeb2bb050
[BaseModel] (7da56403-cc45-4f1c-ad32-bfafeb2bb050) {'updated_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772167), 'id': '7da56403-cc45-4f1c-ad32-bfafeb2bb050', 'created_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772123)}
(hbnb) destroy BaseModel 7da56403-cc45-4f1c-ad32-bfafeb2bb050
(hbnb) show BaseModel 7da56403-cc45-4f1c-ad32-bfafeb2bb050
** no instance found **
(hbnb) quit
```

## Bugs
No known bugs at this time. 

## Authors
Alexa Orrico - [Github](https://github.com/alexaorrico) / [Twitter](https://twitter.com/alexa_orrico)  
Jennifer Huang - [Github](https://github.com/jhuang10123) / [Twitter](https://twitter.com/earthtojhuang)  
Jhoan Zamora - [Github](https://github.com/jzamora5) / [Twitter](https://twitter.com/JhoanZamora10)  
David Ovalle - [Github](https://github.com/Nukemenonai) / [Twitter](https://twitter.com/disartDave)  
Santiago Peña Mosquera - [Github](https://github.com/santiagopemo) / [Twitter](https://twitter.com/Santiag11470161)  
Juan Gomez Rodriguez - [Github](https://github.com/JuanJoseGomezR) / [Twitter](https://twitter.com/J_Gmez)  

Second part of Airbnb: Joann Vuong
## License
Public Domain. No copy write protection. 
