import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SingleRepo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { date, author } = location.state;

  const [markdownContent, setmarkDownContent] = useState('Empty');

  useEffect(() => {
    let isCancelled = true;
    axios
      .get(`https://raw.githubusercontent.com/${author}/master/README.md`)
      .then((res) => {
        if (isCancelled) {
          if (res.status === 404) {
            return;
          }
          setmarkDownContent(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isCancelled = false;
    };
  }, [author]);

  return (
    <div className="single-repo-container">
      <h1>Full Name: {author}</h1>
      <span>Updated At: {moment(date).format('MMMM Do YYYY')}</span>
      <p>{markdownContent}</p>
      <div>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}
