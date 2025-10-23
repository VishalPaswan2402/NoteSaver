# NoteSaver

A **secure and user-friendly MERN stack Note Saver Application** that allows users to create, edit, and delete personal notes.  
Each user has a private space — only the creator of a note can access and manage it.  
Built with **MongoDB, Express.js, React.js, and Node.js**, the app provides seamless authentication and a smooth user experience.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Secure signup and login using **Passport.js** and **bcrypt hashing**
  - Session-based authentication for persistent login
  
- 🧠 **Personal Note Management**
  - Create, edit, and delete notes easily
  - Notes are private — visible only to the creator

- 🎨 **Responsive UI**
  - Clean and modern interface using **React + Tailwind CSS**
  - Works perfectly on mobile, tablet, and desktop

- ⚙️ **Backend Integration**
  - RESTful API built with **Express.js**
  - Data stored securely in **MongoDB**

- 📑 **Extra Functionalities**
  - Smooth printing with `usePrintNote` custom hook
  - Hidden print component for formatted output
  - Error handling and validation on both frontend and backend

---

## 🧰 Tech Stack

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** Passport.js, bcrypt  
**Other Tools:** Axios, React Router, Mongoose  

---

## 🖥️ Project Structure

NoteSaver/
│
├── backend/
│ ├── Controllers/
│ ├── Models/
│ ├── Routes/
│ ├── config/
│ ├── app.js
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│ ├── package.json
│ └── tailwind.config.js
│
├── .env
├── README.md
└── package.json


## Website images

### Login page
![Login page](/siteImages/loginPage.png)

### Home page
![Home page](/siteImages/landingPage.png)

### View page
![View page](/siteImages/viewEditPage.png)

### Share secret code page
![Share secret code page](/siteImages/secretPage.png)

### Add new note page
![Add new note page](/siteImages/addNewPage.png)

### Alert option page
![Alert option page](/siteImages/alertPage.png)

---

## Installation

### Prerequisites

- Node.js installed.
- MongoDB running (locally or using a cloud provider like MongoDB Atlas).
- A code editor like **VS Code** for editing the project files.

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/VishalPaswan2402/NoteSaver.git
    cd NoteSaver
    ```

2. **Install in frontend and backend dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the backend directory and add your credentials:

    ```bash
    PORT=8080
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=your_secret_key
    ```

4. **Start backend server :**

    ```bash
    cd backend
    node index.js
    ```

5. **Start frontend server :**  
    ```bash
    cd frontend
    nodemon index.js
    ```

6. **Backend server :**
    - The server will be running on `http://localhost:8080`.

7. **Frontend server :**
    - The server will be running on `http://localhost:5173`.