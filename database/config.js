const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log('Intentando conectar a la base de datos...');
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al iniciar la base de datos');
    }
};

module.exports = {
    dbConnection
};
