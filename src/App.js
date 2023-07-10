import React from 'react';
import { UserProvider } from './UserContext/UserContext';
import UserForm from './UserForm';
import  UserList  from './UserList';
import './App.css'; 
const App = () => {
  return (
    <UserProvider>
      <div className="container">
        <h1>User Management</h1>
        <UserForm />
        <UserList />
      </div>
    </UserProvider>
  );
};

export default App;