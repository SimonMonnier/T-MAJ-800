const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(global.gConfig.MongoDB_url, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("MongoDb Connected");
    });
    return db;
}

module.exports = {
    connectToDb,
}