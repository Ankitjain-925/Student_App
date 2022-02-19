import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from '../components/header/index.js'
import Loader from '../components/loader/index.js'

function Routermain() {
  return (
    <div>

      <BrowserRouter>

        <li>
          <Link to="/student_data">Student data</Link>
        </li>
        <li>
          <Link to="/loader">Templates</Link>
        </li>
        <Routes>
          <Route path="/student_data" element={<Header />} />
          <Route path="/loader" element={<Loader />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default Routermain;