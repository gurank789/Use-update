import React, { createContext, useEffect, useReducer } from 'react';

const initialState = {
  users: [],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'ADD_USER':
      const newUser = action.payload;
      const updatedUsers = [...state.users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return {
        ...state,
        users: updatedUsers,
      };
    case 'UPDATE_USER':
      const updatedUser = action.payload;
      const updatedUsersList = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsersList));
      return {
        ...state,
        users: updatedUsersList,
      };
    case 'DELETE_USER':
      const deletedUserId = action.payload;
      const filteredUsers = state.users.filter(user => user.id !== deletedUserId);
      localStorage.setItem('users', JSON.stringify(filteredUsers));
      return {
        ...state,
        users: filteredUsers,
      };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      dispatch({ type: 'SET_USERS', payload: JSON.parse(storedUsers) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};