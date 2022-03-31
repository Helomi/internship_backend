import { Request, Response } from 'express'
import patients from './mockData.json'
import Joi from "joi";

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


export const workflow = (req: Request, res: Response) => {
    const fileName = "src/api/v1/patients/mockData.json"
    const updatePatient = req.body
    const patient: any = patients.find(patient => patient.id === Number(req.params.id))
    let fs = require('fs')
    Object.keys(updatePatient).forEach(key => patient[key] = updatePatient[key]);

    // patients.at(patientID).firstName = updatePatient.firstName ? updatePatient.firstName : patients.at(patientID).firstName
    // patients.at(patientID).lastName = updatePatient.lastName ? updatePatient.lastName : patients.at(patientID).lastName
    // patients.at(patientID).birthdate = updatePatient.birthdate ? updatePatient.birthdate : patients.at(patientID).birthdate
    // patients.at(patientID).weight = Number(updatePatient.weight) ? Number(updatePatient.weight) : patients.at(patientID).weight
    // patients.at(patientID).height = Number(updatePatient.height) ? Number(updatePatient.height) : patients.at(patientID).height
    // patients.at(patientID).identificationNumber = updatePatient.identificationNumber ? updatePatient.identificationNumber : patients.at(patientID).identificationNumber
    // patients.at(patientID).gender = updatePatient.gender ? updatePatient.gender : patients.at(patientID).gender
    // patients.at(patientID).diagnose.id = Number(updatePatient.diagnoseID) ? Number(updatePatient.diagnoseID) : patients.at(patientID).diagnose.id


    fs.writeFile(fileName, JSON.stringify(patients, null, 2), function() {
        res.json({
            messages: [{
                message: "Patient's data was successfuly updated",
                type: 'SUCCESS'
            }]
        })
    })



}