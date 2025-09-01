# SnapChef Backend Installation Manual

This guide covers all methods for installing and running the SnapChef backend server for development and production.

## Installing the Backend Server

### Prerequisites

- Node.js (v18+)
- MongoDB instance (local or cloud)
- A Google Cloud Platform account, with Cloud Vision and Firebase Cloud Messaging enabled


### Cloning the Repository

1. **Clone the Repository**
   ```sh
   git clone https://github.com/eloritzkovitz/SnapChef-Server.git
   cd SnapChef-Server
   ```


### Configuration

2. **Configure Environment Variables**
   - A [`.env.example`](.env.example) file is provided in the project root with all required environment variable keys.
   - Copy its content into your `.env` file in the project root.
   - Open `.env` and fill in your MongoDB URI, Gemini API Key, Google Cloud Vision API key, Firebase Cloud Messaging credentials, and any other required settings as described in the comments of `.env.example`.


### Installing Dependencies

3. **Install Node.js Dependencies**
   ```sh
   npm install
   ```


### Running the Backend Server Locally

4. **Start the Server**
   ```sh
   npm run dev
   ```
   - This will start the backend server on the port specified in your `.env` file (default: 3000).


### Building and Running for Production

5. **Build the Project**
   ```sh
   npm run build
   ```

6. **Start the Production Server**
   ```sh
   npm start
   ```
   - For production, consider using a process manager like PM2 or Docker.

## Running Tests


7. **Run Automated Tests**
   ```sh
   npm run test
   ```
   - This will execute all tests in the `tests/` folder.


## Notes

- Ensure MongoDB is running and accessible before starting the backend.
- For cloud features (image recognition, push notifications), set up the required API keys in your `.env` file.
- For production deployment, secure your environment variables and use HTTPS.
- Logs are stored in the `logs/` directory.
- For scheduled maintenance, see scripts like `scripts/cleanup.sh`.s
