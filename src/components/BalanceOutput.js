import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as utils from '../utils';
import ThemeToggle from './ThemeToggle';

class BalanceOutput extends Component {
  render() {
    if (!this.props.userInput.format) {
      return null;
    }

    const { balance, totalDebit, totalCredit, userInput } = this.props;
    const totalBalance = totalDebit - totalCredit;

    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-card shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary p-3">
                  <svg className="h-8 w-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Little Accountant
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Balance Sheet Generator
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {/* Total Debit Card */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Debit</p>
                  <p className="text-2xl font-bold text-foreground">${totalDebit.toLocaleString()}</p>
                </div>
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Credit Card */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Credit</p>
                  <p className="text-2xl font-bold text-foreground">${totalCredit.toLocaleString()}</p>
                </div>
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Balance</p>
                  <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${totalBalance.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Info */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Filter:</span> Account {userInput.startAccount || '*'} to {userInput.endAccount || '*'} | 
              Period {utils.dateToString(userInput.startPeriod)} to {utils.dateToString(userInput.endPeriod)}
            </p>
          </div>

          {/* CSV Output */}
          {userInput.format === 'CSV' && (
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="bg-muted px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-foreground">CSV Output</span>
                </div>
              </div>
              <pre className="p-4 text-sm font-mono bg-muted/30 overflow-x-auto text-foreground">
                {utils.toCSV(balance)}
              </pre>
            </div>
          )}

          {/* HTML Table Output */}
          {userInput.format === 'HTML' && (
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="bg-muted px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-foreground">Balance Sheet</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ACCOUNT</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">DESCRIPTION</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">DEBIT</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">CREDIT</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">BALANCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {balance.map((entry, i) => (
                      <tr key={i} className="border-b border-border transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium text-foreground">{entry.ACCOUNT}</td>
                        <td className="p-4 align-middle text-foreground">{entry.DESCRIPTION}</td>
                        <td className="p-4 align-middle text-right text-foreground">${entry.DEBIT.toLocaleString()}</td>
                        <td className="p-4 align-middle text-right text-foreground">${entry.CREDIT.toLocaleString()}</td>
                        <td className={`p-4 align-middle text-right font-medium ${entry.BALANCE >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          ${entry.BALANCE.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/50 font-medium">
                      <td className="p-4" colSpan={2}>TOTAL</td>
                      <td className="p-4 text-right text-foreground">${totalDebit.toLocaleString()}</td>
                      <td className="p-4 text-right text-foreground">${totalCredit.toLocaleString()}</td>
                      <td className={`p-4 text-right font-bold ${totalBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        ${totalBalance.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-auto">
          <div className="container mx-auto px-4 py-4">
            <p className="text-center text-sm text-muted-foreground">
              Little Accountant © 2024 - Balance Sheet Generator
            </p>
          </div>
        </footer>
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

  // Verificar que state tenga los datos necesarios
  if (!state || !state.journalEntries || !state.accounts || !state.userInput) {
    return {
      balance: [],
      totalCredit: 0,
      totalDebit: 0,
      userInput: {
        startAccount: null,
        endAccount: null,
        startPeriod: new Date(),
        endPeriod: new Date(),
        format: null
      }
    };
  }

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

