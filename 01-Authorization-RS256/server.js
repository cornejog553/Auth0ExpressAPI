const express = require('express');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const cors = require('cors');
require('dotenv').config();

if (!process.env.ISSUER_BASE_URL || !process.env.AUDIENCE) {
  throw 'Make sure you have ISSUER_BASE_URL, and AUDIENCE in your .env file';
}

const corsOptions =  {
  origin: 'http://localhost:5000'
};

app.use(cors(corsOptions));

const checkJwt = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: `https://dev-udf2grvz.us.auth0.com/`,
});

app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.get('/api/private-scoped', checkJwt, requiredScopes('read:data'), function(req, res) {
  res.json({
    message: 'Only admins can view the client and action information below.'
  });
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  return res.set(err.headers).status(err.status).json({ message: err.message });
});

app.listen(5000);
console.log('Listening on http://localhost:5000');
