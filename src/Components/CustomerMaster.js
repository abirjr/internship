import React, { useState } from 'react';

const CustomerMaster = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerMobile, setNewCustomerMobile] = useState('');
  const [newCustomerLocation, setNewCustomerLocation] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddCustomer = () => {
    if (!newCustomerName || !newCustomerEmail) return;

    if (editMode) {
      const updatedCustomers = customers.map((customer) => {
        if (customer.id === editCustomerId) {
          return {
            ...customer,
            name: newCustomerName,
            email: newCustomerEmail,
            mobile: newCustomerMobile,
            location: newCustomerLocation
          };
        }
        return customer;
      });
      setCustomers(updatedCustomers);
      setEditMode(false);
      setEditCustomerId(null);
    } else {
      const newCustomer = {
        id: Date.now(),
        name: newCustomerName,
        email: newCustomerEmail,
        mobile: newCustomerMobile,
        location: newCustomerLocation
      };
      setCustomers([...customers, newCustomer]);
    }

    setNewCustomerName('');
    setNewCustomerEmail('');
    setNewCustomerMobile('');
    setNewCustomerLocation('');
  };

  const handleEditCustomer = (customerId) => {
    const customerToEdit = customers.find((customer) => customer.id === customerId);
    if (customerToEdit) {
      setNewCustomerName(customerToEdit.name);
      setNewCustomerEmail(customerToEdit.email);
      setNewCustomerMobile(customerToEdit.mobile);
      setNewCustomerLocation(customerToEdit.location);
      setEditMode(true);
      setEditCustomerId(customerId);
    }
  };

  const handleDeleteCustomer = (customerId) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    setCustomers(updatedCustomers);
  };

  const handleSaveChanges = () => {
    handleAddCustomer();
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditCustomerId(null);
    setNewCustomerName('');
    setNewCustomerEmail('');
    setNewCustomerMobile('');
    setNewCustomerLocation('');
  };

  const handleSearch = () => {
    // Filter customers based on search query
    // For simplicity, we'll filter by customer name only
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredCustomers;
  };

  return (
    <div>
      <h1>Customer Master</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newCustomerName}
          onChange={(e) => setNewCustomerName(e.target.value)}
        /><br></br>
        <input
          type="email"
          placeholder="Email"
          value={newCustomerEmail}
          onChange={(e) => setNewCustomerEmail(e.target.value)}
        /><br></br>
        <input
          type="text"
          placeholder="Mobile"
          value={newCustomerMobile}
          onChange={(e) => setNewCustomerMobile(e.target.value)}
        /><br></br>
        <input
          type="text"
          placeholder="Location"
          value={newCustomerLocation}
          onChange={(e) => setNewCustomerLocation(e.target.value)}
        /><br></br>
        {editMode ?
          <button onClick={handleSaveChanges}>Save Changes</button> :
          <button onClick={handleAddCustomer}>Add Customer</button>}
        <button onClick={cancelEdit}>Cancel</button>
      </div>
      <div>
        <h2>Search:</h2>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <h2>Customers:</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {handleSearch().map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.mobile}</td>
                <td>{customer.location}</td>
                <td>
                  <button onClick={() => handleEditCustomer(customer.id)}>Edit</button>
                  <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerMaster;
