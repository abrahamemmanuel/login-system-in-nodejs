import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import mongoose from 'mongoose';
import key from './config/keys';
import router from './routes/index';

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(router);

// DB Config
const db = key.mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

if (!module.parent) { app.listen(key.env, () => console.log(`Server running on port ${key.env}`)); }// eslint-disable-line no-console

export default app;
