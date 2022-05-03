import { Router } from 'express'
import PatientsRouter from './patients'
import AuthRouter from './auth'
import SubstancesAmountRouter from './substancesAmount'

const router = Router()

export default () => {
    router.use('/patients', PatientsRouter())
    router.use('/auth/', AuthRouter())
    router.use('/substancesAmount', SubstancesAmountRouter())

    return router
}