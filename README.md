# emojiTracker# emojiTracker

PREREQUISITES:

1. Node Js - 18.0.0
2. MySQL - 8.0.3

Node Packages Needed:

1. Express
2. dotenv
3. nodemon (development dependency)
4. sequelize
5. jsonwebtoken
6. express-validator
7. mysql2
8. uuid

Steps to clone and run the repository:

step 1: git clone https://github.com/madhusudhan890/emojiTracker.git

step 2: go into the project and run npm i

step 3: provide necessary data for sequelize like database name,port,host,password etc in .env file before running the server

step 4: after giving all required data to project(in .env file). Start the server using npm start

step 5: Signup into the app to get JWT Token in order to access other services.Request body and structure is being placed in API Response documentation.

step 6: Place JWT Token acquired during sign up process and use it for accessing other routes.
