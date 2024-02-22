'use client'
import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import api from '../components/Config';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

export default function ContactInfoTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Contact[]>([]); 

  // const [rows, setRows] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [openAddModal, setAddopenModal] = React.useState(false);

  const [selectedRow, setSelectedRow] = React.useState<Contact | null>(null);
  const [newContact, setNewContact] = React.useState({
    name: '',
    email: '',
    phone_number: '',
    address: ''
  });
  React.useEffect(() => {
    api.get('http://127.0.0.1:8000/api/contact/contact_info/')
      .then(response => {
        setRows(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // const handleAddNewContact = () => {
  //   api.post('contact/contact_info/', newContact)
  //     .then(response => {
  //       setRows([...rows, response.data]);
  //       handleAddCloseModal();
  //     })
  //     .catch(error => {
  //       console.error('Error adding new contact:', error);
  //       alert('Please ensure that you have been logged or you have duplicated items.');

  //     });
  // };
  const handleAddNewContact = () => {
    api.post('contact/contact_info/', newContact)
      .then(response => {
        if (response.data) {
          setRows(prevRows => [...prevRows, response.data]); 
          handleAddCloseModal();
        } else {
          console.error('Error adding new contact: response data is null or undefined');
          alert('Failed to add new contact. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error adding new contact:', error);
        alert('Failed to add new contact. Please try again later.');
      });
  };
  

const handleEdit = (row: Contact | null) => { 
  if (row) {
    setSelectedRow(row);
    setNewContact({
      name: row.name,
      email: row.email,
      phone_number: row.phone_number,
      address: row.address
    });
    setOpenModal(true);
  } else {
    setSelectedRow(null); 
  }
};


const handleEditContact = () => {
  if (!selectedRow) {
    console.error('No row selected for editing');
    return;
  }

  api.patch(`http://127.0.0.1:8000/api/contact/contact_info/${selectedRow.id}/`, newContact)
    .then(response => {
      setRows(prevRows => {
        const updatedRows = prevRows.map(row => {
          if (row.id === selectedRow.id) {
            return { ...row, ...newContact };
          }
          return row;
        });
        return updatedRows;
      });
      handleCloseModal();
    })
    .catch(error => {
      console.error('Error updating contact:', error);
    });
};

const handleDelete = (row: Contact) => {
  api.delete(`http://127.0.0.1:8000/api/contact/contact_info/${row.id}/`)
    .then(response => {
      setRows(prevRows => prevRows.filter(item => item.id !== row.id));
      handleCloseModal();
    })
    .catch(error => {
      console.error('Error deleting row:', error);
    });
};


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAddContact = () => {
    setAddopenModal(true);

  };
  const handleAddCloseModal = () => {
    setAddopenModal(false);
  };

  return (
    <div style={{  justifyContent: 'center', alignItems: 'center', marginTop:"20px" }}>


      <Paper sx={{ width: '70%',margin:"auto"}}>
        <h3>All contacts</h3>
        <Button variant="contained" color="primary" onClick={handleAddContact}>
        Add Contact
      </Button>
        <TableContainer sx={{ maxHeight: 440 }}>
          
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="center" colSpan={2}>{row.name}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone_number}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => handleEdit(row)}>Edit</Button>
                        <Button onClick={() => handleDelete(row)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>


      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedRow ? "Edit" : "Add"} Contact</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Name"
              type="text"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              type="text"
              value={newContact.phone_number}
              onChange={(e) => setNewContact({ ...newContact, phone_number: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              type="text"
              value={newContact.address}
              onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          {selectedRow ? (
            <Button onClick={() => handleEditContact(selectedRow)}>Update</Button>
          ) : (
            <Button onClick={handleAddNewContact}>Add</Button>
          )}
        </DialogActions>
      </Dialog>







      <Dialog open={openAddModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          />
          <TextField
            margin="dense"
            id="phone_number"
            label="Phone Number"
            fullWidth
            value={newContact.phone_number}
            onChange={(e) => setNewContact({ ...newContact, phone_number: e.target.value })}
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            fullWidth
            value={newContact.address}
            onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCloseModal}>Cancel</Button>
          <Button onClick={handleAddNewContact} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
