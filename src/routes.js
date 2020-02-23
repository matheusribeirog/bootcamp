const {Router}=require('express');
const UserController=require("./app/controllers/UserController")
const SessionController=require("./app/controllers/SessionController");
const authMidleware=require('./app/middlewares/auth')

const routes=Router();

routes.post('/users',UserController.store);

routes.post('/session',SessionController.store);

routes.use(authMidleware)

routes.put('/users',UserController.update)

module.exports=routes;