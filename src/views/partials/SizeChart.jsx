import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { useCart } from '../../utils/CartContext';
import AddressModal from '../checkout/AddressModal';
import api from '../../api/api';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ChartContent from './ChartContent';



const SizeChart = ({open, handleClose}) => {
  const [scroll, setScroll] = React.useState('paper');

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const descriptionElement = descriptionElementRef.current;
      if (descriptionElement) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  
  

  return (
    <>
        <React.Fragment>
          {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button> */}
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Size chart</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <ChartContent />
              
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
    </>
  );
};

export default SizeChart;
