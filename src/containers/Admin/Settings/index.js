import React from 'react';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import _ from 'lodash';
import * as firebase from 'firebase';
import * as algoliasearch from 'algoliasearch';

class Settings extends React.Component {
  state = {
    openSignIn: true,
    openSignUp: true,
    adminData: {},
    onRebuildDatabase: false,
    onRebuildUser: false,
    onRebuildPayment: false,
  };

  toggleSignIn = (checked) => {
    this.setState({ ...this.state, openSignIn: checked });
  }


  toggleSignUp = (checked) => {
    this.setState({ ...this.state, openSignUp: checked });
  }

  rebuildDatabase = () => {
    const database = firebase.database();

    database.ref('/').once('value').then((snapshot) => {
      let parsed = snapshot.val();

      // Reset count values
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

      parsed.usersData = updateNumber(parsed, 'usersData', 'userNumber', i => parsed.appData.usersCount = i);
      parsed.paymentsData = updateNumber(parsed, 'paymentsData', 'paymentNumber', i => parsed.appData.paymentsCount = i);

      database.ref('/').update(parsed, () => this.setState({ onRebuildDatabase: false }, alert('Database rebuilding completed')));
    });
  }


  rebuildUserIndex = () => {
    const algolia = algoliasearch(
      '5RPGT77LXQ',
      'c0c34193afd1631b2024fcf24699863a',
    );

    const userIndex = algolia.initIndex('users');

    const database = firebase.database();
    return database.ref('/usersData').once('value', (users) => {
      const records = [];
      users.forEach((user) => {
        const childKey = user.key;
        const childData = user.val();
        childData.objectID = childKey;
        records.push(childData);
      });

      userIndex
        .saveObjects(records)
        .then(() => {
          const message = 'imported into Algolia';
          this.setState({ onRebuildUser: false }, alert(message));
        })
        .catch((error) => {
          const message = 'Error when importing into Algolia';
          this.setState({ onRebuildUser: false }, alert(message + ': ' + error));
        });
    });
  }

  rebuildPaymentIndex = () => {
    const algolia = algoliasearch(
      '5RPGT77LXQ',
      'c0c34193afd1631b2024fcf24699863a',
    );

    const paymentsIndex = algolia.initIndex('payments');

    const database = firebase.database();
    return database.ref('/paymentsData').once('value', (users) => {
      const records = [];
      users.forEach((user) => {
        const childKey = user.key;
        const childData = user.val();
        childData.objectID = childKey;
        records.push(childData);
      });

      paymentsIndex
        .saveObjects(records)
        .then(() => {
          const message = 'imported into Algolia';
          this.setState({ onRebuildPayment: false }, alert(message));
        })
        .catch((error) => {
          const message = 'Error when importing into Algolia';
          this.setState({ onRebuildPayment: false }, alert(message + ': ' + error));
        });
    });
  }

  handleRebuildDatabase = () => {
    this.setState({ onRebuildDatabase: true }, () => this.rebuildDatabase());
  }

  handleRebuildUser = () => {
    this.setState({ onRebuildUser: true }, () => this.rebuildUserIndex());
  }

  handleRebuildPayment = () => {
    this.setState({ onRebuildPayment: true }, () => this.rebuildPaymentIndex());
  }

  render() {
    return (
      <div>
        <div>
          <Typography type="title">Rebuilder</Typography>
          <br />
          <Button disabled={this.state.onRebuildDatabase} onClick={() => this.handleRebuildDatabase()} raised>
            {this.state.onRebuildDatabase ? 'Rebuilding ...' : 'Recount Database'}
          </Button>
          <br />
          <br />
          <Button disabled={this.state.onRebuildUser} onClick={() => this.handleRebuildUser()} raised>
            {this.state.onRebuildUser ? 'Rebuilding ...' : 'Rebuild User Index'}
          </Button>
          <br />
          <br />  
          <Button disabled={this.state.onRebuildPayment} onClick={() => this.handleRebuildPayment()} raised>
            {this.state.onRebuildPayment ? 'Rebuilding ...' : 'Rebuild Payment Index'}
          </Button>
          <br />
          <br />
          <br />
          <br />
        </div>
        <div>
          <Typography type="title">Authentication</Typography>
          <br />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.openSignIn}
                  onChange={(event, checked) => this.toggleSignIn(checked)}
                />
              }
              label="Sign In Form"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.openSignUp}
                  onChange={(event, checked) => this.toggleSignUp(checked)}
                />
              }
              label="Sign Up Form"
            />
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default Settings;