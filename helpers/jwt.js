const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {

    // console.log('generarJWT');

    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {            
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        });
    });
};

/**
 * Otra opción que genera el JWT sin la Promise
 */
const generateJWT = (u_id, name) => {
    const payload = { u_id, name };
 
    try {
        const token = jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h',
        });
 
        return token;
    } catch (err) {
        console.log(err);
 
        return 'No se pudo generar el token';
    }
};

module.exports = {
    generarJWT,
    generateJWT
};
