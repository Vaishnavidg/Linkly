import app from './app.js';
import connectToDatabase from './config/connect.js';

const port = 8000;

const startServer = async () => {
    try{
        await connectToDatabase('mongodb://localhost:27017/linkly');
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