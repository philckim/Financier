import {
    ADD_ACCOUNT,
    ACCOUNT_DELETED,
    GET_ACCOUNTS,
    ACCOUNTS_LOADING,
    GET_TRANSACTIONS,
    TRANSACTIONS_LOADING
  } from "../actions/types";
  
  const initialState = {
    ...state,
    accounts: [],
    transactions: [],
    accountsLoading: false,
    transactionsLoading: false
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case ACCOUNTS_LOADING:
        return {
          ...state,
          accountsLoading: true
        };
      case ADD_ACCOUNT:
        return {
          ...state,
          accounts: [payload, ...state.accounts]
        };
      case ACCOUNT_DELETED:
        return {
          ...state,
          accounts: state.accounts.filter(
            account => account._id !== payload
          )
        };
      case GET_ACCOUNTS:
        return {
          ...state,
          accounts: payload,
          accountsLoading: false
        };
      case TRANSACTIONS_LOADING:
        return {
          ...state,
          transactionsLoading: true
        };
      case GET_TRANSACTIONS:
        return {
          ...state,
          transactions: payload,
          transactionsLoading: false
        };
      default:
        return state;
    }
  }