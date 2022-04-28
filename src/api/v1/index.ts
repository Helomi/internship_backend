import { Router } from 'express'
import PatientsRouter from './patients'
import AuthRouter from './auth'

const router = Router()

export default () => {
    router.use('/patients', PatientsRouter())
    router.use('/auth/', AuthRouter())

    return router
}