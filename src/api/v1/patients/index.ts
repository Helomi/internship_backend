import { Router } from 'express'

import validationMiddleware from '../../../middlewares/validationMiddleware'
import * as GetPatient from './get.patient'
import * as GetPatients from './get.patients'
import * as PatchPatient from './patch.patient'
import * as DeletePatient from './delete.patient'
import * as PostPatient from './post.patient'
import passport from "passport";
import permissionMiddleware from "../../../middlewares/permissionMiddleware";
import {ROLE} from "../../../utilities/enums";
import errorMiddleware from "../../../middlewares/errorMiddleware";

const router = Router()

export default () => {
    router.get('/',
        passport.authenticate('jwt-api'),
        permissionMiddleware([ROLE.ADMIN, ROLE.SUPER_ADMIN]),
        validationMiddleware(GetPatients.schema),
        GetPatients.workflow,
        errorMiddleware())
    router.get('/:id',
        passport.authenticate('jwt-api'),
        permissionMiddleware([ROLE.ADMIN, ROLE.USER, ROLE.SUPER_ADMIN]),
        validationMiddleware(GetPatient.schema),
        GetPatient.workflow,
        errorMiddleware())
    router.patch('/:id',
        passport.authenticate('jwt-api'),
        permissionMiddleware([ROLE.SUPER_ADMIN]),
        validationMiddleware(PatchPatient.schema),
        PatchPatient.workflow,
        errorMiddleware())
    router.delete('/:id',
        passport.authenticate('jwt-api'),
        permissionMiddleware([ROLE.SUPER_ADMIN]),
        validationMiddleware(DeletePatient.schema),
        DeletePatient.workflow,
        errorMiddleware())
    router.post('/',
        passport.authenticate('jwt-api'),
        permissionMiddleware([ROLE.SUPER_ADMIN]),
        validationMiddleware(PostPatient.schema),
        PostPatient.workflow,
        errorMiddleware())
    return router
}