import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'
import * as GetPatient from './get.patient'
import * as GetPatients from './get.patients'
import * as PatchPatient from './patch.patient'
import * as DeletePatient from './delete.patient'
import * as PostPatient from './post.patient'

const router = Router()

export default () => {
    router.get('/', GetPatients.workflow)
    router.get('/:id', validationMiddleware() , GetPatient.workflow)
    router.patch('/:id', validationMiddleware(), PatchPatient.workflow)
    router.delete('/:id', validationMiddleware(), DeletePatient.workflow)
    router.post('/', PostPatient.workflow)

    return router
}