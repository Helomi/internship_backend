import {DataTypes, Model, Sequelize} from "sequelize";
import {ROLE, ROLES} from "../../utilities/enums";
import {PatientModel} from "./patients";
import {Models} from "../index";
import bcrypt from 'bcrypt';


export class UserModel extends Model {
    id: number
    username: string
    password: string
    role: ROLE

    //FK
    patientID: number
    patient: PatientModel
    verifyPassword: (password: string) => Promise<boolean>;

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

    },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'users'
        });

    (UserModel as any).associate = (models: Models) => {
        UserModel.belongsTo(models.Patient, {foreignKey: {
            name: 'patientID',
            allowNull: true
        }})
    }

    return UserModel
}

UserModel.prototype.verifyPassword = async function (password) {
    const user = this

    return await bcrypt.compare(password, user.password)
}