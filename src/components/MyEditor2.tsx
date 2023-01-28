import React, { useEffect, useMemo, useState } from 'react'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

const text = 'In this editor a toolbar shows up once you select part of the text …';

const MyEditor2 = () => {
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, [])

  const [editorState, setEditorState] = useState(() =>
    createEditorStateWithText('')
  );

  useEffect(() => {
    setEditorState(createEditorStateWithText(text));
  }, []);

  const onChange = (value: any) => {
    setEditorState(value);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
      />
      <InlineToolbar />
    </div>
  )
}

export default MyEditor2
