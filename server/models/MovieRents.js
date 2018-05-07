export default (sequelize, Sequelize) => {
  const MovieRents = sequelize.define(
    'MovieRents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      returned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      movie_copy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: 'movie_rents',
    },
  );

  return MovieRents;
};
