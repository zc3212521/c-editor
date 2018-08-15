import React from 'react'
import ImgDec from 'component/decorators/img'

export default function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
            props: {
                onChangeSize: (blockKey, newContentState) => {
                    // var {liveTeXEdits} = this.state;
                    // this.setState({
                    //     liveTeXEdits: liveTeXEdits.remove(blockKey),
                    //     editorState:EditorState.createWithContent(newContentState),
                    // });
                },
                onRemove: (blockKey, newContentState) => removeImg(blockKey, newContentState),
            },
        };
    }

    return null;
}

const removeImg = (blockKey, newContentState) => {

}

const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
};

const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
};

const Media = (props) => {
    // console.log(111, props)
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'audio') {
        media = <Audio src={src} />;
    } else if (type === 'IMG') {
        media = <ImgDec src={src} />
    } else if (type === 'video') {
        media = <Video src={src} />;
    }

    return media;
};
