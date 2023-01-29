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
import {
  AtomicBlockUtils,
  EditorState,
  SelectionState,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import createImagePlugin from '@draft-js-plugins/image';
import '@draft-js-plugins/image/lib/plugin.css';
import createLinkifyPlugin from '@draft-js-plugins/linkify';


const MyEditor2 = () => {
  const [plugins, InlineToolbar, LinkButton] = useMemo(() => {
    const linkPlugin = createLinkPlugin({ placeholder: 'https://...' });
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const imagePlugin = createImagePlugin();
    const linkifyPlugin = createLinkifyPlugin();
    return [
      [inlineToolbarPlugin, linkPlugin, imagePlugin, linkifyPlugin],
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

  const handleDroppedFiles = (selection: SelectionState, files: Blob[]): any => {
    console.log(files);
    //サーバに保存する処理　画像のURLが戻される
    insertImage('logo192.png');
  };

  const insertImage = (url: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    onChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    );
  };

  const handleFile = (e: { target: { files: any; }; }) => {
    console.log(e.target.files);
    //サーバに保存する処理　画像のURLが戻される
    insertImage('logo512.png');
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
        <input type="file" onChange={handleFile} />
      </div>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        readOnly={readonly}
        handleDroppedFiles={handleDroppedFiles}
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
