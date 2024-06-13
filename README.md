# Hotel Reservation Backend

Backend service for hotel reservation system using Node.js, Express, and Sequelize.

## Prerequisites

- Node.js (version 12 or higher)
- NPM (version 6 or higher)
- PostgreSQL (or any SQL database supported by Sequelize)

## Getting Started

### 1 Clone the Repository

```bash
cd backend
```

### 2 Install Dependencies

```bash
npm install
```

### 3 Create Env

```bash
Copy the .env.example file to create a .env file:
Copy code
cp .env.example .env
Open the .env file and update the environment variables according to your setup.
```

```bash
plaintext
Copy code
# .env.example

# Server
PORT=3000

# Database
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_DIALECT=postgres

# Midtrans
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_APP_URL=your_midtrans_app_url
MIDTRANS_API_URL=your_midtrans_api_url

# Other
FRONT_END_URL=your_front_end_url
```

Database Setup
Make sure your PostgreSQL (or any other SQL database) is running and accessible.

### 4 Run Migrations

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all (For Testing)
```

### 5 Start Server

Start the Server

```bash
npm start
```

The server will start on the port defined in your .env file (default is 3000).

API Documentation
You can find the API documentation in the docs directory or visit the API Documentation after running the server.

Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss what you would like to change.

License
This project is licensed under the MIT License - see the LICENSE file for details.
