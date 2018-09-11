import React from 'react'
import {
    BrowserRouter as Router, Route, Link
} from 'react-router-dom'

import draft from '../views/draft/index'
import imaDrop from '../views/imaDrop/index'

export default () => (
    <Router>
       <div>
           <ul>
               <li>
                   <Link to="/">Home</Link>
               </li>
               <li>
                   <Link to="/draft">draft</Link>
               </li>
           </ul>
           <hr/>
           <Route path="/" component={ draft}  exact/>
           <Route path="/draft" component={imaDrop} />
       </div>
    </Router>
)