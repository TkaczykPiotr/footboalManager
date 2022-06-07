import React, { useState, useEffect } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {Chart as ChartJs} from 'chart.js/auto'



function MatchesChartData({chartData}){



return (
<Bar data={chartData} height={300} options={{  indexAxis: 'y', scales: { yAxes:{display: false}, xAxes: {display:false}}    }}  />
)
}
export default MatchesChartData;

