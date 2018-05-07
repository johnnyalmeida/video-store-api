export default (sequelize, Sequelize) => {
  // Import relations
  const Directors = sequelize.import('./Directors.js');
  const MovieCopies = sequelize.import('./MovieCopies.js');
  // Declare model
  const Movies = sequelize.define(
    'Movies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      director_id: {
        type: Sequelize.INTEGER,
        references: {
          model: Directors,
          key: 'id',
        },
      },
    },
    {
      tableName: 'movies',
    },
  );
  // Define relation with Movie Copies
  Movies.hasMany(MovieCopies, {
    foreignKey: {
      name: 'movie_id',
      allowNull: false,
    },
  });
  return Movies;
};
