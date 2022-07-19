import React from 'react';
import { connect } from 'react-redux';
import { getPolls, getUserPolls } from '../store/actions'

class Polls extends React.Component {
    constructor(props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentDidMount() {
        const { getPolls } = this.props;
        getPolls();
    }

    handleSelect(id) {
        const { history } = this.props;
        history.push(`/poll/${id}`)
    }


    render() {
        const { auth, getPolls, getUserPolls } = this.props
        const { polls } = this.props.polls
        return (
            <>
                {auth.isAuthenticated && (
                    <div className="buttons_center">
                        <button className="button" onClick={getPolls}>All polls</button>
                        <button className="button" onClick={getUserPolls}>My polls</button>
                    </div>
                )}
                <div>
                    {
                        polls && polls.map((poll) => (
                            <div key={poll._id}>
                                <ul className="polls">
                                    <li onClick={() => this.handleSelect(poll._id)}>{(poll.question)}</li>
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </>

        )
    }
}

export default connect(store => ({
    auth: store.auth,
    polls: store.polls
}),
    { getPolls, getUserPolls }
)(Polls)