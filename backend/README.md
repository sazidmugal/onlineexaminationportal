# Online Examination Portal (Full-Stack Java Spring Boot & React Application)

Welcome to the **Online Examination Portal**, developed by **Sazid Mugal**. This full-stack application follows the MVC architecture[cite: 1] and implements robust role-based security[cite: 8, 9]. The system features secure user authentication and authorization using JWT[cite: 1, 2], comprehensive quiz and question management[cite: 3, 4], user attempt tracking, and dashboard analytics[cite: 5].

---

## Features

* **User Authentication & Authorization:** Implements secure token-based authentication via Spring Security and JWT[cite: 1, 2], supporting role-based access control for administrators (`ROLE_ADMIN`) and students (`ROLE_USER`)[cite: 8, 9].
* **Quiz Management:** Allows administrators to create, fetch, update, and delete quizzes dynamically[cite: 4, 10].
* **Question & Option Management:** Supports full CRUD operations for questions and multiple-choice options mapped to specific quizzes[cite: 2, 3].
* **User Attempts & Analytics:** Tracks user exam attempts, records scores, and aggregates dashboard analytics[cite: 5].
* **Response Recording:** Captures and logs user option selections for specific questions during an active exam attempt[cite: 6].
* **Full-Stack Integration:** Connects a Spring Boot backend (`http://localhost:9000`)[cite: 7] with a React frontend (`http://localhost:5173`)[cite: 2, 3, 4, 5, 6] using Axios interceptors for automated JWT token injection and secure route protection[cite: 7, 9].

---

## Technologies Used

* **Backend:** Java Spring Boot, Spring Security, Spring Data JPA, JWT, ModelMapper[cite: 1, 2, 3, 4, 6].
* **Frontend:** React, React Router, Axios[cite: 7, 8].
* **Database:** MySQL[cite: 1].

---

## Installation & Setup

1. **Configure Database Settings:**
   * Set up your MySQL database and update connection properties in `application.properties`[cite: 1].
2. **Run the Backend:**
   * Build using Maven: `mvn clean install`[cite: 1]
   * Run the application: `mvn spring-boot:run`[cite: 1]
3. **Run the Frontend:**
   * Navigate to the frontend directory and start the React app at `http://localhost:5173`[cite: 2, 3, 4, 5, 6].

---

# API Documentation

## Base URL
* `http://localhost:9000/`[cite: 1, 7]

---

### 1. Authentication (`/api/auth/`)
* **Register User:** `POST /api/auth/addNewUser`[cite: 2]
* **Sign In:** `POST /api/auth/signing`[cite: 2]

### 2. Quizzes (`/api/Quizzes`)[cite: 4]
* **Add Quiz (Admin):** `POST /api/Quizzes`[cite: 4, 10]
* **Fetch All Quizzes:** `GET /api/Quizzes`[cite: 4]
* **Get Quiz By ID:** `GET /api/Quizzes/{id}`[cite: 4]
* **Update Quiz:** `PUT /api/Quizzes/{id}`[cite: 4]
* **Delete Quiz:** `DELETE /api/Quizzes/{id}`[cite: 4]

### 3. Questions (`/api/questions`)[cite: 3]
* **Add Question (Admin):** `POST /api/questions`[cite: 3]
* **Fetch All Questions:** `GET /api/questions`[cite: 3]
* **Get Question By ID:** `GET /api/questions/{id}`[cite: 3]
* **Get Questions By Quiz ID:** `GET /api/questions/quiz/{quizId}`[cite: 3]
* **Update Question:** `PUT /api/questions/{id}`[cite: 3]
* **Delete Question:** `DELETE /api/questions/{id}`[cite: 3]

### 4. Options (`/api/options`)[cite: 2]
* **Add Option (Admin):** `POST /api/options`[cite: 2]
* **Fetch All Options:** `GET /api/options`[cite: 2]
* **Get Option By ID:** `GET /api/options/{id}`[cite: 2]
* **Get Options By Question ID:** `GET /api/options/question/{questionId}`[cite: 2]
* **Update Option:** `PUT /api/options/{id}`[cite: 2]
* **Delete Option:** `DELETE /api/options/{id}`[cite: 2]

### 5. User Attempts (`/api/attempts`)[cite: 5]
* **Get All Attempts:** `GET /api/attempts`[cite: 5]
* **Get Attempt By ID:** `GET /api/attempts/{id}`[cite: 5]
* **Get Attempts By Quiz ID:** `GET /api/attempts/quiz/{quizId}`[cite: 5]
* **Get Attempts By User ID:** `GET /api/attempts/user/{userId}`[cite: 5]
* **Get Dashboard Analytics:** `GET /api/attempts/analytics`[cite: 5]

### 6. User Responses (`/api/response`)[cite: 6]
* **Record User Response:** `POST /api/response`[cite: 6]
* **Get All Responses:** `GET /api/response`[cite: 6]
* **Get Response By ID:** `GET /api/response/{id}`[cite: 6]

---

## Author
* **Sazid Mugal**[cite: 1]
