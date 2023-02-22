import { ContactsForm } from 'components/ContactsForm/ContactForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter';
import { AppBox, MainTitle, SubTitle } from './App.styled';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storageArray = JSON.parse(localStorage.getItem('contacts'));
    if (storageArray) {
      return [...storageArray];
    } else {
      return [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ];
    }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addsNameContacts = value => {
    const verifyContact = contacts.some(contact => {
      return contact.name.toLowerCase() === value.name.toLowerCase();
    });
    if (verifyContact) {
      alert(`${value.name} is already in contacts`);
    } else {
      setContacts(prevState => {
        return [
          ...prevState,
          { id: nanoid(), name: value.name, number: value.number },
        ];
      });
    }
  };

  const handleChange = evt => {
    setFilter(evt.target.value);
  };

  const deleteContacts = ev => {
    const value = ev.target.previousSibling.textContent;
    const filtredArray = contacts.filter(contact => {
      return contact.number !== value;
    });
    setContacts([...filtredArray]);
  };

  const contactsFilter = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter);
  });

  return (
    <AppBox>
      <MainTitle>Phonebook</MainTitle>
      <ContactsForm addsContacts={addsNameContacts} />
      <SubTitle>Contacts</SubTitle>
      <Filter filterValue={filter} handleChange={handleChange} />
      <ContactsList contacts={contactsFilter} deleteContact={deleteContacts} />
    </AppBox>
  );
};
