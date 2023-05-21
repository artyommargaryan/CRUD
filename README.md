# CRUD API with Node.js, Express, and MongoDB

This is a simple CRUD (Create, Read, Update, Delete) API built using Node.js, Express, and MongoDB. It provides
endpoints to manage users in a MongoDB database.

## Prerequisites

Make sure you have the following software installed on your system:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Getting Started

1. Clone the repository to your local machine:

    ```shell
   git clone https://github.com/artyommargaryan/CRUD.git 

2. Install the dependencies:

   ```shell
   cd CRUD
   npm install express mongoose
   ```
   
3. Configure the MongoDB connection:
    - Open the `dbconnect.js` file and update the `db` variable with your MongoDB connection URL.

4. Start the server:
- ```shell
   npm start
    ```
  or
- ```shell
    npm run server
    ```


The server will start running on `http://localhost:3000`



## API Endpoints

### Create a User

- URL: `POST /api/user`
- Request Body:
    - `name` (required, string): User's name.
    - `surname` (required, string): User's surname.
    - `age` (required, number): User's age.
    - `email` (required, string): User's email address.

### Get All Users

- URL: `GET /api/user`

### Get a User by ID

- URL: `GET /api/user/:id`

### Update a User

- URL: `PUT /api/user/:id`
- Request Body:
    - `name` (required, string): Updated user's name.
    - `surname` (required, string): Updated user's surname.
    - `age` (required, number): Updated user's age.
    - `email` (required, string): Updated user's email address.

### Delete a User

- URL: `DELETE /api/user/:id`

### Validation

The request body for creating and updating a user is validated using the `isValidRequestBody()` function which accepts
request body. Function is written in file `validaator.js`.

The following validations are applied:

- name: Required, string, length between 3 and 25 characters.
- surname: Required, string, length between 3 and 50 characters.
- age: Required, number, value between 0 and 120.
- email: Required, string, valid email address format.

### Error Handling

- If any validation error occurs, a `400 Bad Request` response is returned with a JSON `error` containing the body field
  set to `'invalid_arguments'`.
- If a requested user is not found, a `404 Not Found` response is returned with a JSON body containing the `error` field
  set to `'No user with id: {id}'`.
- For any other internal server errors, a `500 Internal Server Error` response is returned with a JSON body containing
  the `error` field set to `'Internal server error'`.

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a
pull request.