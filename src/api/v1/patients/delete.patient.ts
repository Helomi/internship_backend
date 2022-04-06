import { Request, Response } from 'express'
import patients from "./mockData.json";
import Joi from "joi";
import {models} from "../../../db";

export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().integer().required().min(1)
    })
})


export const workflow = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const {Patient} = models

    const patient = await Patient.findByPk(id)

    if (!patient) {
        res.status(404).json({
            message: 'Patient with this ID could not be found'
        })
    } else {
        await patient.destroy()
        res.status(200).json({
            messages: [{
                message: "Patient's data was successfuly deleted",
                type: 'SUCCESS'
            }]
        })
    }
}