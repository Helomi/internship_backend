import { Request, Response } from 'express'
import patients from './mockData.json'
import fs from "fs";


export const workflow = (req: Request, res: Response) => {
    const fileName = "src/api/v1/patients/mockData.json"
    const newPatientID = patients[patients.length - 1].id + 1


    patients.push(req.body)
    patients[patients.length -1].id = newPatientID;


    fs.writeFile(fileName, JSON.stringify(patients, null, 2), function() {
        res.json({
            messages: [{
                message: "Patient's data was successfuly deleted",
                type: 'SUCCESS'
            }],
            patient: {
                id: newPatientID
            }
        })
    })

}