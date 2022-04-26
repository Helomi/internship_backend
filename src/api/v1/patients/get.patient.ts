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
                        //todo Presunúť AGE, Type, SubstanceAmmount výpočty do backend-u nie cez DB
                        //Bolo povedané že by bolo lepšie tieto dáta spracovať v backend-e
                        //Ak bude čas tak prerobím.
                        //Samozrejme vidím aj chybu v tomto riešení keďže sa mi "typ" osoby zbytočne počíta 2x (pre substance amount a pre typ osoby)
                        //Age
                        [sequelize.Sequelize.fn('DATE_PART', 'year', sequelize.Sequelize.fn('AGE', sequelize.Sequelize.fn('now'), sequelize.Sequelize.col('birthdate'))), "age"],
                        //Type
                        [sequelize.Sequelize.literal('CASE WHEN date_part(\'year\', age(now(), patient.birthdate)) >= 18 THEN \'ADULT\' ELSE \'CHILD\' END'), "personType"],
                        //SubstanceAmmount
                        [sequelize.Sequelize.literal('CASE WHEN date_part(\'year\', age(now(), patient.birthdate)) >= 18 OR weight >= 68 THEN (CASE WHEN (2 * weight) + 30 <= 220 THEN (2 * weight) + 30 ELSE 220 END) ELSE (CASE WHEN (1.6 * weight) + 20 <= 150 THEN (1.6 * weight) + 20 ELSE 150 END) END'), 'substanceAmount']                    ],
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