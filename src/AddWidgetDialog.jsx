import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const AddWidgetDialog = ({ open, onClose, onAddWidget }) => {
    const [widgetName, setWidgetName] = useState('');
    const [widgetText, setWidgetText] = useState('');

    const handleAddWidget = () => {
        onAddWidget({ id: Date.now().toString(), name: widgetName, text: widgetText });
        setWidgetName('');
        setWidgetText('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Widget</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Widget Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={widgetName}
                    onChange={(e) => setWidgetName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Widget Text"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={widgetText}
                    onChange={(e) => setWidgetText(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddWidget}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddWidgetDialog;
