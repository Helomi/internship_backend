import { Sequelize } from "sequelize"
import * as database from '../../config/database'

import modelSubstance from './models/substances'
import modelDiagnose from './models/diagnoses'
import modelPatient from './models/patients'
import modelUser from './models/users'
import { forEach } from 'lodash'

const env = process.env.NODE_ENV
const { url, options } = (database as any)[env]

const sequelize = new Sequelize(url, options)

sequelize.authenticate()
    .then(()=> console.log('Database connection has been established succesfully'))
    .catch((err) => console.log(`Unable to connect to database ${err.messages}`))

const modelsBuilder = (instance: Sequelize) => ({
    Substance: modelSubstance(instance, 'substance'),
    Diagnose: modelDiagnose(instance, 'diagnose'),
    Patient: modelPatient(instance, 'patient'),
    User: modelUser(instance, 'user')

})

const buildModels = () => {
    const models = modelsBuilder(sequelize)

    forEach(models, (model: any) => {
        if(model.associate) {
            model.associate(models)
        }
    })

    return models
}

const models = buildModels()
type Models = typeof models

export type { Models }
export { models }

export default sequelize