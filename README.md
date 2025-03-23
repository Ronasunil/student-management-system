# Student Management System API

An API-based Student Management System where an admin can add students, assign tasks with due dates, and manage their status. Students can log in, view assigned tasks, and update task statuses.

## Setup Instructions

- Make sure **Node.js** and **npm** are installed.
- To run with Docker, ensure **Docker Desktop** is installed.

### Run Options

1. **Development:** `npm run start:dev` (uses Nodemon)
2. **Production-like:** `npm start` (uses PM2, install with `npm install -g pm2`)
3. **Docker:**
   - Build: `docker build -t sms -f Dockerfile .`
   - Run: `docker run -p 2000:2000 sms`

### Environment Setup

- Check `config.env.sample` for required variables.
- Docker requires `config.env` with the exact name.

## Base URL

-http://localhost:2000

## API Endpoints

### Admin Routes

- `POST /api/v1/admins/login` - Admin login
- `POST /api/v1/admins/user` - Create student
- `POST /api/v1/admins/tasks/assign` - Assign task

### Student Routes

- `POST /api/v1/students/login` - Student login
- `GET /api/v1/students/task/:studentId` - Get all tasks
- `GET /api/v1/students/task/status/:studentId` - Get task status
- `PATCH /api/v1/students/task/:taskId/complete` - Mark task as completed

✅ Ready to build! 🚀
