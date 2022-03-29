import { Request, Response, NextFunction} from 'express'


export default function validationMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const id: number = Number(req.params.id)
        if (!(id >= 0)) {
            res.status(400).send({message: 'Bad Request', id: req.params.id})
        } else if (id != 1 ) {
            res.status(404).send({message: 'Not found'})
        } else {
            return next()
        }
    }
}

