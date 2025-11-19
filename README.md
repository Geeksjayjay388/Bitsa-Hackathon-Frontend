BITSA Website - Frontend
A modern, responsive web application for the Bachelor of Information Technology Students Association (BITSA) built with React and Tailwind CSS.
🚀 Features

User Authentication: Secure registration and login system
Blog Platform: Dynamic blog section for articles and announcements
Events Management: Display and manage upcoming BITSA events
Image Gallery: Showcase BITSA activities and past events
Contact Section: Easy access to BITSA officials and contact information
Responsive Design: Fully optimized for mobile and desktop devices
Admin Dashboard: Comprehensive content and user management

🛠️ Tech Stack

React - Frontend framework
Tailwind CSS - Utility-first CSS framework
Axios - HTTP client for API requests
React Router - Client-side routing
React Context/Redux - State management (specify which you used)

📋 Prerequisites
Before running this project, ensure you have:

Node.js (v14 or higher)
npm or yarn package manager

⚙️ Installation

Clone the repository

bash   git clone <your-repository-url>
   cd bitsa-frontend

Install dependencies

bash   npm install

Configure environment variables
Create a .env file in the root directory:

env   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name

Start the development server

bash   npm start
The application will open at http://localhost:3000
📁 Project Structure
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Navbar, Footer, etc.)
│   ├── blog/           # Blog-related components
│   ├── events/         # Event components
│   └── auth/           # Authentication components
├── pages/              # Page components
├── contexts/           # React Context providers
├── services/           # API service functions
├── utils/              # Helper functions
├── assets/             # Images, icons, and static files
└── App.js              # Main application component
🔧 Available Scripts

npm start - Runs the app in development mode
npm test - Launches the test runner
npm run build - Builds the app for production
npm run eject - Ejects from Create React App (one-way operation)

🌐 Environment Variables
VariableDescriptionExampleREACT_APP_API_URLBackend API base URLhttp://localhost:5000/apiREACT_APP_CLOUDINARY_CLOUD_NAMECloudinary cloud nameyour_cloud_name
📱 Key Features Implementation
Authentication

JWT-based authentication
Protected routes for authenticated users
Persistent login sessions

Blog System

Create, read, update, and delete blog posts
Rich text editor support
Image uploads via Cloudinary

Events Management

Event listing with date filtering
Event registration functionality
Calendar view integration

Gallery

Grid-based image display
Lightbox image viewer
Lazy loading for performance

🎨 Styling
This project uses Tailwind CSS for styling. Custom configurations can be found in:

tailwind.config.js - Tailwind configuration
src/index.css - Global styles and Tailwind imports

🚀 Deployment
This project is deployed on Vercel.
Live Demo: https://bitsa-hackathon.vercel.app/
📄 License
This project is developed for the BITSA Website Hackathon.
🙏 Acknowledgments

Open source community for amazing tools and libraries
React and Tailwind CSS teams for excellent frameworks