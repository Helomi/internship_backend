import { Request, Response, NextFunction} from 'express'
import patients from '../api/v1/patients/mockData.json'


export default function validationMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const id: number = Number(req.params.id)
        if (!(id >= 0)) {
            res.status(400).send({message: 'Bad Request', id: req.params.id})
        } else if (!patients.find(patient => patient.id === id)) {
            res.status(404).send({message: 'Not found'})
        } else {
            return next()
        }
    }
}
