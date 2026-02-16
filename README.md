# Virtual Event Management Backend

This system supports:

* Secure user authentication using **bcrypt** and **JWT**
* Role-based access (**Organizer** and **Attendee**)
* Full **Event CRUD operations**
* **Participant registration** with email notification
* Clean and scalable **MVC architecture**

---

# Features

## Authentication

* User registration and login
* Password hashing with **bcryptjs**
* Token-based authentication using **JWT**
* Role-based authorization middleware

## Event Management

* Create, update, delete, and view events
* Each event contains:

  * Title
  * Description
  * Date & time
  * Organizer reference
  * Participant list
* Only **organizers** can manage events

## Participant Management

* Authenticated users can register for events
* Prevents duplicate registrations
* Sends **email confirmation** after successful registration

## Tech Stack

* **Node.js** + **Express.js**
* **MongoDB** + **Mongoose**
* **JWT Authentication**
* **bcryptjs** for password hashing
* **Nodemailer** for email notifications
* **dotenv, cors, nodemon** for development

---


# API Endpoints

## Auth Routes

### Register User

**POST** `/api/auth/register`

```json
{
  "name": "Abhinav Sharma",
  "email": "abhinav@example.com",
  "password": "Password123",
  "role": "organizer"
}
```

### Login User

**POST** `/api/auth/login`

```json
{
  "email": "abhinav@example.com",
  "password": "StrongPassword123"
}
```

Returns **JWT token** for authenticated requests.

---

## Event Routes

> All routes require `Authorization: Bearer <token>` header.

### Get All Events

**GET** `/api/events`

### Create Event (Organizer only)

**POST** `/api/events`

```json
{
  "title": "Tech Conference",
  "description": "Virtual tech meetup",
  "date": "2026-03-10",
  "time": "18:00"
}
```

### Update Event (Organizer only)

**PUT** `/api/events/:id`

### Delete Event (Organizer only)

**DELETE** `/api/events/:id`

### Register for Event

**POST** `/api/events/:id/register`

* Adds user to participant list
* Sends confirmation email

---

#  Security Considerations

* Passwords are **hashed** before storage
* JWT protects private routes
* Role middleware restricts organizer actions
* Duplicate event registration prevented

---



