import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'
import * as GetPatients from './get.patients'
import * as PatchPatients from './patch.patients'

const router = Router()

export default () => {
    router.get('/:id', validationMiddleware() , GetPatients.workflow)
    router.patch('/:id', validationMiddleware(), PatchPatients.workflow)

    return router
}