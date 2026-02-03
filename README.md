# Task Management Application

A full-stack task management application built with FastAPI backend and Next.js frontend, featuring JWT authentication, role-based access control, and comprehensive task CRUD operations.

## Features

### Backend (FastAPI)
- User authentication with registration and login using JWT tokens
- Password security with bcrypt hashing
- Role-based access control (User and Admin roles)
- Task management with full CRUD operations
- API versioning with `/api/v1/` prefix
- Input validation using Pydantic schemas
- SQLite database with SQLAlchemy ORM
- Auto-generated API documentation (Swagger UI and ReDoc)
- CORS support for frontend integration
- Comprehensive error handling with proper HTTP status codes

### Frontend (Next.js)
- Modern responsive UI built with Tailwind CSS
- TypeScript for full type safety
- Authentication pages (login and registration)
- Protected dashboard with JWT-based route protection
- Task management interface (create, read, update, delete)
- Real-time toast notifications for user feedback
- Role-based UI elements (admin badge, conditional delete button)

## Project Structure

```
assgn/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # API route handlers
│   │   │   ├── auth.py      # Authentication endpoints
│   │   │   └── tasks.py     # Task CRUD endpoints
│   │   ├── core/            # Core functionality
│   │   │   ├── security.py  # JWT and password hashing
│   │   │   └── deps.py      # Dependency injection
│   │   ├── models/          # SQLAlchemy database models
│   │   │   ├── user.py
│   │   │   └── task.py
│   │   ├── schemas/         # Pydantic validation schemas
│   │   │   ├── user.py
│   │   │   └── task.py
│   │   ├── main.py          # FastAPI application entry point
│   │   ├── config.py        # Application configuration
│   │   └── database.py      # Database connection setup
│   ├── init_db.py           # Database initialization script
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables
│   └── .env.example         # Environment variables template
├── frontend/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Login page
│   │   ├── register/
│   │   │   └── page.tsx     # Registration page
│   │   └── dashboard/
│   │       └── page.tsx     # Protected dashboard
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── TaskList.tsx
│   │   └── TaskForm.tsx
│   ├── context/
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── lib/
│   │   ├── api.ts           # API client
│   │   ├── auth.ts          # Auth utilities
│   │   └── types.ts         # TypeScript type definitions
│   ├── package.json
│   └── .env.local           # Frontend environment variables
├── venv/                    # Python virtual environment
└── README.md
```

## Technology Stack

**Backend:**
- FastAPI 0.109.0 - Modern web framework
- SQLAlchemy 2.0.25 - ORM for database operations
- SQLite - Lightweight embedded database
- Pydantic 2.5.3 - Data validation
- python-jose - JWT token handling
- passlib + bcrypt - Password hashing
- Uvicorn - ASGI server

**Frontend:**
- Next.js 16 - React framework with App Router
- TypeScript - Static typing
- Tailwind CSS - Utility-first styling
- Axios - HTTP client
- react-hot-toast - Notifications

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn
- Git

### Clone the Repository

```bash
git clone https://github.com/Harsheeee/assignment
cd assignment
```

### Backend Setup

1. Create and activate a Python virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Set up environment variables:

Copy the example environment file and configure it:
```bash
cp .env.example .env
```

The default configuration uses SQLite and should work out of the box. You can modify the following variables in `.env` if needed:
- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - JWT secret key (change in production)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time
- `BACKEND_CORS_ORIGINS` - Allowed CORS origins

4. Initialize the database:

```bash
cd backend
python init_db.py
```

This will create the database tables and seed an admin user with the following credentials:
- Email: `admin@example.com`
- Password: `admin123`

5. Start the backend server:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Or from the project root:
```bash
cd backend
../venv/bin/uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

**API Documentation:**
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Testing the Application

1. **Access the frontend** at `http://localhost:3000`

2. **Login with admin credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`

3. **Or create a new user** by clicking "Register here"

4. **Manage tasks** from the dashboard:
   - Create new tasks
   - Edit existing tasks
   - Update task status and priority
   - Delete tasks (admin only)

### API Endpoints

#### Authentication

**Register User**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

**Login**
```http
POST /api/v1/auth/login
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=password123
```

**Get Current User**
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

#### Tasks

**List Tasks**
```http
GET /api/v1/tasks/
Authorization: Bearer <token>
```

**Create Task**
```http
POST /api/v1/tasks/
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete assignment",
  "description": "Finish the backend developer task",
  "status": "pending",
  "priority": "high"
}
```

**Update Task**
```http
PUT /api/v1/tasks/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

**Delete Task (Admin Only)**
```http
DELETE /api/v1/tasks/{id}
Authorization: Bearer <token>
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
```

## Security Features

- **Password Hashing**: Bcrypt with salt (12 rounds)
- **JWT Authentication**: Secure token-based authentication with configurable expiration
- **Input Validation**: Pydantic schemas prevent injection attacks
- **CORS Configuration**: Restricted to specified origins
- **SQL Injection Protection**: SQLAlchemy ORM with parameterized queries
- **Role-Based Access**: Separate permissions for users and admins

## Role-Based Access Control

**User Role:**
- Can create, read, and update their own tasks
- Cannot delete tasks
- Can only view their own tasks

**Admin Role:**
- Can view all tasks from all users
- Can create, read, and update any task
- Can delete any task

## Testing with Swagger UI

1. Open `http://localhost:8000/docs` in your browser
2. Click "Authorize" button at the top right
3. Login using either:
   - POST `/api/v1/auth/login` endpoint
   - Or use admin credentials directly
4. Copy the `access_token` from the response
5. Paste it in the authorization dialog (without "Bearer" prefix)
6. Test all endpoints interactively