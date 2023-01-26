import {
  CardMedia,
  CardContent,
  Container,
  Card,
  CardActionArea,
  Typography
} from '@mui/material';
import ProfilePicture from './ProfilePicture'
import { API } from '../../lib/api';
import { useEffect, useState } from 'react';
//pass in the user pic to replace the pic part
// pass in username
//on click navigating to a inbox styled page for them

export default function UserToMessageCard({user, onClick}) {
const [singleUser, setSingleUser] = useState(null);
const [isUpdated, setIsUpdated] = useState(false);


const userAsInt = user

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleUser(userAsInt), API.getHeaders())
      .then(({ data }) => {
        setSingleUser(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsUpdated(false);
  }, [isUpdated]);
  return (
    <Container onClick={()=> onClick(singleUser?.id)}>
      <Card>
          <ProfilePicture
            cloudinaryImageId={singleUser?.profile_image}
            size={100}
          />
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              sx={{ textTransform: 'capitalize' }}
            >
              {singleUser?.username}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
