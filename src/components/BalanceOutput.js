import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as utils from '../utils';

class BalanceOutput extends Component {
  render() {
    if (!this.props.userInput.format) {
      return null;
    }

    return (
      <div className='output'>
        <p>
          Total Debit: {this.props.totalDebit} Total Credit: {this.props.totalCredit}
          <br />
          Balance from account {this.props.userInput.startAccount || '*'}
          {' '}
          to {this.props.userInput.endAccount || '*'}
          {' '}
          from period {utils.dateToString(this.props.userInput.startPeriod)}
          {' '}
          to {utils.dateToString(this.props.userInput.endPeriod)}
        </p>
        {this.props.userInput.format === 'CSV' ? (
          <pre>{utils.toCSV(this.props.balance)}</pre>
        ) : null}
        {this.props.userInput.format === 'HTML' ? (
          <table className="table">
            <thead>
              <tr>
                <th>ACCOUNT</th>
                <th>DESCRIPTION</th>
                <th>DEBIT</th>
                <th>CREDIT</th>
                <th>BALANCE</th>
              </tr>
            </thead>
            <tbody>
              {this.props.balance.map((entry, i) => (
                <tr key={i}>
                  <th scope="row">{entry.ACCOUNT}</th>
                  <td>{entry.DESCRIPTION}</td>
                  <td>{entry.DEBIT}</td>
                  <td>{entry.CREDIT}</td>
                  <td>{entry.BALANCE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    );
  }
}

BalanceOutput.propTypes = {
  balance: PropTypes.arrayOf(
    PropTypes.shape({
      ACCOUNT: PropTypes.number.isRequired,
      DESCRIPTION: PropTypes.string.isRequired,
      DEBIT: PropTypes.number.isRequired,
      CREDIT: PropTypes.number.isRequired,
      BALANCE: PropTypes.number.isRequired
    })
  ).isRequired,
  totalCredit: PropTypes.number.isRequired,
  totalDebit: PropTypes.number.isRequired,
  userInput: PropTypes.shape({
    startAccount: PropTypes.number,
    endAccount: PropTypes.number,
    startPeriod: PropTypes.date,
    endPeriod: PropTypes.date,
    format: PropTypes.string
  }).isRequired
};

export default connect(state => {
  let balance = [];

  const { journalEntries, accounts, userInput } = state;
  const { startAccount, endAccount, startPeriod, endPeriod } = userInput;

  // Filtrar entries por cuenta y período
  const filtered = journalEntries.filter(entry => {
    const accountMatch =
      (isNaN(startAccount) || entry.ACCOUNT >= startAccount) &&
      (isNaN(endAccount) || entry.ACCOUNT <= endAccount);

    const periodMatch =
      (isNaN(startPeriod.valueOf()) || entry.PERIOD >= startPeriod) &&
      (isNaN(endPeriod.valueOf()) || entry.PERIOD <= endPeriod);

    return accountMatch && periodMatch;
  });

  // Agrupar por cuenta
  const grouped = filtered.reduce((acc, entry) => {
    if (!acc[entry.ACCOUNT]) {
      acc[entry.ACCOUNT] = { DEBIT: 0, CREDIT: 0 };
    }
    acc[entry.ACCOUNT].DEBIT += entry.DEBIT;
    acc[entry.ACCOUNT].CREDIT += entry.CREDIT;
    return acc;
  }, {});

  // Crear balance con descripción
  balance = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b)
    .map(accountNum => {
      const account = accounts.find(a => a.ACCOUNT === accountNum);
      return {
        ACCOUNT: accountNum,
        DESCRIPTION: account ? account.LABEL : '',
        DEBIT: grouped[accountNum].DEBIT,
        CREDIT: grouped[accountNum].CREDIT,
        BALANCE: grouped[accountNum].DEBIT - grouped[accountNum].CREDIT
      };
    });

  const totalCredit = balance.reduce((acc, entry) => acc + entry.CREDIT, 0);
  const totalDebit = balance.reduce((acc, entry) => acc + entry.DEBIT, 0);

  return {
    balance,
    totalCredit,
    totalDebit,
    userInput: state.userInput
  };
})(BalanceOutput);
