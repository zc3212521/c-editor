import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'

// import TopicList from '../views/topicList/index'
// import TopicDetail from '../views/topicDetail/index'
import imaDrop from '../views/imaDrop/index'

export default () => [
    <Route path="/" component={imaDrop} key="detail"/>
]