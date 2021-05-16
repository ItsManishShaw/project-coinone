import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import timeConvert from '../../constants/MinuteToHour';
import useWindowResize from '../../hooks/useWindowResize';

const DoughnutChart = ({filter, data, centerTitle = 'Total' }) => {
  const [windowWidth, windowHeight] = useWindowResize();
  return (<div className="mx-auto  w-full relative">
    <Doughnut
      data={data}
      options={{
        borderAlign: 'center',
        borderWidth: 0,
        radius: 80,
        cutout: '87%',
        plugins: {
          legend: {
            display: true,
            boxWidth: 3,
            boxRadius:'50%',
            position:'bottom',
            labels: {
              boxWidth: 13,
              boxHeight: 13,
              padding: filter==='all'?30:50,
              borderRadius:'50%',
              position: 'bottom',
              maxWidth:3,
              Align: 'end'
            }
          }
        }
      }}
    />
    <div className="absolute text-xl font-bold" style={{
        height: '100px',
        width: '100px',
        left: '50%',
        marginLeft: '-20px',
        top: '50%',
        marginTop: '-60px'
    }}>
      {centerTitle}
      {data && <pre className={(filter === 'all'||filter === 'classtime'?'-ml-4 ':'mx-auto text-center ')+"flex flew-nowrap"} style={{ wordBreak: 'keep-all' }}>
        {timeConvert(filter === 'all' ?
          data?.datasets[0]?.data?.reduce(((acc, el, i, arr) => acc + parseInt(el)), 0):data?.datasets[0]?.data[0])}</pre>}
    </div>
    </div>);
    }
export default DoughnutChart;