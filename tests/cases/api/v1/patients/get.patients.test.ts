import Joi from "joi";
import {GENDERS} from "../../../../../src/utilities/enums";
import app from "../../../../../src/app";
import {expect} from "chai";
import supertest = require("supertest");

const endpoint = `/api/v1/patients/`

export const responseSchema = Joi.object({
    patients: Joi.array().items(
        Joi.object({
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
    }).required())
})

describe(`[GET]  ${endpoint}`, () => {
    it('Response should return code 200 - ', async () => {
        const response = await supertest(app)
            .get(endpoint)
            .query({gender: 'MALE', page: 200, limit: 100})
            .set('Content-Type', 'application/json')
        expect(response.type).to.eq('application/json')
        expect(response.status).to.eq(200)
        expect(response.body.patients.length).to.eq(0)
    })
    it('Response should return code 400 - Limits are 25 50 100', async () => {

        const response = await supertest(app)
            .get(endpoint)
            .query({limit: 3})
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(400);
    });

    it('Response should return code 400 - Gender MALE, FEMALE', async () => {

        const response = await supertest(app)
            .get(endpoint)
            .query({gender: 'something'})
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(400);
    });

})