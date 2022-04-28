import {Router} from 'express'
import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import * as Login from "./login"

const router = Router()

export default () => {
    router.post('/login', authenticationMiddleware(), Login.workflow)

    return router
}