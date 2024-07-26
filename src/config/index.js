const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
console.log(process.env.NODE_ENV, process.env.PORT,process.env.USER,process.env.DATABASE,process.env.PASSWORD,process.env.HOST );
module.exports = {
    baseUrl:'/api/v1',
    port:process.env.PORT,
    nodeEnv:process.env.NODE_ENV,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    host:process.env.HOST,
}