# To-Do Application

This project is a to-do application built with Express.js and Sequelize.

## Installation

1. Clone the repository:


2. Install dependencies:


3. Set up environment variables:

Create a `.env` file and add the necessary environment variables:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=mydatabase


## Configuration

Make sure to configure your database settings in the `.env` file as mentioned above.

## Usage

1. Start the server:

npm run dev
before that run dev make sure install all the dependencies of your library & framework


2. Access the application in your browser at `http://localhost:3000`.

## Testing

To run the automated tests using Jest:
For Particular Jest Testing
npx jest --testPathPattern=test/authController.test.js
npx jest --testPathPattern=test/userController.test.js
npx jest --testPathPattern=test/taskController.test.js

For One time to All Automate testing:
npx jest




## Contributing

Contributions are welcome! Please submit bug reports or feature requests as GitHub issues.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.


