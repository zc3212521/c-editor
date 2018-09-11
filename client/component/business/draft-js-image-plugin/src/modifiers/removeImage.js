import {EditorState, Modifier, SelectionState} from 'draft-js';

export default(blockKey, editorState, setEditorState) => {
    var content = editorState.getCurrentContent();
    var block = content.getBlockForKey(blockKey);

    var targetRange = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: block.getLength(),
    });

    var withoutTeX = Modifier.removeRange(content, targetRange, 'backward');
    var resetBlock = Modifier.setBlockType(
        withoutTeX,
        withoutTeX.getSelectionAfter(),
        'unstyled',
    );

    var newState = EditorState.push(editorState, resetBlock, 'remove-range');
    var newEditorState =  EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
    setEditorState(newEditorState)
}

