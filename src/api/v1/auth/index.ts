import {Router} from 'express'
import loginMiddleware from "../../../middlewares/loginMiddleware";
import * as Login from "./post.login"
import validationMiddleware from "../../../middlewares/validationMiddleware";
import errorMiddleware from "../../../middlewares/errorMiddleware";

const router = Router()

export default () => {
    router.post('/login',
        validationMiddleware(Login.schema),
        loginMiddleware(),
        Login.workflow,
        errorMiddleware())

    return router
}