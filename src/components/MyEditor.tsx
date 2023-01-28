import { useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
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

  const toggleBold = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // 'BOLD', 'ITALIC', 'UNDERLINE', 'CODE'
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div>
      <div>
        <button onClick={saveContent}>保存</button>
        <button onClick={toggleBold}>太字</button>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="ここから入力を行ってください。"
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
}
export default MyEditor;
