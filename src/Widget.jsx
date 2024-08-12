import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Widget = ({ widget, onRemove }) => {
  return (
    <Card variant="outlined" style={{ margin: '8px 0' }}>
      <CardContent>
        <Typography variant="h6">{widget.name}</Typography>
        <Typography>{widget.text}</Typography>
        <IconButton style={{ float: 'right' }} onClick={onRemove}>
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default Widget;
