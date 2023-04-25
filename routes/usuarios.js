const { Router } = require('express');
const { check } = require('express-validator');

const {
    getUser,
    putUser,
    postUser,
    deleteUser,
    patchUser
} = require('../controllers/usuarios');

//VALIDACIONES MIDDLEWARE
const { validarCampos , validarJWT , esAdminRol , tieneRol } = require('../middlewares/index');
// const { validarCampos } = require('../middlewares/validarCampos');
// const { validarJWT } = require('../middlewares/validarJWT');
// const { esAdminRol, tieneRol } = require('../middlewares/validarRol');

const { existeRol, existeCorreo, existeUsuarioId } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUser );

router.put('/:id', [
    check( 'id' , 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeUsuarioId ),
    validarCampos
] , putUser );

router.post('/',[
    check( 'correo' , 'El correo no es válido' ).isEmail(),
    check( 'correo').custom( existeCorreo ),

    check( 'nombre' , 'El  es obligatorio' ).not().isEmpty(),
    check( 'password' , 'El password debe de ser de al menos 6 letras' ).isLength({min: 6}),
    
    check( 'rol' , 'El rol debe de ser string' ).isString(),
    check( 'rol' ).custom( existeRol ),
    validarCampos
] , postUser );

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    // tieneRol('ADMIN_ROLE' , 'USER_ROLE' , 'CUALQUIER_ROLE'),
    check( 'id' , 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeUsuarioId ),
    // check( 'rol' , 'El rol debe de ser string' ).isString(),
    // check( 'rol' ).custom( existeRol ),
    validarCampos
] , deleteUser );

router.patch('/', patchUser );





module.exports = router;

