const developmentConfig = {
  apiKey: "AIzaSyDV4ZHUrzh5ZT5XA1Kw7NKMOxDVBTqzGwQ",
  authDomain: "tossaka-14-dev.firebaseapp.com",
  databaseURL: "https://tossaka-14-dev.firebaseio.com",
  projectId: "tossaka-14-dev",
  storageBucket: "tossaka-14-dev.appspot.com",
  messagingSenderId: "140118202385"
};

const productionConfig = {
  apiKey: 'AIzaSyD1ZJGKQ6d7_tgSoD9MGTOrGHjCsLxB4Jg',
  authDomain: 'tossaka-14.firebaseapp.com',
  databaseURL: 'https://tossaka-14.firebaseio.com',
  projectId: 'tossaka-14',
  storageBucket: 'tossaka-14.appspot.com',
  messagingSenderId: '231207813297',
};

const env = process.env.FIREBASE_ENV || 'dev';
console.log(`Firebase environment on: ${env}`);
const config = env === 'dev' ? developmentConfig : productionConfig;

export default config;
