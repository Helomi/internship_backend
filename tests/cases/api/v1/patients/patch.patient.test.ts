import supertest = require("supertest");
import {expect} from "chai";
import app from "../../../../../src/app";

const endpoint = (patientID: number | string) => `/api/v1/patients/${patientID}`

describe(`[PATCH] ${endpoint(':patientID')}`,()=>{

    it('Response should return code 400 - Bad Request', async () => {
        const response = await supertest(app)
            .patch(endpoint(18 + 'somethingRandom'))
            .send({
                weight: 1,
                height: 20
            })
            .set('Content-Type', 'application/json')
        expect(response.type).to.eq('application/json')
        expect(response.status).to.eq(400)
    })

    it('Response should return code 200 - Successfully patched', async () => {
        const response = await supertest(app)
            .patch(endpoint(19))
            .send({
                weight: 1,
                height: 20
            })
            .set('Content-Type', 'application/json')
        expect(response.type).to.eq('application/json')
        expect(response.status).to.eq(200)
    })
    it('Response should return code 404 - Not found', async () => {
        const response = await supertest(app)
            .patch(endpoint(18))
            .send({
                weight: 1,
                height: 20
            })
            .set('Content-Type', 'application/json')
        expect(response.type).to.eq('application/json')
        expect(response.status).to.eq(404)
    })
})
