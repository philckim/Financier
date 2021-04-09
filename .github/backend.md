## Backend Info

The backend was built using NodeJs, Express, JavaScript and MongoDB.

### Steps to run
1. Open project in VScode
2. In the VScode terminal ```cd backend```
3. Run ```npm install``` This will install all backend dependancies
4. Run ```npm start```

### API testing info
I suggest using postman @ https://www.postman.com/ (Here you can test backend routes easly)
#### Create user account route:
- Method: POST
- Path: http://localhost:5000/api/users
- Headers: {key: Content-Type, Value: application/json}
- Body: raw(json) 
 ```
{
   "name": "<enter name here>",
   "email": "<enter email here>",
   "password": "<enter password here>"
}
 ```

#### Login user route:
- Method: POST
- Path: http://localhost:5000/api/auth
- Headers: {key: Content-Type, Value: application/json}
- Body: raw(json)
 ```
{
   "email": "<enter email here>",
   "password": "<enter password here>"
}
 ```

#### Plaid create temp link-token route
- Method: POST
- Path: http://localhost:5000/api/plaid/create-link-token

#### Plaid token-exchange route (Under development)
- Method: POST
- Path: http://localhost:5000/api/plaid/token-exchange
- Headers: {key: Content-Type, Value: application/json
- Body: raw(json)
 ```
{
   "linkToken": "<enter linkToken provided from create-link-token route>"
}
 ```
 
 ### Backend Dependencies
 - "bcryptjs": "^2.4.3"
 - "config": "^3.3.4"
 - "cors": "^2.8.5"
 - "express": "^4.17.1"
 - "express-validator": "^6.10.0"
 - "gravatar": "^1.8.1"
 - "jsonwebtoken": "^8.5.1"
 - "moment": "^2.29.1"
 - "mongoose": "^5.11.18"
 - "plaid": "^8.2.1"
