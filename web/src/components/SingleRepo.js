import moment from 'moment';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SingleRepo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { date, author } = location.state;

  return (
    <div className="single-repo-container">
      <h1>Full Name: {author}</h1>
      <span>Updated At: {moment(date).format('MMMM Do YYYY')}</span>
      <div>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}
