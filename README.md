### Repository Description

A simple course management REST API built with NestJS for a technical test assignment. Implements CRUD operations, validation, and database integration.

---

## Prerequisites

- Node.js (v20 or later)
- npm or yarn
- PostgreSQL (or Docker for containerised DB)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mirza27/Simple-Course-Management-API-With-NestJS course-management-api
cd course-management-api
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

Copy the example environment file and adjust the values:

Edit `.env` with your database credentials and other settings:

```env
APP_NAME=course-app-api
PORT=3000

DATABASE_HOST=localhost
DATABASE_PORT=5444
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=course-app-db

JWT_SECRET=example-secret
JWT_ACCESS_TOKEN_EXPIRATION=600
JWT_REFRESH_TOKEN_EXPIRATION=604800
```

### 4. Set up the database and seeding

Run using docker (make sure Makefile is exist)

```bash
# run db
make db

# migrate
make generate name=init
make migrate

# run seeder
make seed
```

Or run TypeORM migrations (if implemented). For simplicity, you can enable `synchronize: true` in the TypeORM config (development only).

### 5. Run the application

```bash
# development
npm run start
```

The API will be available at `http://localhost:3000`.

### 6. Run test (this test only consist auth test)

```bash
# auth test
make test-auth
```

## Project Structure

```
./src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── common
│   ├── decorators
│   │   └── roles.decorator.ts
│   └── dto
│       ├── jwtPayload.dto.ts
│       └── request-with-user.dto.ts
├── database
│   ├── database.config.ts
│   ├── entities
│   │   ├── category.entity.ts
│   │   ├── course.entity.ts
│   │   ├── user-auth.entity.ts
│   │   ├── user-course.entity.ts
│   │   └── user.entity.ts
│   ├── migration
│   │   └── 1770869765286-init.ts
│   └── seeder
│       ├── course.seeder.ts
│       ├── runner.seeder.ts
│       └── userSeeder.ts
├── main.ts
└── modules
    ├── auth
    │   ├── auth.controller.spec.ts
    │   ├── auth.controller.ts
    │   ├── auth.module.ts
    │   ├── auth.service.spec.ts
    │   ├── auth.service.ts
    │   ├── dto
    │   ├── guard
    │   └── strategies
    ├── category
    │   ├── category.controller.spec.ts
    │   ├── category.controller.ts
    │   ├── category.module.ts
    │   ├── category.service.spec.ts
    │   ├── category.service.ts
    │   └── dto
    ├── course
    │   ├── course.controller.spec.ts
    │   ├── course.controller.ts
    │   ├── course.module.ts
    │   ├── course.service.spec.ts
    │   ├── course.service.ts
    │   └── dto
    └── user
        ├── dto
        ├── user.controller.spec.ts
        ├── user.controller.ts
        ├── user.module.ts
        ├── user.service.spec.ts
        └── user.service.ts
```

## Notes

- This project was created as a **technical test submission** and is not intended for production use.
- Authentication/authorisation are omitted to keep the test focused on the core functionality.

## License

This project is licensed under the MIT License.
