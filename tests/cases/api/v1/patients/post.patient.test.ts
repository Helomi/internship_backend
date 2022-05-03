import supertest = require("supertest");
import app from "../../../../../src/app";
import {expect} from "chai";
const endpoint = "/api/v1/patients"

describe(`[POST] ${endpoint}`, () => {
    it('Response should return code 200 - Input data', async () => {
        const response = await supertest(app)
            .post(endpoint)
            .send({
                firstName: "Janko",
                lastName: "Mrkvička",
                birthdate: "1988-12-24",
                weight: 4,
                height: 50,
                identificationNumber: "asdfghjkll12",
                gender: "MALE",
                diagnoseID: 3
            })
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')
    })

    it('Response should return code 400 - Diagnose not found', async () => {
        const response = await supertest(app)
            .post(endpoint)
            .send({
                firstName: "Janko",
                lastName: "Mrkvička",
                birthdate: "1988-12-24",
                weight: 4,
                height: 50,
                identificationNumber: "asdfghjkll12",
                gender: "MALE",
                diagnoseID: 99999
            })
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
    })

    it('Response should return code 400 - Bad request', async () => {
        const response = await supertest(app)
            .post(endpoint)
            .send({
                firstName: "Janko",
                lastName: "Mrkvička",
                birthdate: "1988-12-24",
                weight: 4,
                identificationNumber: "asdfghjkll12",
                gender: "MALE",
                diagnoseID: 99999
            })
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
    })

})