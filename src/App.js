import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  withRouter,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<News key='general' country='in' category='general' />}></Route>
            <Route path='/business' element={<News key='business' country='in' category='business' />}></Route>
            <Route path='/entertainment' element={<News key='entertainment' country='in' category='entertainment' />}></Route>
            <Route path='/health' element={<News key='health' country='in' category='health' />}></Route>
            <Route path='/science' element={<News key='science' country='in' category='science' />}></Route>
            <Route path='/sports' element={<News key='sports' country='in' category='sports' />}></Route>
            <Route path='/technology' element={<News key='technology' pageSize={12} country='in' category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
