const config = (sequelize, DataTypes) => {
  return sequelize.define('config', {
    language: {
      type: DataTypes.ENUM('es', 'en'),
      defaultValue: 'es',
      allowNull: false,
    },
    session_time_out: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};

export const associate = (models) => {};

export default config;
