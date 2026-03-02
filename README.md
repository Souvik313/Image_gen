# IMAGE_GEN - AI Image Generator

A full-stack web application that leverages OpenAI's DALL-E 3 to generate AI images based on text prompts. Users can create, view, and share generated images with the community.

## Features

- 🎨 Generate high-quality AI images using DALL-E 3
- 📸 Save generated images with prompts
- 🖼️ Browse all community-generated images
- ☁️ Cloud storage with Cloudinary
- 🗄️ MongoDB database for persistent storage
- 🎯 Clean and intuitive UI with React

## Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.3.1 - Build tool and dev server
- **React Router DOM** 7.13.1 - Client-side routing
- **Tailwind CSS** 4.2.1 - Utility-first CSS framework
- **File Saver** 2.0.5 - File download utility

### Backend
- **Express** 5.2.1 - Web framework
- **Node.js** - Runtime environment
- **MongoDB** - Database
- **Mongoose** 9.2.3 - MongoDB ODM
- **OpenAI** 6.25.0 - DALL-E 3 API integration
- **Cloudinary** 2.9.0 - Image hosting and management
- **Nodemon** 3.1.14 - Development tool for auto-restart
- **CORS** 2.8.6 - Cross-Origin Resource Sharing
- **Dotenv** 17.3.1 - Environment variable management

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- OpenAI API key
- Cloudinary account

## Environment Variables

Create `.env` file in the `server` directory with the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Image_gen
```

### 2. Backend Setup

```bash
cd server
npm install
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

## Running the Application

### Backend Server

Navigate to the server directory and start the development server:

```bash
cd server
npm start
```

**Output:**
```
Server is running on port 8080
```

The backend will run on `http://localhost:8080`

### Frontend Development Server

In a new terminal, navigate to the client directory:

```bash
cd client
npm run dev
```

**Output:**
```
VITE v7.3.1  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

The frontend will run on `http://localhost:5173`

### Building for Production

**Backend:**
```bash
cd server
npm start  # Runs with nodemon for development
```

**Frontend:**
```bash
cd client
npm run build  # Creates optimized build in dist/
npm run preview  # Preview production build locally
```

## API Routes

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server health check |

**Response (200 OK):**
```json
"Hello from DALL.E"
```

---

### DALL-E API Routes

#### 1. Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dalle` | DALL-E service health check |

**Response (200 OK):**
```json
"Hello from DALL-E"
```

#### 2. Generate Image
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/dalle` | Generate an image from a text prompt |

**Request Body:**
```json
{
  "prompt": "A beautiful sunset over the ocean with mountains in the background"
}
```

**Success Response (200 OK):**
```json
{
  "photo": "https://cdn.openai.com/API/Images/dall-e-3/[image_id].png"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Prompt is required"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "message": "Error message from OpenAI API"
}
```

---

### Post API Routes

#### 1. Create Post
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/post` | Save a generated image as a post |

**Request Body:**
```json
{
  "name": "John Doe",
  "prompt": "A beautiful sunset over the ocean",
  "photo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "65f8a7c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "prompt": "A beautiful sunset over the ocean",
    "photo": "https://res.cloudinary.com/[cloud-name]/image/upload/v1234567890/[image_id].jpg",
    "createdAt": "2024-03-15T10:30:45.123Z",
    "updatedAt": "2024-03-15T10:30:45.123Z",
    "__v": 0
  }
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Unable to create post",
  "error": "Error details"
}
```

#### 2. Get All Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/post` | Fetch all posts sorted by newest first |

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Posts fetched successfully",
  "data": [
    {
      "_id": "65f8a7c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "prompt": "A beautiful sunset over the ocean",
      "photo": "https://res.cloudinary.com/[cloud-name]/image/upload/v1234567890/[image_id].jpg",
      "createdAt": "2024-03-15T10:30:45.123Z",
      "updatedAt": "2024-03-15T10:30:45.123Z",
      "__v": 0
    },
    {
      "_id": "65f8a7c3d4e5f6g7h8i9j0k2",
      "name": "Jane Smith",
      "prompt": "A futuristic city with flying cars",
      "photo": "https://res.cloudinary.com/[cloud-name]/image/upload/v1234567891/[image_id].jpg",
      "createdAt": "2024-03-15T09:20:30.456Z",
      "updatedAt": "2024-03-15T09:20:30.456Z",
      "__v": 0
    }
  ]
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "No posts found"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Unable to fetch posts",
  "error": "Error details"
}
```

---

## Project Structure

```
Image_gen/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Card.jsx
│   │   │   ├── FormField.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── index.js
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   └── index.js
│   │   ├── utils/                   # Utility functions
│   │   ├── constants/               # Constants
│   │   ├── assets/                  # Static assets
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── index.html
│
├── server/                          # Backend application
│   ├── routes/                      # API routes
│   │   ├── post.routes.js
│   │   └── dall-e.routes.js
│   ├── controllers/                 # Business logic
│   │   ├── post.controller.js
│   │   └── dalle.controller.js
│   ├── mongodb/
│   │   ├── connect.js               # MongoDB connection
│   │   └── models/
│   │       └── post.js              # Post schema
│   ├── package.json
│   ├── index.js                     # Server entry point
│   └── .env                         # Environment variables
│
└── README.md                        # Project documentation
```

## MongoDB Schema

### Post Model

```javascript
{
  name: String,           // Author name
  prompt: String,         // Original text prompt
  photo: String,          // Image URL from Cloudinary
  createdAt: Timestamp,   // Auto-generated timestamp
  updatedAt: Timestamp,   // Auto-generated timestamp
  __v: Number             // Mongoose version
}
```

## Code Quality & Linting

### Frontend Linting

```bash
cd client
npm run lint
```

## Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```bash
# Kill the process using port 8080 (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

**MongoDB Connection Error:**
- Verify `MONGODB_URI` in `.env` file
- Ensure MongoDB Atlas IP whitelist includes your current IP
- Check database name and credentials

**OpenAI API Error:**
- Verify `OPENAI_API_KEY` is valid and has available credits
- Check API rate limits

**Cloudinary Upload Error:**
- Verify all Cloudinary credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## License

This project is open source and available under the ISC License.

## Author

Created with ❤️ for AI image generation enthusiasts

## Support

For questions or issues, please open an issue in the repository.
