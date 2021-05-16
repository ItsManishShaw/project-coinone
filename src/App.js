import React, { Suspense, useEffect, useState } from "react";
import { Router, Link, Location } from "@reach/router";
import './App.css';
import Dashboard from './containers/Dashboard/Dashboard'
function App() {
  return (
    <div className="App box-border ">
      <header className="App-header">
      </header>
      <Dashboard/>
    </div>
  );
}

export default App;
