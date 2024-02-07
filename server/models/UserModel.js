import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import { UUIDV4 } from "sequelize";
import Accounts from './AccountModel.js';
import PreAccounts from './PreAccountModel.js';


const UserModel = db.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4(),
        primaryKey: true,
    },
    profile_img:{type:DataTypes.JSON},
    user_name:{type:DataTypes.STRING},
    user_telephone:{type:DataTypes.STRING}, 
    user_email:{type:DataTypes.STRING}, 
    user_password:{type:DataTypes.STRING},
    roles:{type:DataTypes.STRING}, 
},{
    timestamps: false
})

Accounts.belongsTo(UserModel, { foreignKey: 'user_id', as: "user" });
UserModel.hasMany(Accounts, { foreignKey: 'user_id', as: 'accounts' });
Accounts.belongsTo(PreAccounts, { foreignKey: 'PreAccounts_id', as: "preAccounts" });
PreAccounts.hasMany(Accounts, { foreignKey: 'PreAccounts_id', as: 'Accounts' });



export default UserModel;