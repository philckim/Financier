import React, { useState, useCallback, useEffect, Fragment } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth';
import { PlaidLink } from 'react-plaid-link';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {

  const [linkToken, setLinkToken] = useState("");
  const [plaidData, setPlaidData] = useState();

  useEffect(() => {
    const createLinkToken = async () => {
      console.log('Getting temp link_token... ');
      const res = await axios.get('http://localhost:5000/api/plaid/create-link-token');
      // console.log(res.data)
      const {data: { linkToken: tokenData }} = res
      setLinkToken(tokenData)
      // console.log('link_token: ', linkToken);
    }
    createLinkToken()
  }, []);

  const onSuccess = useCallback(async (publicToken, metadata) => {
    console.log('Attempting token exchange...')
    console.log('linkToken: ', linkToken)
    const {data} = await axios.post('http://localhost:5000/api/plaid/token-exchange', {
      publicToken: publicToken,
      metadata
    });
    setPlaidData(data);
  }, []);

  const authLinks = (
    <ul>
      <li>
        <div>
        <PlaidLink token={linkToken} onSuccess={onSuccess}>
          Link via Plaid
        </PlaidLink>
        </div>
      </li>
      <li>
        <Link to='/dashboard'>
          {' '}
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          {' '}
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav>
      <h1>
        <Link to='/'>
          Octo Financial
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);