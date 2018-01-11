const devConfig = {
  apiKey: 'AIzaSyDV4ZHUrzh5ZT5XA1Kw7NKMOxDVBTqzGwQ',
  authDomain: 'tossaka-14-dev.firebaseapp.com',
  databaseURL: 'https://tossaka-14-dev.firebaseio.com',
  projectId: 'tossaka-14-dev',
  storageBucket: 'tossaka-14-dev.appspot.com',
  messagingSenderId: '140118202385',
};

const prodConfig = {
  apiKey: 'AIzaSyD1ZJGKQ6d7_tgSoD9MGTOrGHjCsLxB4Jg',
  authDomain: 'tossaka-14.firebaseapp.com',
  databaseURL: 'https://tossaka-14.firebaseio.com',
  projectId: 'tossaka-14',
  storageBucket: 'tossaka-14.appspot.com',
  messagingSenderId: '231207813297',
};

console.log('FIREBASE_ENV: ' + process.env.FIREBASE_ENV);
const env = process.env.FIREBASE_ENV || 'production';
// const config = env === 'development' ? devConfig : prodConfig;
const config = devConfig;

export default config;
