import React from 'react';
import { connect } from 'react-redux';

const ErrorMessage = ({ error }) => (
    <div>
        {error && <div className="error">{error.message}</div>}
    </div>
);

export default connect(store => ({ error: store.error }))(ErrorMessage);