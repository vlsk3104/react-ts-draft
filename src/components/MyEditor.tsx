import { useEffect, useState } from 'react';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const raw = localStorage.getItem('test');
    if (raw) {
      const contentState = convertFromRaw(JSON.parse(raw));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    localStorage.setItem('test', JSON.stringify(raw, null, 2));
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
