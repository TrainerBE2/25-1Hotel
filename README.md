# Hotel Reservation Backend

Backend service for hotel reservation system using Node.js, Express, and Sequelize.

## Prerequisites

- Node.js (version 12 or higher)
- NPM (version 6 or higher)
- PostgreSQL (or any SQL database supported by Sequelize)

## Getting Started

### Clone the Repository

```bash
cd backend
Install Dependencies
bash
Copy code
npm install
Setup Environment Variables
Copy the .env.example file to create a .env file:
bash
Copy code
cp .env.example .env
Open the .env file and update the environment variables according to your setup.
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
Database Setup
Make sure your PostgreSQL (or any other SQL database) is running and accessible.

Run Migrations
bash
Copy code
npx sequelize-cli db:migrate
Seed the Database (optional)
bash
Copy code
npx sequelize-cli db:seed:all
Start the Server
bash
Copy code
npm start
The server will start on the port defined in your .env file (default is 3000).


API Documentation
You can find the API documentation in the docs directory or visit the API Documentation after running the server.

Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss what you would like to change.

License
This project is licensed under the MIT License - see the LICENSE file for details.

```
