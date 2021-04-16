import axios from 'axios';
import { setAlert } from './alert';
import { 
    ADD_ACCOUNT,
    ACCOUNT_DELETED,
    GET_ACCOUNTS,
    ACCOUNTS_LOADING,
    GET_TRANSACTIONS,
    TRANSACTIONS_LOADING,
} from './types';

// Add account
export const addAccount = plaidData => async(dispatch) => {
    const accounts = plaidData.accounts;
    try {
        axios.post('/api/plaid/accounts/add', plaidData).then(res => 
            dispatch({
                type: ADD_ACCOUNT,
                payload: res.data
            })
        )
        .then(data => 
            accounts ? dispatch(getTransactions(accounts.concat(data.payload))) : null
        )
        .catch(err => console.log(err));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }  
}

// Delete Account (TODO)
export const deleteAccount = plaidData => async (dispatch) => {
    // ....
}

// Get all accounts for target user (TODO)
export const getAccounts = () => async (dispatch) => {
    // ...
}

// Accounts Loading
export const setAccountsLoading = () => {
    return { type: ACCOUNTS_LOADING };
};

// get transactions (TODO)
export const getTransactions = plaidData => async (dispatch) => {
    // ....
}

// transactions loading
export const setTransactionsLoading = () => {
    return { type: TRANSACTIONS_LOADING };
};