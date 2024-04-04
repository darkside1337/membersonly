# Elite Club

Elite Club is an exclusive messaging platform where guests can view messages anonymously, while members enjoy the full spectrum of features including seeing authors and contributing to discussions. Admins maintain the club's exclusivity by managing message integrity. The platform is powered by Express.js and MongoDB, ensuring robust backend performance, and leverages Passport.js for authentication. Its frontend is crafted with EJS and stylishly designed with Tailwind CSS and DaisyUI, providing a secure and aesthetically pleasing user experience.

## Features

- **Guest Access**: View messages without seeing the authors.
- **Member Privileges**: Send messages and see message authors.
- **Admin Authority**: Special permission to delete messages.
- **Security**: Utilizes Helmet for security headers and express-rate-limit to prevent brute-force attacks.
- **Logging**: Integrates Morgan for logging HTTP requests.
- **Validation**: Leverages express-validator for robust server-side validation.
- **Error Handling**: Elegant error display on the client side for a better user experience.
- **Styling**: Tailwind CSS and DaisyUI for a modern, responsive design.

## Live Demo

Experience Elite Club live at [https://hduashidanapp.com/](https://hduashidanapp.com/).

## Local Setup

To get Elite Club up and running locally, follow these steps:

### Prerequisites

- Node.js installed on your machine.
- A MongoDB database, either locally or hosted.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/elite-club.git
   cd elite-club
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```
3. Configure your environment variables in a `.env` file in the root directory, following the template provided below:
   ```env
   PORT=3000
   DB_URI="your_mongodb_uri"
   SESSION_SECRET="your_secret"
   ```
4. Start the server:
   `sh
npm start
`
   Your app should now be running on [http://localhost:3000](http://localhost:3000).

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: Passport.js (Local Strategy)
- **Session Management**: express-session, Connect-Mongo
- **Security**: Helmet, express-rate-limit
- **Logging**: Morgan
- **Frontend**: EJS, Tailwind CSS, DaisyUI
- **Validation**: express-validator

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](#). Please adhere to this project's code of conduct.

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

Your Name - @yourtwitter - email

Project Link: [https://github.com/yourusername/elite-club](https://github.com/yourusername/elite-club)

This README offers a glimpse into Elite Club, a platform not just built as a messaging service but as a demonstration of sophisticated authentication, security, and styling techniques in web development.
