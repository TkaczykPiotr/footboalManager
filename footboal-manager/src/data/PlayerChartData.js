import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {Chart as ChartJs} from 'chart.js/auto'

function PlayerChartData({chartData}){


return (
<Bar data={chartData} />




)
}

export default PlayerChartData;