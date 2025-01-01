
### Technologies

-   Node.js
-   Express.js
-   MySQL
-   Sequelize
-   JWT
-   bcrypt

### Setup

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the `backend` directory and configure your database credentials and JWT secret:

    ```
    DB_HOST=localhost
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=your_database_name
    DB_PORT=3306
    JWT_SECRET=your_jwt_secret_key
    ```
5.  Run the server:
    ```bash
    npm run dev
    ```

The server will start on port 8080 (or the port specified in the .env file).

## Frontend (React.js)

*(Frontend implementation is not covered in this README since it was not included in this prompt)*
* To develop frontend you should use frontend frameworks like React.js.
* Then you should use the api from this backend.

## API Endpoints

*   **Authentication:**
    *   `POST /api/auth/register`: Register a new user.
    *   `POST /api/auth/login`: Login and get a JWT.
    *   `PUT /api/auth/:id/role`: Change user role (admin only).

*   **Books:**
    *   `POST /api/books`: Create a new book (admin only).
    *   `GET /api/books`: Get all books.
    *   `GET /api/books/search?q=keyword`: Search books by title or description.
    *   `GET /api/books/:id`: Get a book by ID.
    *   `PUT /api/books/:id`: Update a book (admin only).
    *   `DELETE /api/books/:id`: Delete a book (admin only).

*   **Authors:**
    *   `POST /api/authors`: Create a new author (admin only).
    *   `GET /api/authors`: Get all authors.
    *   `GET /api/authors/:id`: Get an author by ID.
    *   `PUT /api/authors/:id`: Update an author (admin only).
    *   `DELETE /api/authors/:id`: Delete an author (admin only).

## Postman Collection

A Postman collection (`postman_collection.json`) is included in the repository for testing the API endpoints. Import the `postman_collection.json` file into Postman and set the `baseUrl` variable and `token` to start testing API endpoints.

## Contributing

Feel free to contribute to the project by submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE). *(If you have a license)*
