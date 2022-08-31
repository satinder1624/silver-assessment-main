import { CircularProgress } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SingleRepo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { date, author } = location.state;

  const [markdownContent, setmarkDownContent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = true;
    axios
      .get(`https://raw.githubusercontent.com/${author}/master/README.md`)
      .then((res) => {
        if (isCancelled) {
          setmarkDownContent(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    return () => {
      isCancelled = false;
    };
  }, [author]);

  return (
    <div className="single-repo-container">
      <h1>Full Name: {author}</h1>
      <span>Updated At: {moment(date).format('MMMM Do YYYY')}</span>
      <p>{isLoading ? <CircularProgress /> : markdownContent}</p>
      <div>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}
