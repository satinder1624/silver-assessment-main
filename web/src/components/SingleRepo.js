import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SingleRepo() {
  const location = useLocation();
  const { date, author } = location.state;

  return (
    <div className="single-repo-container">
      <h1>{author}</h1>
      <span>{date}</span>
    </div>
  );
}
