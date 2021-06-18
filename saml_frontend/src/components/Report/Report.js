import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Report.module.css';

import { Pie } from 'react-chartjs-2';

function Report(props) {
    const data = {
        labels: ['Positive', 'Negative'],
        datasets: [
            {
                label: '% of reviews',
                data: props.dataset,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',

                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
                radius: 200,
                offset: 1,
                hoverOffset: 4
            },
        ],
    }
    return (
        <Aux>
            {/* {console.log(props)} */}
            <div className={classes.Report} >
                <div className="text-center">
                    <h1 className="display-4">Pie Chart by Polarity:</h1>
                </div>
                <Pie data={data} />
            </div>  
        </Aux>
    )
}

// const data = {
//     labels: ['Red', 'Blue'],
//     datasets: [
//         {
//             label: '% of reviews',
//             data: [9, 1],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)'
//             ],
//             borderWidth: 1,
//         },
//     ],
// };
// console.log(this.props);

export default Report;