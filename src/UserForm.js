import React, { useContext, useState ,useEffect} from 'react';
import { UserContext } from './UserContext/UserContext';
import styles from './UserForm.module.css';


const UserForm = ({ user }) => {
  const { dispatch } = useContext(UserContext);
  const [name, setName] = useState(user ? user.name : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [dob, setDob] = useState(user ? user.dob : '');
  const [age, setAge] = useState(user ? calculateAge(user.dob) : '');

  useEffect(() => {
    if (dob) {
      setAge(calculateAge(dob));
    }
  }, [dob]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      dispatch({
        type: 'UPDATE_USER',
        payload: { id: user.id, name, phone, email, dob, age },
      });
    } else {
      const id = Math.floor(Math.random() * 100000);

      dispatch({
        type: 'ADD_USER',
        payload: { id, name, phone, email, dob, age },
      });
    }

    setName('');
    setPhone('');
    setEmail('');
    setDob('');
    setAge('');
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <form className={styles['form-container']} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        maxLength={10}
        pattern="\d{10}"
        title="Please enter a valid 10-digit phone number"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        title="Please enter a valid email address"
        required
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => {
          setDob(e.target.value);
          setAge(calculateAge(e.target.value));
        }}
        required
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <button type="submit">{user ? 'Update User' : 'Add User'}</button>
    </form>
  );
};

export default UserForm;