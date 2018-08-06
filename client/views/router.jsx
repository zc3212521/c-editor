import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'

import draft from '../views/draft/index'
import imaDrop from '../views/imaDrop/index'

export default () => [
    <Route path="/" component={imaDrop} key="detail" exact/>,
    <Route path="/draft" component={draft} key="draft"/>,
]