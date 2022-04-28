import { Request, Response } from 'express'
import Joi from "joi";
import {models} from "../../../db";

export const schema = Joi.object( {
    body: Joi.object({
        firstName: Joi.string().max(100),
        lastName: Joi.string().max(100),
        birthdate: Joi.date(),
        height: Joi.number().min(1),
        weight: Joi.number().max(200),
        identificationNumber: Joi.string().pattern(/^[a-zA-Z0-9]*$/).length(12),
        gender: Joi.string().valid("MALE", "FEMALE"),
        diagnoseID: Joi.number().integer().min(1)
    }),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().integer().required().min(1)
    })
})


export const workflow = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const {Patient} = models
    const updatePatient: any = await Patient.findByPk(id)
    if (!updatePatient) {
        res.status(404).json({
            message: 'Patient with this ID could not be found'
        })
    } else {

    const updatePatientData = req.body

    Object.keys(updatePatientData).forEach(key => updatePatient[key] = updatePatientData[key])
    await updatePatient.save().then(function (){
        res.status(200).json({
            messages: [{
                message: "Patient's data was successfuly updated",
                type: 'SUCCESS'
            }]
        })
        }).catch(function() {
          res.status(400).json({
              messages: [{
                  message: "Something goes wrong",
                  type: 'FAIL'
              }]
          })
        console.error(`ERROR: patch.patient`)
        }
    )
    }
}