import React, { Component } from 'react';
import { connect } from 'react-redux';
import { accounts, journal } from '../data';
import * as actions from '../actions';
import * as utils from '../utils';

class InputForm extends Component {
  state = {
    accounts,
    journal,
    userInput: '1000 5000 MAR-16 JUL-16 HTML'
  };

  componentDidMount() {
    this.handleSubmit();
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = e => {
    e && e.preventDefault();

    this.props.dispatch(actions.setJournalEntries(utils.parseCSV(this.state.journal)));
    this.props.dispatch(actions.setAccounts(utils.parseCSV(this.state.accounts)));
    this.props.dispatch(actions.setUserInput(utils.parseUserInput(this.state.userInput)));
  }

  render() {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <h2 className="text-xl font-semibold text-foreground">Data Input</h2>
        </div>

        <form onSubmit={this.handleSubmit} className="space-y-6">
          {/* Journal Entries */}
          <div className="space-y-2">
            <label htmlFor="journal" className="block text-sm font-medium text-foreground">
              Journal Entries
            </label>
            <textarea
              className="w-full min-h-[120px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y"
              id="journal"
              rows="4"
              value={this.state.journal}
              onChange={this.handleChange}
              placeholder="Enter journal entries..."
            />
          </div>

          {/* Accounts */}
          <div className="space-y-2">
            <label htmlFor="accounts" className="block text-sm font-medium text-foreground">
              Chart of Accounts
            </label>
            <textarea
              className="w-full min-h-[120px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y"
              id="accounts"
              rows="4"
              value={this.state.accounts}
              onChange={this.handleChange}
              placeholder="Enter chart of accounts..."
            />
          </div>

          {/* User Input / Query */}
          <div className="space-y-2">
            <label htmlFor="userInput" className="block text-sm font-medium text-foreground">
              Query Parameters
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                className="flex-1 h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                id="userInput"
                value={this.state.userInput}
                onChange={this.handleChange}
                placeholder="e.g., 1000 5000 MAR-16 JUL-16 HTML"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 h-10 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Generate
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Format: StartAccount EndAccount StartPeriod EndPeriod OutputFormat (CSV/HTML)
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(InputForm);
