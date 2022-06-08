import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {Chart as ChartJs} from 'chart.js/auto'

function PlayerChartData({chartData}){


return (
<Bar data={chartData} style={{border: 'solid', borderColor: "black", borderWidth: 2}}/>
)
}
export default PlayerChartData;