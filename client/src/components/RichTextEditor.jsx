// import React, { useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';

// const RichTextEditor = ({ input, setInput }) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: input.description || '',
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       setInput({ ...input, description: html });
//     },
//   });

//   // Optional: update content if `input.description` changes from outside
//   useEffect(() => {
//     if (editor && input.description !== editor.getHTML()) {
//       editor.commands.setContent(input.description || '');
//     }
//   }, [input.description, editor]);

//   return (
//     <div className="border rounded-md p-2 min-h-[200px]">
//       <EditorContent editor={editor} />
//     </div>
//   );
// }

// export default RichTextEditor;

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({input, setInput}) => {

    const handleChange = (content) => {
        setInput({...input, description:content});
    }
   
  return <ReactQuill theme="snow" value={input.description} onChange={handleChange} />;
}
export default RichTextEditor