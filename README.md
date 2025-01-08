// Directory Structure
// ├── src
// │ ├── controllers
// │ │ └── exampleController.js
// │ ├── models
// │ │ └── db.js
// │ ├── routes
// │ │ └── exampleRoutes.js
// │ ├── app.js
// │ └── server.js
// ├── .env
// ├── package.json
// ├── package-lock.json
// └── README.md

// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const exampleRoutes = require('./routes/exampleRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/examples', exampleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send({ error: 'Something went wrong!' });
});

module.exports = app;

// src/server.js
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

// src/models/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: { rejectUnauthorized: false },
});

module.exports = {
query: (text, params) => pool.query(text, params),
};

// src/routes/exampleRoutes.js
const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

router.get('/', exampleController.getAllExamples);
router.post('/', exampleController.createExample);

module.exports = router;

// src/controllers/exampleController.js
const db = require('../models/db');

exports.getAllExamples = async (req, res) => {
try {
const result = await db.query('SELECT \* FROM examples');
res.status(200).json(result.rows);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to fetch data' });
}
};

exports.createExample = async (req, res) => {
const { name, description } = req.body;
try {
const result = await db.query(
'INSERT INTO examples (name, description) VALUES ($1, $2) RETURNING \*',
[name, description]
);
res.status(201).json(result.rows[0]);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to create record' });
}
};

// .env
// PORT=3000
// DATABASE_URL=your-neon-postgres-connection-url

// README.md

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
