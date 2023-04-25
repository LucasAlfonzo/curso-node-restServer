const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/modeloUsuario');

const validarJWT = async( req = request , res = response , next ) =>{
    const token = req.header( 'x-token' );
    if( !token ){
        return res.status(401).json({
            msg : 'No existe el token en la peticion'
        });
    }
    try {
        const payload = jwt.verify( token , process.env.SECRETORPRIVATEKEY );
        const usuario = await Usuario.findById( payload.uid );
        //TODO VERIFICA SI EXISTE EL USUARIO
        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no válido - Usuario inexistente'
            });
        }
        //TODO VERIFICA SI EL USUARIO AUTENTICADO TIENE SU ESTADO EN TRUE
        if( !usuario.estado ){
            return res.status(401).json({
                msg : 'Token no válido - Estado Usuario Autenticado en false'
            });
        }

        req.usuario = usuario;
        req.uid = payload.uid;

        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg : 'Token no válido'
        })
    }
}

module.exports= {
    validarJWT
}