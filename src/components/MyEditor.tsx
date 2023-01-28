import { useEffect, useState } from 'react';
import { Editor, EditorState, KeyBindingUtil, RichUtils, convertFromRaw, convertToRaw, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';

function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { hasCommandModifier } = KeyBindingUtil;
  const myKeyBindingFn = (e: any) => {
    // Mac環境で[Command + S]ボタンをクリックすると保存処理が行われる
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return 'myeditor-save';
    }
    return getDefaultKeyBinding(e);
  };

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
    if (command === 'myeditor-save') {
      saveContent();
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
        keyBindingFn={myKeyBindingFn}
      />
    </div>
  );
}
export default MyEditor;
