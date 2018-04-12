# Example of DDD application in NodeJs

## Requirements

 - [NodeJs](https://nodejs.org/en/)
 - [Mysql](https://www.mysql.com/)
 - [Sequelize](http://docs.sequelizejs.com/)
 - [For tests Mocha](https://mochajs.org/)

 ## Initialization

>  **The configuration file for the databases is in the path:
> "/src/Infra/Data/database.json"**

 
 Create two databases with the following names:
 - database_developmentmg
 - database_developmentsp

 Open a command prompt at the root of the project and run: 
 `npm install`
 
Still at the prompt enter the "src/Presentation/Site" directory and run
 `npm install`
 
 To run tests go to the "src/Presentation/Test" directory and run the command `mocha  ClientTest.js`
 
 To run application run the command `node app.js` in the directory "src/Presentation/Site"
 To access the application in your browser go to "http://localhost:3001/mg/clients" or "http://localhost:3001/sp/clients"
