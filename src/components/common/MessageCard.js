import { AUTH } from '../../lib/auth';
import { useState, useEffect } from 'react';
import { API } from '../../lib/api';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextareaAutosize
} from '@mui/material/';

export default function ReviewCard({
  text, sender, receiver, time
}) {
  const [singleSender, setSingleSender] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);


  useEffect(() => {
    API.GET(API.ENDPOINTS.singleUser(sender), API.getHeaders())
      .then(({ data }) => {
        setSingleSender(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsUpdated(false);
  }, [sender, isUpdated]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {text}
        </Typography>
        <Typography
          sx={{ fontSize: 14, textTransform: 'capitalize' }}
          color='text.secondary'
          gutterBottom
        >
          sent by by: {singleSender?.username}
        </Typography>
        <Typography
          sx={{ fontSize: 7, textTransform: 'capitalize' }}
          color='text.secondary'
          gutterBottom
        >
          At: {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
