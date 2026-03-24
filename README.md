# Restaurant Staff Scheduling System

## Overview

This is a simple full-stack scheduling system built for a take-home assignment.

It allows a restaurant manager to:
- Create and view staff members
- Create and view shifts
- Assign shifts to staff members

The goal was to keep the solution clean, readable, and practical rather than over-engineered.

---

## Tech Stack

**Backend**
- PHP, Laravel, SQLite

**Frontend**
- React (Vite), Tailwind CSS

**Testing**
- Laravel feature tests

**DevOps**
- Docker (backend + database)

---

## Features

- Create and list staff members
- Create and list shifts
- Assign shifts to staff
- Validation for:
  - required fields
  - shift time logic
  - role matching
- Simple responsive UI
- Basic backend tests

---

## Project Structure

- `backend/`
- `frontend/`
- `docker-compose.yml`

---

## Running the Project

### Option 1: Docker (recommended)

```bash
docker compose up --build

Then open:

http://127.0.0.1:8000/api/staff

Run migrations (first time):

docker exec -it 7shifts-takehome-backend-1 php artisan migrate
Option 2: Local setup

Backend

cd backend
composer install
php artisan key:generate
php artisan migrate
php artisan serve

Frontend

cd frontend
npm install
npm run dev
API Endpoints

Staff

GET /api/staff
POST /api/staff

Shifts

GET /api/shifts
POST /api/shifts
POST /api/shifts/{id}/assign
Approach

I built a simple REST API using Laravel and a small React frontend to interact with it.

Shifts are modeled as specific dates (not recurring weekly schedules) to keep the logic straightforward.

I used small React components to keep the UI modular and Tailwind to quickly build a clean interface.

Challenges & Learnings

CORS issues

Initial requests from React failed due to CORS
Fixed by enabling Laravel CORS middleware in bootstrap/app.php

Docker setup

Ran into multiple issues:
Docker not running initially
Incorrect Dockerfile name
PHP version mismatch (needed 8.4)
Missing PHP extensions
Resolved by updating Dockerfile and dependencies

HTML responses instead of JSON

Laravel returned HTML on validation errors
Fixed by using Accept: application/json

Frontend crash (.map is not a function)

Caused by unexpected API responses
Fixed with better error handling and defensive checks
Assumptions
Shifts represent specific dates
Staff can only take shifts matching their role
No authentication required
Phone numbers stored as strings
Limitations
No edit/delete functionality
No shift conflict detection
Role matching is case-sensitive
SQLite used for simplicity
Minimal frontend validation
What I’d Improve Next
Add edit/delete features
Normalize role values
Add shift conflict detection
Improve frontend validation
Extract API logic into a service layer

---