import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { AUTH } from '../../lib/auth';
import {
  Container,
  Button,
  TextField,
  Card,
  CardActionArea,
  Box,
  Typography
} from '@mui/material';
import MessageCard from './MessageCard';

export default function MessagingPage({ selectedUser }) {
  const [allMessages, setAllMessages] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const openMessage = () => setIsMessageOpen(true);
  const closeMessage = () => setIsMessageOpen(false);

  const [formData, setFormData] = useState({
    text: ''
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReply = {... formData, receiver: selectedUser}
    API.POST(API.ENDPOINTS.allMessages, newReply, API.getHeaders())
      .then(() => {
        setIsUpdated(!isUpdated);
        closeMessage();
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  useEffect(() => {
    API.GET(API.ENDPOINTS.allMessages, API.getHeaders())
      .then(({ data }) => {
        setAllMessages(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsUpdated(false);
  }, [isUpdated]);

  const UserID = parseInt(AUTH.getUser());

  const messagesFromSelectedUser = allMessages?.filter(
    (i) =>
      (i.owner === selectedUser && i.receiver === UserID) ||
      (i.owner === UserID && i.receiver === selectedUser)
  );
  return (
    <Container maxWidth='lg'>
      {messagesFromSelectedUser?.map((message) => (
        <MessageCard
          text={message.text}
          sender={message.owner}
          receiver={message.receiver}
          time={message.created_at}
          key={message.created_at}
        />
      ))}
      {selectedUser !== null ? (
        <>
          {!isMessageOpen && (
            <Button onClick={openMessage}>Message This User?</Button>
          )}
          {isMessageOpen && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    variant='standard'
                    fullWidth
                    type='text'
                    value={formData.text}
                    onChange={handleChange}
                    error={error}
                    label='Message'
                    name='text'
                  />
                </Box>
                <Button type='submit' sx={{ color: '#173042' }}>
                  Send
                </Button>
              </form>
            </Box>
          )}
        </>
      ) : (
        <Typography></Typography>
      )}
    </Container>
  );
}
