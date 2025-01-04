const mongoose = require("mongoose");
const url = process.env.DATABASE_URL;

mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Database Connected');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});