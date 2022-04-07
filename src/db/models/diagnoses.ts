import { Sequelize, Model, DataTypes } from 'sequelize'
import { Models } from '..'
import {PatientModel} from "./patients";
import {SubstanceModel} from "./substances";

export class DiagnoseModel extends Model {
    id: number
    name: string
    description: string


    //FK
    substanceID: number
    patients: PatientModel[]
    substance: SubstanceModel
}

export default (sequelize: Sequelize, modelName: string) => {
    DiagnoseModel.init({
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            substanceID: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'diagnoses'
        });

    (DiagnoseModel as any).associate = (models: Models) => {
        DiagnoseModel.belongsTo(models.Substance, { foreignKey: 'substanceID'})
        DiagnoseModel.hasMany(models.Patient, { foreignKey: 'diagnoseID'})
    }

    return DiagnoseModel
}