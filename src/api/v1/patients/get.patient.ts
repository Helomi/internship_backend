import { Request, Response } from 'express'
import patients from './mockData.json'
import Joi from "joi";

export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().integer().required().min(1)
    })
})


export const workflow = (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    res.json({
        patient:
            patients.find(patient => patient.id === id)

    })
}