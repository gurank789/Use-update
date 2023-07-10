import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext/UserContext';
import UserDetailsPopup from './UserDetailsPopup';
import styles from './UserList.module.css'; // Import the CSS module

const UserList = () => {
  const { state, dispatch } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = (id) => {
    dispatch({
      type: 'DELETE_USER',
      payload: id,
    });
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
  };

  const closeUserDetails = () => {
    setSelectedUser(null);
  };

  const updateUser = (updatedUser) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: updatedUser,
    });
  };

  return (
    <>
      <ul className={styles['user-list']}>
        {state.users.map((user) => (
          <li key={user.id} onClick={() => openUserDetails(user)}>
            <span>{user.name}</span>
            <span>{user.tech}</span>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <UserDetailsPopup
          user={selectedUser}
          onClose={closeUserDetails}
          onSave={updateUser}
        />
      )}
    </>
  );
};

export default UserList;