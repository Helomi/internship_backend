import {Router} from 'express'
import * as SubstanceAmounts from "./get.amounts"
import errorMiddleware from "../../../middlewares/errorMiddleware";

const router = Router()

export default () => {
    router.get('/',
        SubstanceAmounts.workflow,
        errorMiddleware())
    return router
}