import { Request, Response } from 'express'
import Joi from "joi";
import sequelize, {models} from "../../../db";
import {PatientModel} from "../../../db/models/patients";
import {ceil, now} from "lodash";
import {DiagnoseModel} from "../../../db/models/diagnoses";
import {SubstanceModel} from "../../../db/models/substances";
import {LooseObject} from "../../../utilities/iTypes";
import {GENDERS} from "../../../utilities/enums";

export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object({
        gender: Joi.string().valid(...GENDERS),
        order: Joi.string().pattern(/^[a-zA-Z]*(:)(desc|asc|DESC|ASC)$/).default("lastName:asc"),
        limit: Joi.number().valid(25, 50, 100).default(25),
        page: Joi.number().min(1).default(1)
        }
    ),
    params: Joi.object()
})


export const workflow = async (req: Request, res: Response) => {
    const {Patient} = models
    const query: any = req.query
    const order = query.order.split(":")
    let patientsSize: number


    const options: LooseObject = {
        limit: query.limit,
        offset: (query.limit * (query.page-1)),
        order: [
            [order[0], order[1]]
        ],
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
                    [sequelize.Sequelize.fn('DATE_PART', 'year', sequelize.Sequelize.fn('AGE', sequelize.Sequelize.fn('now'), sequelize.Sequelize.col('birthdate'))), "age"],
                    [sequelize.Sequelize.literal('CASE WHEN date_part(\'year\', age(now(), patient.birthdate)) >= 18 OR weight >= 68 THEN \'ADULT\' ELSE \'CHILD\' END'), "personType"],
                    [sequelize.Sequelize.literal('CASE WHEN date_part(\'year\', age(now(), patient.birthdate)) >= 18 OR weight >= 68 THEN (CASE WHEN (2 * weight) + 30 <= 220 THEN (2 * weight) + 30 ELSE 220 END) ELSE (CASE WHEN (1.6 * weight) + 20 <= 150 THEN (1.6 * weight) + 20 ELSE 150 END) END'), 'substanceAmount']
                ],
                exclude: [
                    'diagnoseID'
                ]
            },
        logging: false
    }

    if (query.gender) {
        options.where = {gender: query.gender}
        patientsSize = await Patient.count({
            where: {
                gender: query.gender
            }
        })
    } else {
        patientsSize = await Patient.count()
    }


    const patients: PatientModel[] = await Patient.findAll(options)
    res.json({
        patients,
        pagination: {
            limit: query.limit,
            page: query.page,
            totalPages: ceil(patientsSize / query.limit),
            totalCount: patientsSize
        }
    })

}