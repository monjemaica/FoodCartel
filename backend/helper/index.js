const crypto = require('crypto');

const random = () => crypto.randomBytes(128).toString('base64');
const authentication = (salt, password) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update('S3CR3T_K3Y').digest('hex')
};


module.exports = {
    random,
    authentication
}