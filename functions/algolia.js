/* eslint-disable func-names */

const algoliasearch = require('algoliasearch');

const algolia = algoliasearch('5RPGT77LXQ', 'c0c34193afd1631b2024fcf24699863a');
const usersIndex = algolia.initIndex('users');
const paymentsIndex = algolia.initIndex('payments');

exports.addOrUpdateUserRecord = function (user) {
  return new Promise((resolve, reject) => {
    const record = user.val();
    record.objectID = user.key;
    usersIndex
      .saveObject(record)
      .then(() => {
        console.log('User indexed in Algolia', record.objectID);
        resolve();
      })
      .catch((error) => {
        console.error('Error when indexing user into Algolia', error);
        reject();
      });
  });
};

exports.addOrUpdatePaymentRecord = function (payment) {
  return new Promise((resolve, reject) => {
    const record = payment.val();
    record.objectID = payment.key;
    usersIndex
      .saveObject(record)
      .then(() => {
        console.log('Payment indexed in Algolia', record.objectID);
        resolve();
      })
      .catch((error) => {
        console.error('Error when indexing payment into Algolia', error);
        reject();
      });
  });
};

exports.deleteUserRecord = function (user) {
  return new Promise((resolve, reject) => {
    const objectID = user.key;
    usersIndex
      .deleteObject(objectID)
      .then(() => {
        console.log('User deleted from Algolia', objectID);
        resolve();
      })
      .catch((error) => {
        console.error('Error when deleting user from Algolia', error);
        reject();
      });
  });
};

exports.deletePaymentRecord = function (payment) {
  return new Promise((resolve, reject) => {
    const objectID = payment.key;
    paymentsIndex
      .deleteObject(objectID)
      .then(() => {
        console.log('Payment deleted from Algolia', objectID);
        resolve();
      })
      .catch((error) => {
        console.error('Error when deleting payment from Algolia', error);
        reject();
      });
  });
};

exports.updateRecords = function (req, res, database) {
  req.get('/update-records', (request, respond) => {
    return database.ref('/usersData').once('value', (users) => {
      const records = [];
      users.forEach((user) => {
        const childKey = user.key;
        const childData = user.val();
        childData.objectID = childKey;
        records.push(childData);
      });

      usersIndex
        .saveObjects(records)
        .then(() => {
          const message = 'imported into Algolia';
          console.log(message);
          respond.send(message);
        })
        .catch((error) => {
          const message = 'Error when importing into Algolia';
          console.error(message, error);
          respond.send(message);
        });
    });
  });
};
