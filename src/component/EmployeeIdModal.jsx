import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EmployeeIdModal = ({ isOpen, onClose, onSubmit }) => {
  const [empId, setEmpId] = useState('');

  const empIdRegex = /^[A][0-9]{4}$/;

  const handleSubmit = () => {
    if (empIdRegex.test(empId)) {
      onSubmit(empId);
      onClose();
      setEmpId('');
    } else {
      if (empId.length !== 5) {
        if (empId.length === 0) {
          alert('Please enter Employee ID');
        } else {
          alert('Employee ID must be exactly 5 characters long.');
        }
      } else if (!empId.startsWith('A')) {
        alert('The first character must be "A".');
      } else if (!/^[0-9]{4}$/.test(empId.slice(1))) {
        alert('The last 4 characters must be digits.');
      } else {
        alert('Please enter an Employee ID that starts with "A" followed by 4 digits (e.g., A1234).');
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Enter Your 5-Character Employee ID</DialogTitle>
      <DialogContent>
        <TextField
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          maxLength="5"
          fullWidth
          label="Employee ID (Eg: A1234)"
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">Ok</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeIdModal;
