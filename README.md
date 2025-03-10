# PINAAK-Wheels

## Overview
PINAAK-Wheels is a cab ride microservice application consisting of three services: **User, Captain, and Ride**. These services communicate via **RabbitMQ** and are connected through a **Gateway** service. The system implements **long polling** for ride requests and accepted rides.

## Architecture
- **User Service** (Port: 3001) - Handles user authentication and profile management.
- **Captain Service** (Port: 3002) - Manages captains and their availability.
- **Ride Service** (Port: 3003) - Manages ride requests and assignments.
- **Gateway** (Port: 3000) - Central entry point for API requests.
- **MongoDB** - Each service has its own database instance.
- **RabbitMQ** - Message broker for inter-service communication.

## Features
- Microservice architecture with independent databases.
- Secure authentication using **JWT**.
- Real-time ride request handling via **long polling**.
- Efficient service-to-service communication using **RabbitMQ**.
- Separate **User**, **Captain**, and **Ride** services for scalability.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Messaging Queue**: RabbitMQ

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/PINAAK-Wheels.git
   cd PINAAK-Wheels
   
2. Install dependencies for each service:
    ```sh
    cd user && npm install
    cd ../captain && npm install
    cd ../ride && npm install
    cd ../gateway && npm install
    
3. Create a .env file in each service with the required environment variables:
   ```sh
   PORT=3001
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   RABBITMQ_URL=your_rabbitmq_url
   
5. Start the services:
   ```sh
   cd user && npx nodemon
   cd ../captain && npx nodemon
   cd ../ride && npx nodemon
   cd ../gateway && npx nodemon

## API Documentation
Postman Collection: [Click here]([your-postman-collection-url](https://www.postman.com/winter-shuttle-93397/pinaak-wheels/overview))


## Contributing
Feel free to fork and contribute! Open an issue or submit a pull request for improvements.


🚀 PINAAK-Wheels - Efficient, scalable, and real-time cab ride management!
