import React from 'react'
import { connect } from 'react-redux'

import { authUser, logout } from '../store/actions'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const { username, password } = this.state;
        const { authType } = this.props;
        e.preventDefault();

        this.props.authUser(authType || 'login', { username, password })
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        const { username, password } = this.state;


        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit} >
                    <label className="form-label" htmlFor='username'>username</label>
                    <input
                        type="text"
                        value={username}
                        name='username'
                        autoComplete='off'
                        onChange={this.handleChange}
                        className="form-input"
                    />

                    <label className="form-label" htmlFor='password'>password</label>
                    <input
                        type="password"
                        value={password}
                        name='password'
                        autoComplete='off'
                        onChange={this.handleChange}
                        className="form-input"
                    />
                    <div className="buttons_center">
                        <button className="button" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(() => ({}), { authUser, logout })(Auth)