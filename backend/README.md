# Quiz Application Backend (Java Spring Boot)

Welcome to the Quiz Application Backend project! This beginner-level Spring Boot project follows the MVC (Model-View-Controller) architecture, making it easy to incorporate into your Spring Boot projects. The backend includes user authentication and authorization features, along with quiz management functionalities such as creating, updating, and deleting quizzes.

## Features

- **User Authentication and Authorization:** Utilizes JWT for secure user authentication and authorization.
- **Quiz Management:** Allows users to create, update, and delete quizzes.
- **MVC Architecture:** Organized into Model, View, and Controller components for better code structure and maintainability.

## Technologies and Frameworks Used

- **Spring Boot:** Provides a powerful framework for building Java-based applications with ease.
- **Spring Security:** Ensures secure authentication and authorization of users.
- **MySQL (or any other database):** Utilized for data storage and management.
- **JWT (JSON Web Tokens):** Enables secure authorization mechanisms for user authentication.

## Installation

1. **Configure Database Settings:**
   - Set up your database and configure the connection settings in the `application.properties` file.

2. **Build and Run the Application:**
   - Build the application using Maven:
     ```bash
     mvn clean install
     ```
   - Run the application using Maven:
     ```bash
     mvn spring-boot:run
     ```
   - Alternatively, you can run the application using your preferred IDE by importing the project.

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any issues, please feel free to submit a pull request.

# QuizApp API Documentation

## Variables
- BASE_URL: http://localhost:9000/

## Authentication
### Register
- URL: {{BASE_URL}}auth/addNewUser
- Method: POST
- Body:
```json
{
    "name" : "Devansh",
    "email" : "devanshtakkar@gmail.com",
    "password" : "1234",
    "contact" : "7015845944"
}
```
## Profile
### Get Profile
- URL: {{BASE_URL}}api/profile
- Method: GET

## Quizzes
### Add Quiz
- URL: {{BASE_URL}}api/Quizzes
- Method: POST
- Body:
```json
{
  "Title": "Science Quiz",
  "Description": "Test your math skills",
  "TimeLimit": "00:30:00"
}
```
### Fetch Quizzes
- URL: {{BASE_URL}}api/Quizzes
- Method: GET

## Questions
### Add Question
- URL: {{BASE_URL}}api/Question
- Method: POST
- Body:
```json
{
  "QuestionText": "Who is the best footballer in the world?",
  "QuestionType": "Multiple Choice",
  "quizzes": {
    "quizID": 1
  }
}
```
## Options
### Add Options
- URL: {{BASE_URL}}api/options
- Method: POST
- Body:
```json
{
    "OptionText": "Baber Azam",
    "IsCorrect": false,
    "Questions": {
        "questionID": 4,
        "questionText": "Who is the best player in the world?",
        "questionType": "Multiple Choice",
        "quizzes": {
            "quizID": 1
        },
        "options": []
    }
}
```
## User Attempts
### Add Attempt
- URL: {{BASE_URL}}api/UserAttempt
- Method: POST
- Body:
```json
{
  "quizzes": {
    "description": "Test your math skills",
    "quizID": 1,
    "timeLimit": "00:30:00",
    "title": "Math Quiz",
    "questions": []
  },
  "startTime": "2024-01-23T12:34:56",
  "endTime": "",
  "score": 0
}
```
## User Response
### Record User Response
- URL: {{BASE_URL}}api/response/
- Method: POST
- Body:
```json
{
  "AttemptId" : 1,
  "QuestionId" : 1,
  "OptionId" : 2
}
```
