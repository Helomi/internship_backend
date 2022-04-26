import {DataTypes, Model, Sequelize} from "sequelize";
import {ROLE, ROLES} from "../../utilities/enums";
import {PatientModel} from "./patients";
import {Models} from "../index";

export class UserModel extends Model {
    id: number
    username: string
    password: string
    role: ROLE

    //FK
    patientID: number
    patient: PatientModel

}

export default (sequelize: Sequelize, modelName: string) => {
    UserModel.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(...ROLES),
            allowNull: false
        },
        patientID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'users'
        });

    (UserModel as any).associate = (models: Models) => {
        UserModel.belongsTo(models.Patient, {foreignKey: 'patientID'})
    }

    return UserModel
}