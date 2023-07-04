const dotenv = require("dotenv").config();



const MONGODB_UN = process.env.MONGODB_UN;
const MONGODB_PW = process.env.MONGODB_PW;
const MONGODB_DB = process.env.MONGODB_DB;
const MONGODB_URL = `mongodb+srv://${MONGODB_UN}:${MONGODB_PW}@foodcartel.4u5mlnb.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT): 3000;

const COOKIE = process.env.COOKIE
const SECRET = process.env.SECRET

module.exports = {
 mongodb:{
    url: MONGODB_URL
 },
 server:{
    port:SERVER_PORT
 },
 key:{
   cookie:COOKIE,
   secret: SECRET
 }
};
