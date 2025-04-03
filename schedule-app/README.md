# Schedule Management App

A full-stack application for managing schedules and appointments. Built with React, Node.js, Express, and MongoDB.

## Features

- Create, view, update, and delete schedules
- Set priority levels for schedules
- Add location and description details
- Responsive design
- Real-time updates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

## Running the Application

1. Start the backend server:
   ```bash
   npm start
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- GET `/api/schedules` - Get all schedules
- POST `/api/schedules` - Create a new schedule
- PATCH `/api/schedules/:id` - Update a schedule
- DELETE `/api/schedules/:id` - Delete a schedule

## Technologies Used

- Frontend:
  - React
  - CSS3
  - Fetch API

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - CORS 