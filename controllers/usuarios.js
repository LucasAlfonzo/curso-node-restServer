const { request, response} = require('express');
const Usuario = require('../models/modeloUsuario');
const bcryptjs = require('bcryptjs');


const getUser = async(req = request, res = response) => {
    // const { q , nombre , apikey } = req.query;
    // const usuarios = await Usuario.find( { estado : true } )
    //     .skip( Number( desde ) )
    //     .limit( Number( limite ) );
    // const total = await Usuario.countDocuments( { estado : true } );
    const { desde = 0 , limite = 0 } = req.query;
    const [ total , usuarios ] = await Promise.all( [
        Usuario.countDocuments( { estado : true } ),
        Usuario.find( { estado : true } )
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);

    res.json({
        total,
        usuarios
        // resp
    });
}

const putUser = async(req = request, res = response) => {
    const id = req.params.id;
    const { _id , password , google , correo , ...resto } = req.body;
    //TODO: VALIDAR CONTRA BASE DE DATOS
    if( password ){
        //ENCRIPTAR LA CONTRASEÑA
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password , salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id , resto );
    res.json( usuario );
}

const postUser = async(req = request, res = response) => {

    const { nombre , correo , password , rol } = req.body;
    const usuario = new Usuario( { nombre , correo , password , rol } );

    //ENCRIPTAR LA CONTRASEÑA
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password , salt );


    //GUARDAR EN BASE DE DATOS
    await usuario.save();
    res.json( usuario );
}

const deleteUser = async(req = request, res = response ) => {
    const {id} = req.params;
    const usuarioTest = await Usuario.findById(id);
    //TODO VERIFICA SI EL USUARIO A ELIMINAR YA ESTÁ EN FALSO SU ESTADO
    if( !usuarioTest.estado ){
        return res.status(401).json({
            msg : 'User already deleted'
        });
    }
    const usuario = await Usuario.findByIdAndUpdate( id , { estado : false } );
    usuario.estado = false;
    return res.json(usuario);
}

const patchUser = (req = request, res = response) => {
    res.json({
        ok : true,
        msg: 'patch API'
    });
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser,
    patchUser
}