const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN);
        console.log('DB online');
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de inicializal la BD');
    }
};

module.exports = {
    dbConnection
}


/** MongoDB
 * arysoftUser
 * olmy4yFD6yq40yZD
 * 
 * mongodb+srv://arysoftUser:olmy4yFD6yq40yZD@arysoftcalendardb.96inkya.mongodb.net/mern_calendar
 */