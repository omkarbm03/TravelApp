# Travel Companion App

## Description

Travel Companion App is a Node.js-based website that allows users to plan their trips.

## Installation

To install the dependencies, navigate to the main directory of the project and run the following command:

```
npm install
```

## Usage

To run the server, use the following command:

```
npm run server
```

## Configuration

The project utilizes a `config.env` file to store sensitive information. Before running the server, make sure to create a `config.env` file in the main directory of the project and include the following variables:

```
# MongoDB connection URL
DB_URL=your_database_url_here

# JWT secret key
JWT_SECRET=your_jwt_secret_here

# Port for the server
PORT=your_port_number_here
```

Replace `your_database_url_here`, `your_jwt_secret_here`, and `your_port_number_here` with your MongoDB connection URL, JWT secret key, and desired port number respectively.

## Setting Up API Credentials

Before running the `AddToDb.py` script, you need to create a user ID and password using the API. Follow these steps:

1. Make a POST request to the API endpoint to create a user ID and password.
2. Once you receive the user ID and password, edit the variables in the `AddToDb.py` script to include these credentials.

## Data Location

Location data for the project is available in the `util` folder in JSON format. To push the data into MongoDB, follow these steps:

1. Run the node server using the command specified in the "Usage" section.
2. Navigate to the `utils` folder.
3. Run the Python script `AddToDb.py`.

Make sure you have MongoDB installed and configured properly before running the Python script.

## License

This project is licensed under the MIT License.
