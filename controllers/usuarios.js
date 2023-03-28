const { request, response} = require('express');


const getUser = (req = request, res = response) => {
    const { q , nombre , apikey } = req.query;
    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey
    });
}

const putUser = (req = request, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put API',
        id
    });
}

const postUser = (req = request, res = response) => {
    const {nombre,edad} = req.body;
    res.status(201).json({
        ok : true,
        msg: 'post API',
        nombre,
        edad
    });
}

const deleteUser = (req = request, res = response) => {
    res.json({
        ok : true,
        msg: 'delete API'
    });
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