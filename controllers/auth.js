const {response , request} = require('express');
const Usuario = require('../models/modeloUsuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');




const login = async( req = request , res = response ) =>{

    const cuerpo = req.body; 
    try {


        //TODO: VERIFICAR SI EL EMAIL EXISTE
        const usuario = await Usuario.findOne({ correo : cuerpo.correo });
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo'
            });
        };


        //TODO: VERIFICAR SI EL USUARIO ESTA ACTIVO
        if( usuario.estado === false ){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado: false'
            });
        }



        //TODO: VALIDAR PASSWORD
        const validPassword = bcryptjs.compareSync( cuerpo.password , usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            });
        }

        //TODO: GENERAR EL JWT
        const token = await generarJWT( usuario.id );
        





        res.json({
            msg: 'Login ok', 
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    login
}