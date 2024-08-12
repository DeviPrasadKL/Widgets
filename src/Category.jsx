import React from 'react';
import { Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Widget from './Widget';

const Category = ({ category, onAddWidget, onRemoveWidget }) => {
  return (
    <Card variant="outlined" style={{ margin: '16px 0' }}>
      <CardContent>
        <Typography variant="h6">{category.name}</Typography>
        {category.widgets.length > 0 ? (
          category.widgets.map(widget => (
            <Widget 
              key={widget.id} 
              widget={widget} 
              onRemove={() => onRemoveWidget(category.id, widget.id)}
            />
          ))
        ) : (
          <Typography>No widgets available</Typography>
        )}
        <Button variant="contained" color="primary" onClick={onAddWidget}>
          Add Widget
        </Button>
      </CardContent>
    </Card>
  );
};

export default Category;
