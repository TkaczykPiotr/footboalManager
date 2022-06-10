import React, { useState, useEffect } from 'react';
import {Bar, Line, Pie, Doughnut,PolarArea } from 'react-chartjs-2';
import {Chart as ChartJs} from 'chart.js/auto'



function StatisticChartData({chartData}){



return (
<PolarArea data={chartData} height={200}   style={{border: 'solid', borderColor: "black", borderWidth: 2, background: '#fff'}} />
)
}
export default StatisticChartData;

