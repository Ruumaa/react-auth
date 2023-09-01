import { Sequelize } from "sequelize";  

const db = new Sequelize('db_auth', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
})

export default db;