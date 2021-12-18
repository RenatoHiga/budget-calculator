# About the project

Budget Calculator is a simple application about the total sum of the values from the items on which  they are inside a costs list. This application was made with React.js in the front-end and Node.js in the back-end.



# Glossary

* Project requirements
* Installing the project
  * Cloning the project
  * Front-end dependencies installation
  * Back-end dependencies installation

* Project execution
  * Executing the back-end
    * MongoDB initialization
    * Back-end execution with Node.js
  * Executing the front-end



# Project requirements

It's necessary to have installed in your machine:

* Node.js;
* NPM (This software already comes with Node.js, if you installed Node.js, then you already have NPM);
* MongoDB.



# Installing the project

## Cloning the project

It's necessary to first clone the project into your current machine, open your terminal and go to the folder path that you wish to clone the repository. When you are already on the desired path, clone the repository with the command below:

```bash
git clone https://github.com/RenatoHiga/budget-calculator.git
```

## Front-end dependencies installation

After cloning the project it's necessary to install the project dependencies. Let's start with the installation of the front-end dependencies, first change the current directory for the 'budget-calculator' folder, after that execute the command below:

```bash
yarn install
```

## Back-end dependencies installation

After the front-end dependencies installation, go to the 'back-end-api' directory and then execute the command below:

```bash
npm install
```



# Application execution

We must execute some commands accordingly with each folder, in order to the project run properly, we are going to start first with the back-end execution, because our front-end depends on the back-end already running.



## Back-end execution

### Initializing MongoDB

First initialize MongoDB, the command below is specific to the most modern versions of Ubuntu based Operational Systems:

```bash
sudo systemctl start mongod
```

> ⚠️ In case your operational system isn't Ubuntu or Ubuntu based, you can check the connection tutorial for your specific O.S. on the MongoDB documentation. 

### Executing back-end with Node.js

Afterwards MongoDB initialization, go to the 'back-end-api' folder and run the command below:

```bash
node app.js
```

### Front-end execution

Go to the 'budget-calculator' folder and execute the command:

```bash
npm start
```



And done! Now it's possible to run our application in any browser on the following url: http://localhost:3000 !

