import React from 'react'
import {
    BrowserRouter as Router, Route, Link
} from 'react-router-dom'

import editor from './Demo'

export default () => (
    <Router>
       <div>
           <Route path="/" component={ editor }  exact/>
       </div>
    </Router>
)