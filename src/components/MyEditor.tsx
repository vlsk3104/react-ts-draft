import { useState } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log(raw);
  };

  return (
    <div>
      <div>
        <button onClick={saveContent}>保存</button>
      </div>
      <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder="ここから入力を行ってください。"
    />
    </div>
  );
}
export default MyEditor;
