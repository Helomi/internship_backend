import { Request, Response } from 'express'
import patients from './mockData.json'


export const workflow = (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    res.json({
        patient:
            patients.find(patient => patient.id === id)

    })
}