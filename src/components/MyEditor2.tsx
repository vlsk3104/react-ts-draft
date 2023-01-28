import { useEffect, useMemo, useState } from 'react'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin, {
  Separator,
} from '@draft-js-plugins/inline-toolbar';
// import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import '../App.css'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from '@draft-js-plugins/buttons';
import createLinkPlugin from '@draft-js-plugins/anchor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';


const MyEditor2 = () => {
  const [plugins, InlineToolbar, LinkButton] = useMemo(() => {
    const linkPlugin = createLinkPlugin({ placeholder: 'https://...' });
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [
      [inlineToolbarPlugin, linkPlugin],
      inlineToolbarPlugin.InlineToolbar,
      linkPlugin.LinkButton,
    ];
  }, [])

  const [editorState, setEditorState] = useState(() =>
    createEditorStateWithText('')
  );

  const [readonly, setReadOnly] = useState(false);

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

  const onChange = (value: any) => {
    setEditorState(value);
  };

  return (
    <div>
      <div>
        {!readonly && <button onClick={saveContent}>保存</button>}
        {readonly ? (
          <button onClick={() => setReadOnly(false)}>Edit</button>
        ) : (
          <button onClick={() => setReadOnly(true)}>ReadOnly</button>
        )}
      </div>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        readOnly={readonly}
      />
      <InlineToolbar>
      {(externalProps) => (
          <>
            <ItalicButton {...externalProps} />
            <BoldButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            {/* @ts-ignore */}
            <Separator {...externalProps} />
            <HeadlineOneButton {...externalProps} />
            <HeadlineTwoButton {...externalProps} />
            <HeadlineThreeButton {...externalProps} />
            {/* @ts-ignore */}
            <LinkButton {...externalProps} />
          </>
        )}
      </InlineToolbar>
    </div>
  )
}

export default MyEditor2
