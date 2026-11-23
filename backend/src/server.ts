import app from './app.js';
import connectToDatabase from './config/connect.js';


const port = 8000;
const MONGO_URI: string = process.env.MONGO_URI || '';

const startServer = async () => {
    try{
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is missing from environment variables");
        }
        await connectToDatabase(MONGO_URI);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log('Starting server at port ' + port);
        });

    }
    catch(error:any) {
        console.error('Error connecting to MongoDB:', error);
    }

};

startServer();