import { Request, Response } from 'express'
import patients from './mockData.json'
import fs from "fs";
import Joi from "joi";

export const schema = Joi.object( {
    body: Joi.object({
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string().max(100).required(),
        birthdate: Joi.date().required(),
        height: Joi.number().min(1).required(),
        weight: Joi.number().max(200).required(),
        identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12).required(),
        gender: Joi.string().valid("MALE", "FEMALE").required(),
        diagnoseID: Joi.number().integer().min(1).required()
    }),
    query: Joi.object(),
    params: Joi.object()
})



export const workflow = (req: Request, res: Response) => {
    const fileName = "src/api/v1/patients/mockData.json"
    const newPatientID = patients[patients.length - 1].id + 1


    patients.push(req.body)
    patients[patients.length -1].id = newPatientID;


    fs.writeFile(fileName, JSON.stringify(patients, null, 2), function() {
        res.json({
            messages: [{
                message: "Patient's data was successfuly created",
                type: 'SUCCESS'
            }],
            patient: {
                id: newPatientID
            }
        })
    })

}