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
│   └── dto
├── database
│   ├── database.config.ts
│   ├── entities
│   ├── migration
│   └── seeder
├── main.ts
└── modules
    ├── auth
    ├── category
    ├── course
    └── user
```

## Notes

- This project was created as a **technical test submission** and is not intended for production use.
- Authentication/authorisation are omitted to keep the test focused on the core functionality.
- Use the _api-doc-postman.json_ for full api documentations

## License

This project is licensed under the MIT License.
