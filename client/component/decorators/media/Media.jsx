import React from 'react'
import ImgDec from 'component/decorators/img'

const Media = (props) => {
    console.log(111, props.blockProps)
    const onRemove = props.blockProps.onRemove
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'audio') {
        media = <Audio src={src} />;
    }
    else if (type === 'IMG') {
        media = <ImgDec src={src} remove={onRemove} block={props.block}/>
    }
    else if (type === 'video') {
        media = <Video src={src} />;
    }

    return media;
};

const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
};

const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
};

export default Media


