import {expect} from 'chai'
import supertest = require("supertest");
import app from './../.././../../../src/app'


const endpoint = (patientID: number | string) => `/api/v1/patients/${patientID}`


describe(`[DEL] ${endpoint(':patientID')}`,()=> {
    it('Response should return code 200 and delete data', async () => {
        const response = await supertest(app)
            .del(endpoint(18))
            .set('Content-Type', 'application/json')
        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')
    })
    it('Response should return code 404', async () => {
        const response = await supertest(app)
            .del(endpoint(18))
            .set('Content-Type', 'application/json')
        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')
    })
    it('Response should return code 400', async () => {
        const response = await supertest(app)
            .del(endpoint("sdfg"))
            .set('Content-Type', 'application/json')
        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
    })
})
