import { Request, Response } from 'express'
import Joi from "joi";
import {models} from "../../../db";

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



export const workflow = async (req: Request, res: Response) => {
    const {Patient} = models
    await Patient.create(req.body).then(function (updatePatient){
        res.status(200).json({
            messages: [{
                message: "Patient's data was successfuly created",
                type: 'SUCCESS'
            }],
            patient: {
                id: updatePatient.id
            }
        })
    }).catch(function (e) {
        res.status(400).json({
                messages: [{
                    message: `Somethings goes wrong`,
                    type: 'FAIL'
                }]
            })
        console.error(`ERROR: ${e}`);
    })


    // try {
    //
    // } catch (e) {
    //     if (e) {
    //         res.status(400).json({
    //             messages: [{
    //                 message: "Patient's data was successfuly created",
    //                 type: 'Fail'
    //             }]
    //         })
    //     }
    // }





    // const fileName = "src/api/v1/patients/mockData.json"
    // const newPatientID = patients[patients.length - 1].id + 1
    //
    //
    // patients.push(req.body)
    // patients[patients.length -1].id = newPatientID;
    //
    //
    // fs.writeFile(fileName, JSON.stringify(patients, null, 2), function() {

    // })

}