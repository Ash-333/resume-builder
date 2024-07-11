# Resume Builder
A full-stack Resume Builder application built with the MERN stack (MongoDB, Express, React, Node.js) and Redux for state management. This application allows users to create, customize, and export their resumes. It includes features for users without professional experience to add projects and other relevant information.

## Features

- **Resume Sections**: Add and customize various sections such as personal details, education, work experience, projects, and skills.
- **Project Section**: Special functionality for candidates without experience to add projects.
- **Live Preview**: Preview the resume in real-time before exporting.
- **Export to PDF**: Generate a PDF version of your resume.
- **Responsive Design**: Fully responsive design for both desktop and mobile views.

## Technologies Used

- **Frontend**: React, Redux, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Styling**: CSS, Material-UI (optional)
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/resume-builder.git
    cd resume-builder
    ```

2. Install dependencies for both frontend and backend:
    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

3. Create a `.env` file in the root of the `server` directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development server:
    ```sh
    cd server
    npm run dev
    ```

5. In another terminal, start the frontend development server:
    ```sh
    cd client
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up or log in to start building your resume.
3. Add and customize various sections of your resume.
4. Preview your resume in real-time.
5. Export your resume to PDF when you are satisfied with the result.

## Folder Structure

```
resume-builder/
├── client/                # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── redux/
│       ├── pages/
│       ├── App.js
│       └── index.js
├── server/                # Backend Node.js application
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
└── README.md
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or feedback, please reach out to [your email address].

---