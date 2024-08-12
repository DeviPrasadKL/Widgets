import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Category from './Category';
import AddWidgetDialog from './AddWidgetDialog';

const defaultCategories = [
  {
    id: 'c1',
    name: 'CSPM Executive Dashboard',
    widgets: [{ id: 'w1', name: 'Widget 1', text: 'Sample text for Widget 1' }]
  }
];

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [widgetDialog, setWidgetDialog] = useState({ open: false, categoryId: '', widget: null });

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || defaultCategories;
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = () => {
    setCategories([...categories, { id: Date.now().toString(), name: newCategoryName, widgets: [] }]);
    setNewCategoryName('');
    setOpenAddCategoryDialog(false);
  };

  const addWidget = (categoryId, widget) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
      ? { ...cat, widgets: [...cat.widgets, widget] } 
      : cat
    ));
    setWidgetDialog({ open: false, categoryId: '', widget: null });
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
      ? { ...cat, widgets: cat.widgets.filter(widget => widget.id !== widgetId) } 
      : cat
    ));
  };

  const openWidgetDialog = (categoryId) => {
    setWidgetDialog({ open: true, categoryId, widget: { id: '', name: '', text: '' } });
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddCategoryDialog(true)}
      >
        Add Category
      </Button>
      
      {categories.map(category => (
        <Category 
          key={category.id} 
          category={category}
          onAddWidget={() => openWidgetDialog(category.id)}
          onRemoveWidget={removeWidget}
        />
      ))}

      <Dialog open={openAddCategoryDialog} onClose={() => setOpenAddCategoryDialog(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCategoryDialog(false)}>Cancel</Button>
          <Button onClick={addCategory}>Add</Button>
        </DialogActions>
      </Dialog>

      <AddWidgetDialog
        open={widgetDialog.open}
        onClose={() => setWidgetDialog({ open: false, categoryId: '', widget: null })}
        onAddWidget={(widget) => addWidget(widgetDialog.categoryId, widget)}
      />
    </Container>
  );
}

export default Dashboard;
