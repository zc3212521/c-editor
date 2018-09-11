import decorateComponentWithProps from 'decorate-component-with-props';
import addImage from './modifiers/addImage';
import removeImg from './modifiers/removeImage';
import ImageComponent from '../../../decorators/img';
import VideoComponent from './Video';
import AudioComponent from './Audio';
import imageStyles from './imageStyles.css';

const defaultTheme = {
  image: imageStyles.image,
};

export default (config = {}) => {
  const theme = config.theme ? config.theme : defaultTheme; // 这里的theme指要给img添加的类名,添加报错
  let Image = config.imageComponent || ImageComponent;
  let Video = config.VideoComponent || VideoComponent;
  let Audio = config.AudioComponent || AudioComponent;
  if (config.decorator) {
    Image = config.decorator(Image);
  }
  const ThemedImage = decorateComponentWithProps(Image, { theme });
  const ThemedAudio = decorateComponentWithProps(Audio, { theme });
  const ThemedVideo = decorateComponentWithProps(Video, { theme });
  return {
    blockRendererFn: (block, { getEditorState, setEditorState }) => {
      if (block.getType() === 'atomic') {
        const editorState = getEditorState()
        const contentState = editorState.getCurrentContent();
        const entity = block.getEntityAt(0);
        if (!entity) return null;
        const type = contentState.getEntity(entity).getType();
        if (type === 'image') {
          return {
            component: ThemedImage,
            editable: false,
              props: {
                  onChangeSize: (blockKey, imgWidth) => {
                      console.log(110, blockKey, imgWidth)
                  },
                  onRemove: (blockKey) => removeImg(blockKey, editorState, setEditorState),
              },
          };
        }
        if(type === 'audio') {
          return {
              component: ThemedAudio,
              editable: false,
          }
        }
        if(type === 'video') {
          return {
            component: ThemedVideo,
              editable: false,
          }
        }
        return null;
      }

      return null;
    },
    addImage,
  };
};

export const Image = ImageComponent;
