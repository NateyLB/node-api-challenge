import React from 'react';
import { Route, Link } from "react-router-dom";
import Projects from './components/projects.js';
import Actions from './components/actions.js';
import './App.css';

function App() {
  return (
    <div>
      <nav>
        <Link to={'/'}>
          HOME
        </Link>
      </nav>
      <Route exact path='/' >
      <Projects/>
      </Route>
      <Route path='/project/:id'>
        <Actions/>
      </Route>
    </div>
  );
}

export default App;
