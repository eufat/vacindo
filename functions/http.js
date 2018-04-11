/* eslint-disable func-names, no-plusplus */
const _ = require('lodash');

exports.updateCounter = function (req, res, database) {
  req.get('/reset-counter', (request, respond) => {
    database
      .ref('/')
      .once('value')
      .then((snapshot) => {
        const parsed = snapshot.val();

        parsed.appData.examsCount = _.mapValues(parsed.appData.examsCount, (v, k, o) => 0);
        parsed.appData.methodsCount = _.mapValues(parsed.appData.methodsCount, (v, k, o) => 0);

        function updateNumber(data, dataFieldKey, dataNumberingKey, callback) {
          let i = 1;
          parsed.appData.verificationCount = 0;

          const updatedData = _.mapValues(data[dataFieldKey], (value, key, object) => {
            const newValue = value;
            newValue[dataNumberingKey] = i;

            if (newValue.examType) {
              const previousExamsCount = parsed.appData.examsCount[newValue.examType];
              parsed.appData.examsCount[newValue.examType] = previousExamsCount + 1;
            }

            if (newValue.method) {
              const previousMethodsCount = parsed.appData.methodsCount[newValue.method];
              parsed.appData.methodsCount[newValue.method] = previousMethodsCount + 1;
            }

            if (newValue.verificationTime > 0) {
              const previousVerificationCount = parsed.appData.verificationCount;
              parsed.appData.verificationCount = previousVerificationCount + 1;
            }

            i++;
            return newValue;
          });

          callback(i - 1);
          return updatedData;
        }

        parsed.paymentsData = updateNumber(
          parsed,
          'paymentsData',
          'paymentNumber',
          i => (parsed.appData.paymentsCount = i)
        );
        parsed.usersData = updateNumber(
          parsed,
          'usersData',
          'userNumber',
          i => (parsed.appData.usersCount = i)
        );

        database.ref('/').update(parsed, () => respond.send('Reset successfull'));
      });
  });
};
