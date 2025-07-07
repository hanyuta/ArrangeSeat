'use strict';

module.exports = (sequelize, DataTypes) => {
    const DeskPositionManage = sequelize.define('DeskPositionManage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        x_position: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        y_position: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rotation_angle: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'desk_position_manage',
        timestamps: true
    });

    return DeskPositionManage;
}; 