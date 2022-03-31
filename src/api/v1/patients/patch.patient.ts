import { Request, Response } from 'express'
import patients from './mockData.json'




export const workflow = (req: Request, res: Response) => {
    const fileName = "src/api/v1/patients/mockData.json"
    const updatePatient = req.body
    const patientID = patients.findIndex(patient => patient.id === Number(updatePatient.id))
    let fs = require('fs')



    patients.at(patientID).firstName = updatePatient.firstName ? updatePatient.firstName : patients.at(patientID).firstName
    patients.at(patientID).lastName = updatePatient.lastName ? updatePatient.lastName : patients.at(patientID).lastName
    patients.at(patientID).birthdate = updatePatient.birthdate ? updatePatient.birthdate : patients.at(patientID).birthdate
    patients.at(patientID).weight = Number(updatePatient.weight) ? Number(updatePatient.weight) : patients.at(patientID).weight
    patients.at(patientID).height = Number(updatePatient.height) ? Number(updatePatient.height) : patients.at(patientID).height
    patients.at(patientID).identificationNumber = updatePatient.identificationNumber ? updatePatient.identificationNumber : patients.at(patientID).identificationNumber
    patients.at(patientID).gender = updatePatient.gender ? updatePatient.gender : patients.at(patientID).gender
    patients.at(patientID).diagnose.id = Number(updatePatient.diagnoseID) ? Number(updatePatient.diagnoseID) : patients.at(patientID).diagnose.id


    fs.writeFile(fileName, JSON.stringify(patients, null, 2), function() {
        res.json({
            messages: [{
                message: "Patient's data was successfuly updated",
                type: 'SUCCESS'
            }]
        })
    })



}