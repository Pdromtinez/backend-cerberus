import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const PreAccounts = db.define('PreAccounts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  app_img: {type:DataTypes.JSON},
  app_names: {type:DataTypes.STRING}
}, {
  timestamps: true, 
});




db.sync();

export default PreAccounts;
