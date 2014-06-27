# eskra.me #

eskra.me is a nice web rails application that allows you create and manage your own kanban board and thus increase your productivity. Inspired by [Scrumy](scrumy.com), currently it has these features:

* No registration required.
* Easy share your board URL.
* Multilane for tasks and customizable columns.
* Multilanguage (currently supporting english, spanish and experimental support for chinese and japanese)
* And much more !

Here we write the nice features of the app.

blabla bla

## Usage ##

### Installation ###

#### Ruby version ####
The application works with Ruby 1.9.3 and forward, and it's optimized for Ruby 2.0 and forward.
You must have installed Ruby before trying to run the application.

#### System dependencies ####
The application uses a Postgres database, so you also must have Postgres installed on your system.

#### Configuration ####
To install the different dependencies, modules, and gems needed, you must execute the following line of instruction.
		
```
#!ruby

bundle install
```

this will install the different gems needed.

#### Database creation and initialization ####
To create and initialize the database, you need to execture the following:
		
```
#!bash

rake db:migrate
```
In the case that you already had a database created, you did sustancial changes to it, and you wish to recreate it, use the following line:
		
```
#!bash

rake db:drop; rake db:migrate
```


#### How to run the test suite ####

* Deployment instructions
	There is no deployment needed. You should download and place the code where you want it to be executed.

* How to run the application
	To run the application, first you need to get a rails server running, to do so, use the following command.
		rails server
	After this is done, just go to 'localhost:3000' in your favorite browser, and you will see the application.

### Code documentations ###

* This application is very ajax-heavy and it uses jquery.
* It has the following models:
   * Boards
   * Stickies
   * Columns
   * Rows
* Each model has a JSON view, which are important because most of the interaction between the server is done through AJAX requests to the server using a REST API.
* The javascript asset boards.js has all the logic regarding the client