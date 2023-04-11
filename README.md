# mvc-api
"Introducing our secure solution for user authentication and management! Our Node and Express MVC API offers seamless functionality for login,
sign up, verification, password reset, and recovery. With our system, rest assured your users' information is safe.
Say goodbye to clunky processes and hello to reliable user management. Try it now!"
Secure User Authentication and Management with Node and Express MVC API
This is a secure and reliable user authentication and management system built with Node and Express.
It provides seamless functionality for login, sign up, verification, password reset, and recovery.
With this system, you can rest assured that your users' information is safe and secure.

## Getting Started
To get started with this system, follow these simple steps:

Clone the repository to your local machine:

git clone https://github.com/VALIANTGUARDIAN/mvc-api.git


# Install the dependencies:
npm install

# Set up the environment variables:

Create a .env file and add the following variables:

PORT=[PORT NUMBER]
MONGODB_URI=[MONGODB URI]
JWT_SECRET=[JWT SECRET]

## Start the server:

npm start

# Usage
This system offers the following endpoints:

Sign Up <br />
Endpoint: POST /api/auth/signup

Request Body:<br />
{
  "name": "Alpha Charlie",
  "email": "abc@example.com",
  "password": "password123"
}
Response Body:<br />
{
  "message": "User created successfully"
}
Login<br />
Endpoint: POST /api/auth/login

Request Body:<br />
{
  "email": "abc@example.com",
  "password": "password123"
}
Response Body:<br />
{
  "token": "[JWT TOKEN]"
}
# Verify Account
Endpoint: POST /api/auth/verify/:token

Request Parameter:<br />
token=[TOKEN]
Response Body:<br />
{
  "message": "Account verified successfully"
}
Forgot Password<br />
Endpoint: POST /api/auth/forgot-password

Request Body:<br />
{
  "email": "abc@example.com"
}
Response Body:<br />
{
  "message": "Password reset email sent successfully"
}

Reset Password<br />

Endpoint: POST /api/auth/reset-password/:token

Request Parameter:<br />

token=[TOKEN]

Request Body:

{
  "password": "newpassword123"
}

Response Body:<br />
{
  "message": "Password reset successfully"
}

# Security

This system uses JWT for authentication and bcrypt for password hashing. 
It also has rate limiting and CSRF protection to prevent common attacks such as brute force and cross-site request forgery.


# Contributing
Contributions are welcome! To contribute, fork the repository and create a pull request. Please make sure to write tests and follow the code style.
