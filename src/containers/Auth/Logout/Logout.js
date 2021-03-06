import React, { useEffect } from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const logout = props => {
    const { onLogout } = props;

    // To do the logout right at the start when we enter this page
    useEffect(() => {
        onLogout();
    }, [onLogout]);
    
    return <Redirect to="/" />;
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch( actions.logout() )
    };
};

export default connect( null, mapDispatchToProps )( logout );