import { Request, Response } from 'express'
import Joi from "joi";
import sequelize, {models} from "../../../db";
import {DiagnoseModel} from "../../../db/models/diagnoses";
import {SubstanceModel} from "../../../db/models/substances";

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

    const patient = await Patient.findOne({
            where: {
                id: id
            },
            include: [{
                model: DiagnoseModel,
                attributes: ['name', 'id', 'description'],
                include: [{
                    model: SubstanceModel
                }]
            }],
            attributes:
                {
                    include: [
                        [sequelize.Sequelize.fn('DATE_PART', 'year', sequelize.Sequelize.fn('AGE', sequelize.Sequelize.fn('now'), sequelize.Sequelize.col('birthdate'))), "age"],
                        [sequelize.Sequelize.literal('CASE WHEN date_part(\'year\', age(now(), patient.birthdate)) >= 18 THEN \'ADULT\' ELSE \'CHILD\' END'), "personType"],
                        [sequelize.Sequelize.literal('CASE WHEN date_part(\'year\', age(now(), patient.birthdate)) >= 18 OR weight >= 68 THEN (2 * weight) + 30 ELSE (1.6 * weight) + 20 END'), 'substanceAmount']
                    ],
                    exclude: [
                        'diagnoseID'
                    ]
                },
            logging: true
        }

    )

    if (!patient) {
        res.status(404).json({
            message: 'Patient with this ID could not be found'
        })
    } else {
        res.status(200).json({
            patient
        })
    }
}