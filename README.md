# University Specialization Recommendation System

This is a full-stack recommendation system using collaborative filtering (user-based) to suggest university specializations in Ukraine. The project combines data from a free Kaggle dataset and user input, including gender, grade, interests, and the results of an MBTI test. The application supports authentication and registration using JWT.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dataset](#dataset)

## Features
- Recommends university specializations based on similar users using collaborative filtering (user-based).
- Integrates the MBTI personality test to enhance recommendation accuracy.
- Gathers user details such as gender, grade, and interests for personalized suggestions.
- Provides secure authentication and registration with JWT tokens.
- Offers a responsive frontend built with React for a smooth user experience.

## Tech Stack
- Frontend: React
- Backend: Flask, Python
- Database: MongoDB

## Installation

1. Clone this repository
2. Install the fronend dependencies
```
cd client
npm install
```
3. Install the backend dependencies
```
cd backend
pip install -r requirements.txt
```
4. Set up the environment variables for JWT and database connection in a .env file.
5. Run the Flask server
```
cd flask-server
flask run
```
7. Run the React frontend
```
cd client
npm start
```

## Usage
- After registration/login, users can complete the MBTI test and provide their academic details.
- Based on this information, the system will recommend relevant university specializations using collaborative filtering.

## API Endpoints

### Authentication

1. **POST** `/api/register` - Registers a new user. Accepts user details such as name, email, password.
  
2. **POST** `/api/login` - Authenticates a user and returns a JWT token for session management.

### Recommendations

1. **POST** `/api/recommendations` - Provides personalized university specialization recommendations, also requires user details: `gender`, `grade`, `interests`, and MBTI test results.

### MBTI Test

1. **GET** `/api/mbti` - Retrieves MBTI test questions for the user to complete.
  
### User Profile

1. **GET** `/api/user/profile` - Fetches the profile information of the logged-in user.

## Dataset

- The dataset used for university specialization recommendations is sourced from Kaggle.
- The dataset has been preprocessed and enhanced to improve its relevance and accuracy for this specific recommendation task and is located ``` /flask-server/optimized-dataset.csv ```

**Link to the raw dataset**: [Kaggle University Specializations Dataset](https://www.kaggle.com/datasets/breejeshdhar/career-recommendation-dataset)

