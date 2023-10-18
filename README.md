# Dashboard Project

Welcome to the Dashboard project! This project is composed of three main components found in separate directories: `dashboard-api`, `dashboard-ui`, and `dashboard-db`. This README provides the instructions necessary to get the project up and running.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Docker](https://www.docker.com/) (latest version recommended).
- You have installed [Node.js](https://nodejs.org/) version `18.18.2`. It is highly recommended to use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to handle the Node versioning. Each subproject contains an `.nvmrc` file to automatically select the appropriate Node version.

## Setting Up and Running the Project

Follow these steps to set up and run the project:

1. **Clone the repository**

Start by cloning the repository to your local machine.

```bash
git clone https://github.com/yosefmarr/dashboard-test
cd dashboard-test
```

2. **Run the Database Service (dashboard-db)**

First, we need to start the database. Navigate to the dashboard-db directory and follow the steps below.

Run the database using Docker.

```bash
docker-compose up -d
```

The database should now be running. Note that the script includes credentials for the database admin user.

If you want to close the db, you can run

```bash
docker-compose down
```

**Database Connection Credentials:**

- Host: 'localhost'
- Port: 3307
- Database: 'dashboard_db'
- Username: 'dashboard'
- Password: 'Qyr$RDz#!3Y3RL4X'

You can use these credentials to connect to the database for management or troubleshooting.

3. **Run the API Service (dashboard-api)**

With the database up and running, you can start the API service. Navigate to the dashboard-api directory and execute the following steps.

- Switch to the correct Node version (if you are using NVM).

```bash
nvm use
```

- Install the dependencies.

```bash
npm install
```

- Run the API services in development mode

```bash
npm run dev
```

The API should now be running and connected to the database, awaiting requests from the UI.

4. **Run the UI Service (dashboard-ui)**

Finally, let's get the UI up and running. Navigate to the dashboard-ui directory and follow these steps.

- Switch to the correct Node version (if you are using NVM).

```bash
nvm use
```

- Install the dependencies.

```bash
npm install
```

- Run the UI services in development mode

```bash
npm start
```

Your UI should now be running and accessible in a web browser. By default, the UI connects to the API to retrieve and display the dashboard data.
For the user login, you can use the following credentials:

- email: yosefmarr@gmail.com
- pass: A1b2@3c4

## Usage

With all services running, you can now access the dashboard UI in your web browser. Navigate to the provided URL (usually http://localhost:3001) to view the dashboard and interact with the available features.

## Troubleshooting

- If you encounter issues related to Node versions, ensure NVM is using the correct version as specified in the .nvmrc file in each directory.
- If services can't connect, ensure the database is running, and the API is up before starting the UI service.
- For database connectivity issues, verify that the connection credentials are correct and the database container is running.
