const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();


const {
    getAuthuser, getAuthtoken
} = require('../controllers/auth');


router
    .route('/')
    .get(auth, getAuthuser);

router
    .route('/')
    .post(getAuthtoken);





module.exports = router;