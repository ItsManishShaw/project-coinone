import React, { Suspense, useEffect, useState } from "react";
import Axios from 'axios';
import { Router, Link, Location } from "@reach/router";
import AppBar from '../../components/AppBar/AppBar'
import DropDownFilter from '../../components/DropDownFilter/DropDownFilter'
import CommonScreen from '../../components/CommonScreen/CommonScreen'
import { navigate } from "@reach/router"


const axiosConfig = {
  baseURL: 'https://api.mocklets.com/mock68182/',
  timeout: 3600 * 5000,
};
export const coinOneAPI = Axios.create(axiosConfig);
const NotFound = () => (
  <div>Sorry, nothing here.</div>
);

const Dashboard = () => {
  const [filter, setFilter] = useState('All');
  const [data, setData] = useState([]);

  useEffect(() => {
    coinOneAPI.get(`/screentime`,)
      .then(response => {
        console.log({response})
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
      <div className="min-h-screen w-full" style={{
        backgroundColor:'#fdefdd'
      }}>
        <AppBar />
        <div className="mx-5 md:mx-10 lg:mx-20 px-1 pt-10">
          <h1 className="text-lg font-medium font-semibold">Activities Summary </h1>
          <DropDownFilter filter={filter} setFilter={setFilter}/>
          <div className="bg-white w-full  mt-4 h-full ">
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
                                  exact
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
