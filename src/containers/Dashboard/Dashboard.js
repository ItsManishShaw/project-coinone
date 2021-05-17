import React, { Suspense, useEffect, useState } from "react";
import Axios from 'axios';
import { Router, Location } from "@reach/router";
import AppBar from '../../components/AppBar/AppBar'
import DropDownFilter from '../../components/DropDownFilter/DropDownFilter'
import CommonScreen from '../../components/CommonScreen/CommonScreen'
import { navigate } from "@reach/router"
import useWindowResize from '../../hooks/useWindowResize';
import './Dashboard.css'

const axiosConfig = {
  baseURL: 'https://api.mocklets.com/mock68182/',
  timeout: 3600 * 5000,
};
export const coinOneAPI = Axios.create(axiosConfig);
const NotFound = () => (
  <div>Sorry, nothing here.</div>
);

const Dashboard = () => {
  const [windowWidth, windowHeight] = useWindowResize();
  const [filter, setFilter] = useState('All');
  const [data, setData] = useState([]);

  useEffect(() => {
    coinOneAPI.get(`/screentime`,)
      .then(response => {
      setData(response?.data[0]);
    });
  }, [])
  useEffect(() => {
    switch (filter) {
      case 'All': navigate('/summary?filter=all');
        break;
        case 'Class-time only': navigate('/summary?filter=classtime');
          break;
        case 'Study-time only': navigate('/summary?filter=studytime');
        break;
        case 'Free-time only': navigate('/summary?filter=freetime');
        break;
      default:navigate('/summary?filter=all');
  }
  }, [filter])
  return (
    <>
      <div className="min-h-screen w-full max-w-full" style={{
        backgroundColor:'#fdefdd'
      }}>
        <AppBar />
        <div className="mx-5 md:mx-10 lg:mx-20 px-1 pt-10 min-w-xs ">
          <h1 className="text-lg font-medium font-semibold">Activities Summary </h1>
          <DropDownFilter filter={filter} setFilter={setFilter}/>
          <div className="bg-white w-full mt-4 h-full px-2 " style={{
            ...((filter !== 'All' && filter !== 'Free-time only')&&windowWidth>768 ?
              { maxWidth: '70%' } : {})
          }
          }>
          <Location>
            {({ location }) => (
                      <>
                            <Suspense fallback={'Loading...'}>
                              <Router
                                location={location}
                                path="/"
                                className="w-full"
                              >
                                <CommonScreen
                                  data={data}
                                  path="/summary"
                                />
                                <NotFound default />
                              </Router>
                </Suspense>
                </>
                    )}
                  </Location>
          </div>
          </div>
        </div>
    </>
  )
}

export default Dashboard
