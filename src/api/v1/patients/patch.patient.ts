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
    // const fileName = "src/api/v1/patients/mockData.json"
    // const updatePatient = req.body
    // const patient: any = patients.find(patient => patient.id === Number(req.params.id))
    // let fs = require('fs')
    // Object.keys(updatePatient).forEach(key => patient[key] = updatePatient[key]);

    // patients.at(patientID).firstName = updatePatient.firstName ? updatePatient.firstName : patients.at(patientID).firstName
    // patients.at(patientID).lastName = updatePatient.lastName ? updatePatient.lastName : patients.at(patientID).lastName
    // patients.at(patientID).birthdate = updatePatient.birthdate ? updatePatient.birthdate : patients.at(patientID).birthdate
    // patients.at(patientID).weight = Number(updatePatient.weight) ? Number(updatePatient.weight) : patients.at(patientID).weight
    // patients.at(patientID).height = Number(updatePatient.height) ? Number(updatePatient.height) : patients.at(patientID).height
    // patients.at(patientID).identificationNumber = updatePatient.identificationNumber ? updatePatient.identificationNumber : patients.at(patientID).identificationNumber
    // patients.at(patientID).gender = updatePatient.gender ? updatePatient.gender : patients.at(patientID).gender
    // patients.at(patientID).diagnose.id = Number(updatePatient.diagnoseID) ? Number(updatePatient.diagnoseID) : patients.at(patientID).diagnose.id




    }
}