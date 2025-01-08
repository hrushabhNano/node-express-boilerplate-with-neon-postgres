# Express Neon Postgres Boilerplate

## Features

- Express.js for REST API
- Neon Postgres for database connectivity
- Standard folder structure for scalable applications

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with your configuration.
4. Start the server: `npm start`.

## Folder Structure

- `src/`
  - `controllers/`: Handles business logic.
  - `models/`: Database queries and logic.
  - `routes/`: Defines API endpoints.
  - `app.js`: Initializes Express application.
  - `server.js`: Entry point of the application.

## Database Setup

1. Create a database in Neon Postgres.
2. Run the following SQL to create a sample `examples` table:

```sql
CREATE TABLE examples (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);
```
