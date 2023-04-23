import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './app.module.css';
import { addContact, deleteContact, setFilter } from '../app/contactSlice';

function App() {
  const filter = useSelector(state => state.contacts.filter);
  const items = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    const id = nanoid();
    dispatch(addContact({ id, name, number }));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    dispatch(setFilter(value));
  };

  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
}

export default App;