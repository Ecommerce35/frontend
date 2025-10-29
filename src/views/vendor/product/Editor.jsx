import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Typography } from '@mui/material';



const Editor = ({ label, value, onChange, placeholder }) => {
  return (
    <Box sx={{ my: 2 }}>
      {label && (
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>
      )}
      <CKEditor
        editor={ClassicEditor}
        data={value || ''}
        config={{
          placeholder: placeholder || 'Write something...',
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
          ],
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </Box>
  );
};

export default Editor;
