import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import dns from 'node:dns';
import usersRouter from './routers/users.js';


const server = express();
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') { 
    dns.setServers(['8.8.8.8', '8.8.4.4']); 
}

connectDB();

server.use(cors());

server.use(express.json());

server.use("/users", usersRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

