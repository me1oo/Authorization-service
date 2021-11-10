const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./auth_router');
const PORT = process.env.PORT || 5000;
const app = express();



app.use(express.json());
app.use("/auth", authRouter);
app.use(express.static(__dirname + '/'));

app.get('/', function(request, response){
    response.sendFile('/index.html', { root: '.' });
    
});



const start = async () => {
    try {
        await mongoose.connect( 'mongodb+srv://qwerty:qwertyytrewq@cluster0.fuiyi.mongodb.net/AUTH_TEST?retryWrites=true&w=majority' );
        app.listen(PORT, console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();