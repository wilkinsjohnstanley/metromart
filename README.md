"The Capstone Project for my Database Management class. I used the following technologies: React, Express, Node, and MySQL." 
# MetroMart

## Project Overview
The project addresses the challenge of efficiently managing retail operations across multiple stores with varying product availability, pricing, and stock levels. 


### Main Files
- **index.js**: Handles requests from the client to the server.
- **InventoryMgmt.js**: Displays the status of inventory including items below reorder level.
- **Add.js**: A Form to Add new items to the Inventory
- **Analytics.js**: Displays the results of queries requested by the professor to demonstrate SQL knowledge, such as "What are the 20 top-selling products at each store?"
- **Shop.js**: Displays all the products in the inventory on a webpage. Users can add products to their cart.
- **Cart.js**: Items users added to their cart appear here along with price. 

---

## Software Environment
- **Programming Language**: JavaScript
- **IDE**: Visual Studio Code
- **Database Management System**: MySQL
- **JavaScript Runtime Environment**: Node.js
- **Web framework for Node**: Express.js
- **JavaScript Library**: React.js

---

## Steps to Compile and Run the Program

### 1. Setup the Environment

1. **Install Visual Studio Code**: If not already installed, download Visual Studio Code from [here](https://code.visualstudio.com/).
2. **Install Node.js**: If not already installed, download Node.js from [here]([https://code.visualstudio.com/](https://nodejs.org/en/download/prebuilt-installer)).
3. **Create the database**: If not already installed, download MySQL from [here](https://www.mysql.com/downloads/). The database creation SQL commands are located in the database creation.sql file in the main project directory. In the sample queries folder, I have included more commands for the insertion of data. 

### 3. Open the Project in Visual Studio Code
1. Open Visual Studio Code.
2. Go to `File > Open Folder` and select the project folder.
3. Install dependencies: "npm i" will install dependencies listed in the package.json such as cors, express, mysql, and nodemon.


### 4. Run the Prorgram
1. Open the terminal in Visual Studio Code (`Ctrl + ` ` or `View > Terminal`).
2. In the main project directory, type "npm i" to install the project dependencies.
3. Change directory into backend ("cd backend"), type "npm start".
4. Open a second terminal, change directory frontend("cd frontend"), type "npm start".
