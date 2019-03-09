const mAdmin = require('../model/m-admin');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

AdminController = {
    postRegister : async (ctx) => {
        let email = ctx.request.body.email;
        let password =  ctx.request.body.password;
        let unique = false;
        await mAdmin.findAdminByEmail(email)
            .then(res => {
                if (res.length == 0) {
                    unique = true;
                } else if (res.length > 0) {
                    unique = false;
                }
            });
        
        if (unique) {
            await mAdmin.insertAdmin(email, md5(password))
                .then(res => {
                    ctx.response.body = {
                        error: false,
                        msg: "successful"
                    };
                });
        } else {
            ctx.response.body = { 
                error: true,
                msg : "Email already exist" 
            };
        }
    },

    postLogin : async (ctx) => {
        let email = ctx.request.body.email;
        let password =  ctx.request.body.password;
        await mAdmin.findAdminByEmailAndPass(email, md5(password))
            .then((res) => {
                if (res.length == 0) {
                    ctx.response.body = {
                        error: true,
                        msg: "Email or password is not correct"
                    }
                } else {
                    let token = jwt.sign(res[0].email, 'secret');
                    ctx.response.body = {
                        error: false,
                        msg: "successful",
                        token: token
                    }
                }
        });
    }
}

module.exports = AdminController;