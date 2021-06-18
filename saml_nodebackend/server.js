const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected!!!");
});

const userRouter = require('./routes/users');
const searchRouter = require('./routes/searches');

app.use('/users', userRouter);
app.use('/searches', searchRouter);

const path = require('path');

app.get('/reset-password/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});