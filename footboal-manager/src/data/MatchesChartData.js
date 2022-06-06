import React, { useState, useEffect } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {Chart as ChartJs} from 'chart.js/auto'



function MatchesChartData({chartData}){



return (
<Bar data={chartData} height={300} options={{indexAxis: 'y', scales: {yAxes: [{gridLines: {display: false}}
                                                                     ], xAxes: [{gridLines: {display: false}}, {barPercentage: 0.6}]}}}   />
)
}
export default MatchesChartData;

