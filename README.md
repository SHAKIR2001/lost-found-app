# Lost & Found App

A full-stack Lost & Found platform where users can:

- post lost items
- post found items
- browse all posts
- view complete details and contact information for each post

The project uses a React + Vite frontend and an Express + MongoDB backend, with image uploads handled through Cloudinary.

## Features

- Professional, mobile-friendly frontend UI (Tailwind CSS)
- Create lost/found posts with optional image upload
- Browse posts with keyword search and type filtering
- View detailed post page with owner/contact information
- Toast notifications for submission feedback
- REST API backend with MongoDB persistence
- Cloudinary image hosting via multer-storage-cloudinary

## Tech Stack

### Frontend

- React 19
- React Router 7
- Vite
- Tailwind CSS v4
- Axios
- react-hot-toast

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- Multer
- Cloudinary
- dotenv

## Project Structure

```text
lost-found-app/
  client/   # React frontend
  server/   # Express API + DB + upload pipeline
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas (or local MongoDB URI)
- Cloudinary account

## Environment Variables (Server)

Create a file at `server/.env`:

```env
PORT=3005
MONGO_URI=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Important: if sensitive credentials were committed previously, rotate them in MongoDB/Cloudinary and use new secrets.

## Installation

From the project root:

```bash
cd client
npm install

cd ../server
npm install
```

## Run the App

Open two terminals.

### 1) Start backend

```bash
cd server
npm start
```

Backend runs on `http://localhost:3005`

### 2) Start frontend

```bash
cd client
npm run dev
```

Frontend usually runs on `http://localhost:5173`

## Build Frontend

```bash
cd client
npm run build
npm run preview
```

## API Base URL

Current frontend API client points to:

`http://localhost:3005/api`

## API Endpoints

Base route: `/api/items`

### Create Item

- **POST** `/api/items`
- Content-Type: `multipart/form-data`
- Form fields:
  - `title` (string, required)
  - `description` (string, required)
  - `type` (`lost` or `found`, required)
  - `location` (string, required)
  - `date` (date string, required)
  - `contactName` (string, required)
  - `contactEmail` (string, required)
  - `contactPhone` (string, required)
  - `image` (file, optional)

### Get All Items

- **GET** `/api/items`

### Get Item By ID

- **GET** `/api/items/:id`

### Update Item (API available)

- **PUT** `/api/items/:id`

### Delete Item (API available)

- **DELETE** `/api/items/:id`

Note: the current frontend focuses on create + browse + detail view workflows.

## Frontend Routes

- `/` Home
- `/browse` Browse posts
- `/item/:id` Item details
- `/report-lost` Report lost item
- `/report-found` Report found item

## Common Troubleshooting

### Backend not connecting to DB

- Verify `MONGO_URI` in `server/.env`
- Ensure your MongoDB network access allows your current IP

### Image upload failing

- Verify `CLOUD_NAME`, `API_KEY`, `API_SECRET`
- Check Cloudinary account limits and upload presets/policies

### CORS or network errors

- Ensure backend is running on port `3005`
- Ensure frontend API base URL matches backend URL

## Future Improvements

- Add authentication and user ownership of posts
- Add claim/recovery workflow
- Add pagination and sorting controls
- Add automated tests for API and frontend
- Add deploy configs (Vercel/Netlify + Render/Railway)

## License

ISC
