 const connectToMongoose = require('./db');
const express = require('express');
const cors = require('cors');
const authRouter = require('./Routes/authRoute')
const notesRouter = require('./Routes/notesRoute')
// const notesRouter = require('./Routes/notesRoute')
 connectToMongoose();
const port = 5000
const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth',authRouter);
app.use('/notes',notesRouter);


app.listen(port);