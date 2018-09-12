import React from 'react'
import {
    BrowserRouter as Router, Route, Link
} from 'react-router-dom'

import imaDrop from '../views/editor/index'

export default () => (
    <Router>
       <div>
           <Route path="/" component={ imaDrop}  exact/>
       </div>
    </Router>
)