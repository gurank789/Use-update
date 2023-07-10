import React, { useState } from 'react';
import styles from './UserDetailsPopup.module.css'; // Import the CSS module

const UserDetailsPopup = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [dob, setDob] = useState(user.dob);
  const [age, setAge] = useState(user.age);

  const handleSave = () => {
    const updatedUser = {
      id: user.id,
      name,
      phone,
      email,
      dob,
      age,
    };
    onSave(updatedUser);
    onClose();
  };

  return (
    <div className={styles['popup-overlay']}>
      <div className={styles['popup-content']}>
        <h2>User Details</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UserDetailsPopup;