# InsightHub - Student Project Submission System

## Project Overview
InsightHub is a full-stack web application designed for managing student academic project submissions.

The platform allows users to:

- Register and log in securely
- Submit academic projects
- View submitted projects
- Allow admins to approve or reject submissions
- Manage user roles (student and admin)
- Store and retrieve project data using a PostgreSQL database

The system is designed to simplify final-year project submission and review within an academic environment.

---

## Deployment Links

Frontend  
https://github.com/darrel-awuku/insighthub-backend.git

Backend (Render)  
https://insighthub-backend-1.onrender.com
## Login Details

### Test User
Email: john@test.com  
Password: john123

### Admin User
Email: admin@insighthub.com  
Password: admin123 

## Feature Checklist

### User Features
- User registration and login
- Secure authentication with bcrypt
- Submit academic projects
- View submitted projects
- Upload project details (title, abstract, department, supervisor, year, links)
- Track submitted projects

### Admin Features
- Role-based access control
- Admin login
- View pending project submissions
- Approve or reject projects
- View approved projects

### Backend Features
- REST API built with Node.js and Express
- PostgreSQL database integration
- JWT or session-based authentication (if used)
- CRUD operations for projects
- Role-based route protection

---

## Database Structure

### Users Table
- id
- name
- email
- password
- role

### Projects Table
- id
- title
- abstract
- department
- supervisor
- year
- file_url
- video_link
- status
- user_id

