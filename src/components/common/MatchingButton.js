import { useEffect, useState } from 'react';
import { API } from '../../lib/api';
import { AUTH } from '../../lib/auth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MessagingPage({ sender, receiver, selectedUser }) {
  const [allQuizes, setAllQuizes] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.GET(API.ENDPOINTS.allQuizes, API.getHeaders())
      .then(({ data }) => {
        setAllQuizes(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setIsUpdated(false);
  }, [isUpdated]);

  const currentUser = parseInt(AUTH.getUser());
  const otherUsersQuizes = allQuizes?.filter(
    (quiz) => quiz.owner !== currentUser
  );
  const [currentUsersQuiz = {}] = allQuizes?.filter(
    (quiz) => quiz.owner === currentUser
  );

  const [mostMatchedQuiz] = otherUsersQuizes
    .map((quiz) => {
      const answerMatches = Object.keys(quiz).filter((q, i) => {
        if (quiz[q] === currentUsersQuiz[q]) {
          return i;
        }
      });
      return { owner: quiz.owner, answerMatches };
    })
    .filter((arr) => arr.answerMatches.length)
    .sort((a, b) => (a.answerMatches.length > b.answerMatches.length ? -1 : 1));

  const matchedUserId = mostMatchedQuiz?.owner;

  const handleMatchingClick = () => {
    navigate(`/user/${matchedUserId}`);
  };

  return <Button onClick={handleMatchingClick}>Click here to Match with someone</Button>;
}
