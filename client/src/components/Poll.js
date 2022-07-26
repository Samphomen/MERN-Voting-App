import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../store/actions'
import { color } from '../services/color'


import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);



const Poll = ({ poll, vote }) => {
    const answers = poll.options && poll.options.map(option => {
        return (
            <button className="button" onClick={() => vote(poll._id, { answer: option.option })} key={option._id}>
                {option.option}
            </button>
        )
    })


    const data = poll.options && {
        labels: poll.options.map(option => option.option),
        datasets: [
            {
                label: poll.question,
                backgroundColor: poll.options.map(option => color()),
                borderColor: '#323643',
                data: poll.options.map(option => option.votes)
            }
        ]
    }


    return (
        <div>
            <h3 className="poll-title">{poll.question}</h3>
            <div className="buttons_center">{answers}</div>
            {poll.options && <Pie data={data} />}
        </div>
    )
}

export default connect(store => ({
    poll: store.currentPoll
}), { vote })(Poll)