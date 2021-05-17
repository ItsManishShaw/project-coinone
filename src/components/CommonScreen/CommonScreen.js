import React from 'react';
import DoughnutChart from '../Doughnut/Doughnut';
import timeConvert from '../../constants/MinuteToHour';
import Divider from '@material-ui/core/Divider';
import useWindowResize from '../../hooks/useWindowResize';
import Button from '@material-ui/core/Button';
import imgLaptop from '../../images/XMLID 5.png';
import imgMb  from '../../images/XMLID 8.png';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useLocation } from "@reach/router"
import { parse } from "query-string";


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 21,
    borderRadius: 12,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 12,
    backgroundColor: '#2FED51',
  },
}))(LinearProgress);

const CommonScreen = ({ data }) => {
  const location = useLocation();

  const searchParams = parse(location.search).filter;

  const [windowWidth, windowHeight] = useWindowResize();

  const getChartData = () => {
    return searchParams === 'all' ? [data?.chartData?.classTime?.total, data.chartData?.freeTime?.total, data.chartData?.studyTime?.total]
      : searchParams === 'studytime' ? [data.chartData?.studyTime?.total,data?.chartData?.totalTime.total]
        : searchParams === 'classtime' ? [data?.chartData?.classTime?.total,data?.chartData?.totalTime?.total]
          : [ data?.chartData?.freeTime?.total,data?.chartData?.totalTime?.total] 
  }
  const centerTitle = searchParams === 'all' ? 'Total' : searchParams === 'studytime' ? 'Study' : searchParams === 'classtime' ? 'Class' : 'Free';

  const useStyles = makeStyles({
    middle: {
      margin: windowWidth > 767 ? 10 : 20,
      width: windowWidth > 767 ? 1 : '90%',
      height: windowWidth > 767 ? '' : 1,
    },
    middle2: {
      margin: windowWidth > 767 ? 10 : 20,
      width: windowWidth > 1023 ? 1 :windowWidth > 767?(searchParams === 'all'||searchParams === 'freetime')? '90%':1:'90%',
      height: windowWidth > 1023 ? 350 : windowWidth > 767 ? (searchParams === 'all' || searchParams === 'freetime')? 1:350:1
    }

  });
  const classes = useStyles();

  const state = {
    labels: [...(searchParams === 'all' ? ['Class', 'Study', 'Free-time']
      : searchParams === 'studytime' ? ['Study','Total']
      : searchParams === 'freetime'?['Free-time','Total']:['Class','Total'])],
    datasets: [
      {
        backgroundColor: [...(searchParams==='all'?[
          '#2D82FE',
          '#2FED51',
          '#FF9E57'] : searchParams === 'studytime' ? [ '#FF9E57','#8D8D8D']
            : searchParams === 'freetime'?[ '#2FED51','#8D8D8D']:['#2D82FE','#8D8D8D'])
        ],
        rotation: 70,
        hoverOffset: 2,
        data: getChartData()
      }
    ]
  }
  return (
    <div className="relative w-full h-full flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-start content-start items-center pt-5 pb-10 ">
      <div className="box-border content-center items-center flex flex-col overflow-x-auto  md:max-w-9/20 lg:max-w-3/10" style={{ ...(windowWidth > 340 ? { minWidth: '300px' } : {}) }}>
        <div className="text-center text-black text-lg font-medium -mb-3 ">
          {searchParams === 'all' ? 'All Screen Time' : searchParams === 'studytime' ? 'Study Time' : searchParams === 'classtime' ? 'Class Time' : 'Free Time'}
        </div>
          <DoughnutChart filter={searchParams} data={state} centerTitle={centerTitle} />
        <div className="flex flex-row w-20 h-full items-center mr-auto resize-x  pl-1 ">
          {getChartData().map((el, i) => (
            <p className={(getChartData().length === 3 ? 'space-x-8 ml-8 ' : ' space-x-12 ml-14 ') + " block flex-shrink-0 font-semibold"}>{timeConvert(el)}</p>))}
          </div>
      </div>
      {(searchParams === 'all' || searchParams === 'freetime') &&
      <> <Divider classes={{
        middle: classes.middle
      }} classKey="middle" variant={'middle'} orientation={windowWidth>767?'vertical':'horizontal'} flexItem/>
       <div className="w-full mx-auto flex flex-col justify-center content-center md:max-w-9/20 lg:max-w-3/10 h-full px-2 ">
        <div className="">
          <h2 className="text-center text-black text-lg font-medium  mt-3 lg:mt-0  mb-10 md:mb-16 ">Free-time Usage</h2>
          <div className="flex flex-row flex-nowrap w-full justify-around content-center mb-3">
            <div className="flex flex-col mx-auto text-center">
              <div className="font-medium">Used</div>
              <div className="text-lg font-bold " style={{
                color: '#0C8722'
              }}>{`${data?.chartData?.freeTime?.total}m`}</div>
            </div>
            <div className="flex flex-col mx-auto text-center">
              <div className="font-medium">Max</div>
              <div className="text-lg font-bold">{timeConvert(data?.freeTimeMaxUsage)}</div>
            </div>
            </div>
            <div className="max-w-full lg:max-w-11/12 ">
              <BorderLinearProgress variant="determinate" value={parseInt(data?.chartData?.freeTime?.total) / parseInt(data?.freeTimeMaxUsage) * 100} />
              </div>
            <div className="bg-white ml-auto rounded w-22 h-8 md:h-auto flex mt-8 w-max">
            <Button variant="outlined" color="primary" size={windowWidth < 768 ? 'small' : 'large'}>
              <span className="capitalize block text-xs md:text-base bg-white flex-shrink-0 ">Extend Free-time</span>
            </Button>
          </div>
          <div className="text-xs w-max text-right ml-auto self-end mt-20" style={{ color: '#2B73DE' }}>Change Time Restrictions</div>
          </div>
        </div>
        </>
      }
    <Divider classes={{
        middle: classes.middle2
      }} classKey="middle" variant={'middle'} orientation={windowWidth > 1024 ?'vertical' : 'horizontal'}  />
      <div className="w-full flex-none flex flex-col justify-center content-start md:max-w-9/20 lg:max-w-3/10 h-full px-2">
        <h2 className="text-center text-black text-lg font-medium lg:mt-0  mb-10 self-start mx-auto
         ">By Devices</h2>
        <div className="flex flex-col flex-nowrap w-full justify-around content-center mb-3 space-y-8 ">
          <div className="flex flex-row space-x-4 mx-auto"><img className="block w-10 h-16" src={imgMb} alt="mobileImg" />
            <div className="flex flex-col"><p>Adi’s Phone</p>
              <p className="font-normal text-lg font-thin" style={{ color: '#3D7FE0' }}>
                {timeConvert(searchParams === 'all' ? data?.deviceUsage?.totalTime?.mobile
                : searchParams === 'classtime' ? data?.deviceUsage?.classTime?.mobile
                : searchParams === 'studytime'?data?.deviceUsage?.studyTime?.mobile:data?.deviceUsage?.freeTime?.mobile)}</p>
              </div>
              </div>
          <div className="flex flex-row space-x-4 mx-auto mb-20">
            <img className="block w-36 h-22" src={imgLaptop} alt="mobileImg" />
            <div className="flex flex-col">
              <p>Adi’s Laptop</p>
              <p className="font-normal text-lg font-thin" style={{ color: '#3D7FE0' }}> {timeConvert(searchParams === 'all' ? data?.deviceUsage?.totalTime?.laptop
                : searchParams === 'classtime' ? data?.deviceUsage?.classTime?.laptop
                : searchParams === 'studytime'?data?.deviceUsage?.studyTime?.laptop:data?.deviceUsage?.freeTime?.laptop)}
              </p></div>
              </div>
        </div>
        <div className="text-xs w-max text-right ml-auto self-end mt-16 " style={{color:'#2B73DE'}}>See All Devices</div>
      </div>
    </div>
  )
}

export default CommonScreen
