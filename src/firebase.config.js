const developmentConfig = {
  apiKey: 'AIzaSyD1ZJGKQ6d7_tgSoD9MGTOrGHjCsLxB4Jg',
  authDomain: 'tossaka-14.firebaseapp.com',
  databaseURL: 'https://tossaka-14.firebaseio.com',
  projectId: 'tossaka-14',
  storageBucket: 'tossaka-14.appspot.com',
  messagingSenderId: '231207813297',
};

const productionConfig = {
  apiKey: 'AIzaSyD1ZJGKQ6d7_tgSoD9MGTOrGHjCsLxB4Jg',
  authDomain: 'tossaka-14.firebaseapp.com',
  databaseURL: 'https://tossaka-14.firebaseio.com',
  projectId: 'tossaka-14',
  storageBucket: 'tossaka-14.appspot.com',
  messagingSenderId: '231207813297',
};

const env = process.env.NODE_ENV || 'development';
const config = env === 'development' ? developmentConfig : productionConfig;

export default config;
