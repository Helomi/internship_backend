import { Request, Response } from 'express'
import Joi from "joi";

export const schema = Joi.object( {
    body: Joi.object(),
    query: Joi.object(),
    params: Joi.object({
        id: Joi.number().integer().required().min(1)
    })
})


export const workflow = (req: Request, res: Response) => {
        res.json({
            "patients": [
                {
                    "id": 24808691,
                    "firstName": "in sunt ex consequat nulla",
                    "lastName": "consectetur irure Duis adipisicing",
                    "birthdate": "2011-03-17T22:58:33.313Z",
                    "weight": 70,
                    "height": 25115957,
                    identificationNumber: '123456789012',
                    "gender": "MALE",
                    "age": 48186788,
                    "personType": "ADULT",
                    "substanceAmount": 72802234.01200244,
                    "diagnose": {
                        "id": 9180442,
                        "name": "do enim",
                        "description": "quis incididunt Ut officia mollit",
                        "substance": {
                            "id": 36359047,
                            "name": "consequat",
                            "timeUnit": "MINUTE",
                            "halfLife": 55028815.54258299
                        }
                    }
                },
                {
                    "id": 26906210,
                    "firstName": "in laboris vo",
                    "lastName": "ut cillum officia",
                    "birthdate": "1980-06-24T04:43:28.810Z",
                    "weight": 12,
                    "height": 15705862,
                    identificationNumber: '123456789012',
                    "gender": "MALE",
                    "age": 35327742,
                    "personType": "ADULT",
                    "substanceAmount": 92052628.15492068,
                    "diagnose": {
                        "id": 35176348,
                        "name": "qui ex ut Duis",
                        "description": "ex magna culpa laborum",
                        "substance": {
                            "id": 10007990,
                            "name": "dolore cupidatat sunt",
                            "timeUnit": "HOUR",
                            "halfLife": 85294432.23175654
                        }
                    }
                }
            ],
            "pagination": {
                "limit": 36001687,
                "page": 30885101,
                "totalPages": 24865099,
                "totalCount": 29588583
            }
        })

}