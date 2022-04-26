import { Sequelize, Model, DataTypes } from 'sequelize'
import {Models} from "../index";
import {DiagnoseModel} from "./diagnoses";
import {TIME_UNIT_SUBSTANCES} from "../../utilities/enums";

export class SubstanceModel extends Model {
    id: number
    name: string
    timeUnit: string
    halfLife: number

    diagnoses: DiagnoseModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
    SubstanceModel.init({
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
            timeUnit: {
                type: DataTypes.ENUM(...TIME_UNIT_SUBSTANCES),
                allowNull: false
            },
            halfLife: {
                type: DataTypes.NUMBER,
                allowNull: false
            }
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'substances'
        });
    (SubstanceModel as any).associate = (models: Models) => {
        SubstanceModel.hasMany(models.Diagnose, { foreignKey: 'substanceID'})
    }
    return SubstanceModel
}