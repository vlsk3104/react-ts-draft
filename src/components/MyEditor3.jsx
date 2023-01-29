/* eslint-disable jsx-a11y/alt-text */
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
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import '@draft-js-plugins/image/lib/plugin.css';
import createLinkifyPlugin from '@draft-js-plugins/linkify';


const MyEditor3 = () => {
  const [plugins, InlineToolbar, LinkButton] = useMemo(() => {
    const linkPlugin = createLinkPlugin({ placeholder: 'https://...' });
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const linkifyPlugin = createLinkifyPlugin();
    return [
      [inlineToolbarPlugin, linkPlugin, linkifyPlugin],
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
    console.log('raw', raw);
    localStorage.setItem('test', JSON.stringify(raw, null, 2));
  };

  const onChange = (value) => {
    console.log({value})
    setEditorState(value);
  };

  const handleDroppedFiles = (selection, files) => {
    console.log(files);
    //サーバに保存する処理　画像のURLが戻される
    insertImage('logo192.png');
  };

  const insertImage = (url) => {
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

  const handleFile = (e) => {
    console.log(e.target.files);
    //サーバに保存する処理　画像のURLが戻される
    insertImage('logo512.png');
  };

  const blockRenderer = (contentBlock, _ref) => {
    const getEditorState = _ref.getEditorState;
    if (contentBlock.getType() === 'atomic') {
      const contentState = getEditorState().getCurrentContent();
      const entity = contentBlock.getEntityAt(0);
      if (!entity) return null;
      const type = contentState.getEntity(entity).getType();
      if (type === 'image' || type === 'IMAGE') {
        return {
          component: ImageComponent,
          editable: false,
        };
      }
    }
    return null;
  };

  const ImageComponent = ({ block, contentState }) => {
   //srcを取得するための処理
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    return <img src={data.src} alt={data.src} />;
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
        blockRendererFn={blockRenderer}
      />
      <InlineToolbar>
      {(externalProps) => (
          <>
            <ItalicButton {...externalProps} />
            <BoldButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            {/* @ts-ignore */}
            {/* <Separator {...externalProps} /> */}
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

export default MyEditor3
