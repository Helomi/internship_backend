import {expect} from 'chai'
import supertest = require("supertest");
import app from './../.././../../../src/app'
import {GENDERS} from "../../../../../src/utilities/enums";
import Joi = require("joi");


const endpoint = (patientID: number | string) => `/api/v1/patients/${patientID}`

export const responseSchema = Joi.object({
    patient:Joi.object({
        id: Joi.number().integer().min(1).required(),
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string().max(100).required(),
        birthdate: Joi.date().iso().required(),
        weight: Joi.number().integer().min(1).max(200).required(),
        height: Joi.number().integer().min(1).required(),
        identificationNumber: Joi.string().alphanum().length(12).required(),
        gender: Joi.string().valid(...GENDERS).required(),
        age: Joi.number().integer().min(0).required(),
        personType: Joi.string().valid("CHILD", "ADULT").required(),
        substanceAmount: Joi.number().min(1).required(),
        diagnose: Joi.object({
            id: Joi.number().integer().min(1).required(),
            name: Joi.string().max(100).required(),
            description: Joi.string().max(200).required(),
            substance: Joi.object({
                id: Joi.number().integer().min(1).required(),
                name: Joi.string().max(100).required(),
                timeUnit: Joi.string().required(),
                halfLife: Joi.number().min(0).required()
            })
        }).required()
    }).required()
})



describe(`[GET] ${endpoint(':patientID')}`,()=>{
    it('Response should return code 200 - valid data', async()=> {
        const response = await supertest(app)
            .get(endpoint(19))
            .set('Content-Type', 'application/json')
        expect(response.status).to.eq(200)
        expect(responseSchema.validate(response.body).error).to.eq(undefined)
        expect(response.type).to.eq('application/json')
    })

    it('Response should return code 400 Bad request', async()=> {
        const response = await supertest(app)
            .get(endpoint(-1))
            .set('Content-Type', 'application/json')
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
        expect(response.body.details[0].message).to.eq('"params.id" must be greater than or equal to 1')
    })

    it('Response should return code 400 Bad request', async()=> {
        const response = await supertest(app)
            .get(endpoint("sdafasd"))
            .set('Content-Type', 'application/json')
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
        expect(response.body.details[0].message).to.eq('"params.id" must be a number')
    })

    it('Response should return code 404 not found', async()=> {
        const response = await supertest(app)
            .get(endpoint(999999999))
            .set('Content-Type', 'application/json')
        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')
        expect(response.body.message).to.eq('Patient with this ID could not be found')
    })
})