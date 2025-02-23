# Part-Time Job Platform

## Overview

This project is a part-time job platform that connects students looking for part time labor jobs with companies offering them. The platform includes three main roles: Users, Companies, and Admins.

## Features

### User

- Apply to jobs
- Add jobs to wishlist
- Visit company profiles

### Company

- Post new job listings
- Update existing job listings
- Delete job listings

### Admin

- Manage users and companies
- Delete users and companies (Emails of deleted users or companies cannot be used for new registrations)

## Tech Stack

- **Frontend:** React, Redux, RTK Query
- **Backend:** Express, Node.js
- **Database:** MongoDB, Mongoose
- **Storage:** Cloudinary (for storing images)
- **OCR:** Tesseract.js (for student ID card verification)

## Installation

```sh
# Clone the repository
git clone https://github.com/jithu5/job-portal.git

# Navigate to the project folder
cd job-portal
# Install dependencies for both frontend and backend
cd frontend && npm install
cd ../backend && npm install

# Set up environment variables (MongoDB URI, Cloudinary keys, etc.) in a .env file

# Start the development servers
cd frontend && npm run dev
cd ../backend && npm start
```

## Contributor

- [Abijith](https://github.com/jithu5) - Frontend Development
- [Abhijith VR](https://github.com/Abhivr05) - Backend Development

## Contribution

Contributions are welcome! Feel free to fork the repo, create a new branch, and submit a pull request.

## License

MIT License
