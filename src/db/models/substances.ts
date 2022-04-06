import { Sequelize, Model, DataTypes } from 'sequelize'

export class SubstanceModel extends Model {
    id: number
    name: string
    timeUnit: string
    halfLife: number
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
                type: DataTypes.TEXT,
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

    return SubstanceModel
}