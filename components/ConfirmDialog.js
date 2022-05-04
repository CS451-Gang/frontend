import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'
import styling from '../styles/Layout.module.css'
import Controls from './controls/Controls';

export default function ConfirmDialog(props){
    const { confirmDialog, setConfirmDialog} = props;

    return(
        <Dialog open={confirmDialog.isOpen} classes={{paper:styling.dialogWrapper}}>
            <DialogTitle>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Controls.Button
                    text="Cancel"
                    color="primary"
                    size="medium"
                    onClick={()=>setConfirmDialog({...confirmDialog, isOpen: false})}/>
                <Controls.Button
                    text="Confirm"
                    color="primary"
                    size="medium"
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    )
}