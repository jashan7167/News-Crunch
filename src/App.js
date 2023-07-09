import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import React, { Component,useState } from 'react';
import {BrowserRouter as Router,Routes,Route,Link,useRouteMatch,withRouter,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress,setProgress1] = useState(0)
  const setProgress=(progress)=> //use arrow function to sort of make a method to the class so we  can use the this pointer
  {
    setProgress1(progress)
  }
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={progress}
        />


          <Routes>
            <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} key='general' country='in' category='general' />}></Route>
            <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key='business' country='in' category='business' />}></Route>
            <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' country='in' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key='health' country='in' category='health' />}></Route>
            <Route path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key='science' country='in' category='science' />}></Route>
            <Route path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key='sports' country='in' category='sports' />}></Route>
            <Route path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key='technology'  country='in' category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }

  export default App
