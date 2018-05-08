export default {
  database: process.env.NODE_TEST_ENV ? 'test_video_store' : 'video_store',
  username: 'root',
  password: '',
  port: 3000,
  params: {
    dialect: 'mysql',
    host: 'localhost',
    define: {
      underscored: true,
    },
  },
  jwtSecret: '3l@mbd4',
  jwtSession: {
    session: false,
  },
};
