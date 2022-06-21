# Auth0ExpressAPI

Express API that returns sample data. Authorization for RS256-Signed Tokens
This sample demonstrates how to protect endpoints in an Express API by verifying an incoming JWT access token signed by Auth0. The token must be signed with the RS256 algorithm and must be verified against your Auth0 JSON Web Key Set. One of the endpoints also requires a specific scope so Roles can be used with this API.

# Getting Started
create a new API in the Auth0 dashboard.

Clone the repo from the Master branch.

# Setup the .env File
You will need to change the values in the .env file to match the values as seen in your Auth0 dashboard.

# Install the Dependencies and Start the API
npm install
npm start
The API will be served at http://localhost:5000.

# Endpoints
The sample includes these endpoints:

GET /api/public

An unprotected endpoint which returns a message on success. Does not require a valid JWT access token.
GET /api/private

A protected endpoint which returns a message on success. Requires a valid JWT access token.

GET /api/private-scoped

A protected endpoint which returns a message on success. Requires a valid JWT access token with a scope of read:data.
