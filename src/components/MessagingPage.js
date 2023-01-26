import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import CreateMessage from './common/CreateMessage';
import { Container, Box, Button, Typography } from '@mui/material';
import UserToMessageCard from './common/UserToMessageCard';
import MessageInbox from './common/MessageInbox'
import './styles/Inbox.scss';

export default function MessagingPage() {
  const [allMessages, setAllMessages] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isCreateEntryOpen, setIsCreateEntryOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null)
  const openCreateEntry = () => setIsCreateEntryOpen(true);
  const closeCreateEntry = () => setIsCreateEntryOpen(false);

  
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

    const contacts = allMessages?.map((message)=> (
      message.receiver
    ))
    const uniqueContacts = [...new Set(contacts)]
  const mailChecker = allMessages?.length

  function handleSelectUser(value){
    setSelectedUser(value)
  }


  return (
    <Container className='MessagingInbox'>
      {mailChecker === 0 ? (
        <Container
          maxWidth='lg'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: '140px',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography> You currently have no messages</Typography>
          {!isCreateEntryOpen && (
            <Button
              variant='contained'
              size='medium'
              sx={{ color: 'white', br: 2 }}
              onClick={openCreateEntry}
            >
              Dare to send the first Message?
            </Button>
          )}
          {isCreateEntryOpen && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <CreateMessage
                closeCreateEntry={closeCreateEntry}
                setIsUpdated={setIsUpdated}
              />
            </Box>
          )}
        </Container>
      ) : (
        <>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: '60px',
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}
          >
            <Container
              maxWidth='lg'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              {uniqueContacts?.map((user) => (
                <UserToMessageCard onClick={handleSelectUser} user={user} />
              ))}
              <Container>
                {!isCreateEntryOpen && (
                  <Button
                    onClick={openCreateEntry}
                  >
                    Talk to someone new?
                  </Button>
                )}
                {isCreateEntryOpen && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <CreateMessage
                      closeCreateEntry={closeCreateEntry}
                      setIsUpdated={setIsUpdated}
                    />
                  </Box>
                )}
              </Container>
            </Container>
          <MessageInbox selectedUser={selectedUser} />
          </Container>
        </>
      )}
    </Container>
  );
}
