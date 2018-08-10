import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'

import draft from '../views/draft/index'
import imaDrop from '../views/imaDrop/index'

export default () => [
    <Route path="/" component={ draft} key="detail" exact/>,
    <Route path="/draft" component={imaDrop} key="draft"/>,
]