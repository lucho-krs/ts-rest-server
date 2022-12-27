import { Sequelize } from 'sequelize';

const db = new Sequelize('restDB', 'root', '', {

    host: 'localhost',
    dialect: 'mysql',

});

export default db;