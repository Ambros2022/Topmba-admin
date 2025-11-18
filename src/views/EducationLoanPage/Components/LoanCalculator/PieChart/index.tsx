import React from 'react';
import { Pie } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
    }[];
}

const PieChart: React.FC<{ loanAmount: number; totalInterest: number }> = ({ loanAmount, totalInterest }) => {
    const data: PieChartData = {
        labels: ['Loan Amount', 'Total Interest'],
        datasets: [
            {
                data: [loanAmount, totalInterest],
                backgroundColor: ['#c2c2c2', '#254692'], // Blue for loan amount, green for total interest
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom' as const, // Set the legend position to bottom
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;
