import React from 'react';
import AllQuizzes from './AllQuizzes';
import SideMenu from './Sidebar';
import "./Dashboard.css";
import Navbar from './Navbar';
import background from "../assets/green_back.avif";
import { useState } from 'react';


const Dashboard = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      <Navbar search={search} setSearch={setSearch}/>
      <div className="verticalAlign">
        <div className="sidebar" style={{boxShadow: '1px 2px 9px #9E9E9E'}}>
          <SideMenu />
        </div>
        <div className="allQuizzes"  style={{backgroundImage: `url(${background})`}}>
          <AllQuizzes search={search}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
