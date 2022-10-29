import React from 'react';
import ReactDOM from 'react-dom';
import 'popper.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { HashRouter, Route, Routes, NotFound } from 'react-router-dom';


ReactDOM.render(
  <HashRouter basename="/">
    <Routes>
      <Route exact path="/" element={<App/>}></Route>
      <Route exact path="/:viewType" element={<App/>}></Route>
      <Route exact path="/:viewType/:viewId" element={<App/>}></Route>
    </Routes>
  </HashRouter>
  , document.getElementById('root'));
