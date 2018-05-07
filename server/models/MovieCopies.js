export default (sequelize, Sequelize) => {
  const MovieCopies = sequelize.define(
    'MovieCopies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: 'movie_copies',
    },
  );

  return MovieCopies;
};
