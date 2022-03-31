import { Request, Response } from 'express'
import patients from "./mockData.json";


export const workflow = (req: Request, res: Response) => {
    const fileName = "src/api/v1/patients/mockData.json"
    const id: number = Number(req.params.id)
    const patientID = patients.findIndex(patient => patient.id === id)
    let fs = require('fs')


    delete patients[patientID]
    patients.splice(patientID, 1)


    fs.writeFile(fileName, JSON.stringify(patients, null, 2), function() {
        res.json({
            messages: [{
                message: "Patient's data was successfuly deleted",
                type: 'SUCCESS'
            }]
        })
    })
}