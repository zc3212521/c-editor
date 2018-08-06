import React from 'react';
import { Button } from 'antd';

import Img from './addImg';
import Video from './addVideo';
import Audio from './addAudio';
import WhatmarkImg from './addWatermarkImg'

import MediaTypeSelect from './MediaTypeSelect';

const InsertMedia = ({ getEditorState, setEditorState, theme, modifier }) => (
    <MediaTypeSelect
        getEditorState={getEditorState}
        setEditorState={setEditorState}
        theme={theme}
        structure={[Img, WhatmarkImg, Video, Audio]}
        modifier={modifier}
    />
);

export default InsertMedia;
