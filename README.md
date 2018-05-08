# Simple Video Store API
Developed with Node.js, Express, JWT and Sequelize in ES6.

## Requirements
- Node.js 9.3.* +
- npm 5.5.* +

### Documentation
The documentation is available in the `DOCUMENTATION.md` file in this repository root

### Instalation
- Clone this repository: `git clone git@github.com:johnnyalmeida/video-store-api.git`
- Open de directory: `cd video-store-api`
- Install all dependecies: `npm install`
- Start the server: `npm run start`
- The server will be availabel at `http://localhost:3000`

### Configutation
- The database credentials and host are located in the `server/config/config.js` file.
- The database dump and the ER Model are available in the `_db` directory

### Tests
Integration tests are available for this project, but first you'll need to create a secondary database for tests only, it should have the same name as your main database but with the prefix `test_`, like `test_video_store`.

After creating the test database, you just need to run the main test script: `npm run test`

