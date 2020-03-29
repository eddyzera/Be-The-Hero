const express = require('express');
const routes = require('./routes');
const { errors } = require('celebrate');
const cors = require('cors');

const app = express();

app.use(cors())

require('./database/db')
app.use(express.json());
app.use(routes)
app.use(errors());

app.listen(3001);