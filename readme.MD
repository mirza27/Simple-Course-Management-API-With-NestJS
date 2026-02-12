### Repository Description

A simple course management REST API built with NestJS for a technical test assignment. Implements CRUD operations, validation, and database integration.

---

### README.md

````markdown
# Course Management API

This project is a **simple course management REST API** developed with **NestJS** as part of a technical test. It demonstrates basic CRUD operations, input validation, error handling, and database integration using TypeORM.

## Features

- Create, read, update, and delete courses
- Input validation using class-validator
- PostgreSQL database (configurable)
- Environment-based configuration
- Basic error handling and HTTP status codes

## Tech Stack

- [NestJS](https://nestjs.com/) – Node.js framework
- [TypeORM](https://typeorm.io/) – ORM for database interaction
- [PostgreSQL](https://www.postgresql.org/) – relational database (easily replaceable)
- [class-validator](https://github.com/typestack/class-validator) – DTO validation
- [dotenv](https://github.com/motdotla/dotenv) – environment variables

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL (or Docker for containerised DB)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/course-management-api.git
cd course-management-api
```
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

Copy the example environment file and adjust the values:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and other settings:

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=course_management
```

### 4. Set up the database

If you have PostgreSQL running, create the database manually:

```sql
CREATE DATABASE course_management;
```

Or run TypeORM migrations (if implemented). For simplicity, you can enable `synchronize: true` in the TypeORM config (development only).

### 5. Run the application

```bash
# development
npm run start

# watch mode
npm run start:dev
```

The API will be available at `http://localhost:3000`.

### 6. Run tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## API Endpoints

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | /courses     | Get all courses     |
| GET    | /courses/:id | Get a single course |
| POST   | /courses     | Create a new course |
| PATCH  | /courses/:id | Update a course     |
| DELETE | /courses/:id | Delete a course     |

### Request / Response Examples

**POST /courses**

```json
{
  "title": "Introduction to NestJS",
  "description": "Learn the basics of the NestJS framework",
  "instructor": "John Doe",
  "duration": 120,
  "price": 49.99
}
```

**Response (201 Created)**

```json
{
  "id": 1,
  "title": "Introduction to NestJS",
  "description": "Learn the basics of the NestJS framework",
  "instructor": "John Doe",
  "duration": 120,
  "price": 49.99,
  "createdAt": "2025-03-23T10:00:00.000Z",
  "updatedAt": "2025-03-23T10:00:00.000Z"
}
```

## Project Structure

```
/src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── common
│   └── decorators
├── database
│   ├── database.config.ts
│   ├── entities
│   ├── migration
│   └── seeder
├── episode
│   ├── episode.controller.spec.ts
│   ├── episode.controller.ts
│   ├── episode.module.ts
│   ├── episode.service.spec.ts
│   └── episode.service.ts
├── main.ts
└── modules
    ├── auth
    ├── category
    ├── course
    └── user
```

## Notes

- This project was created as a **technical test submission** and is not intended for production use.
- The database schema is automatically synchronised in development (set `synchronize: true` in `database.config.ts`). For production, use migrations.
- Authentication/authorisation are omitted to keep the test focused on the core functionality.

## License

This project is licensed under the MIT License.

```

```
