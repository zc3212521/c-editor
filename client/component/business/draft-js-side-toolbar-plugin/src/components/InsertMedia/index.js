import React from 'react';
import { Button } from 'antd';

import Img from './addImg';
import Video from './addVideo';
import Audio from './addAudio';
// import WhatmarkImg from './addWatermarkImg'

import MediaTypeSelect from './MediaTypeSelect';

let structure = [Img,
    // WhatmarkImg,
    Video, Audio]

const InsertMedia = ({ getEditorState, setEditorState, setReadOnly, theme, modifier, uploadProps, receiveUpFileType }) => {
    return (
        <MediaTypeSelect
            getEditorState={getEditorState}
            setEditorState={setEditorState}
            setReadOnly={setReadOnly}
            theme={theme}
            structure={structure}
            modifier={modifier}
            uploadProps={uploadProps}
            receiveUpFileType={receiveUpFileType}
        />
    )
};

export default InsertMedia;
