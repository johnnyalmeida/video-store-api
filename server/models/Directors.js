export default (sequelize, DataType) => sequelize.define(
  'Directors', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'directors',
  },
);
