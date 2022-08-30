import React from 'react';
import { Link } from 'react-router-dom';

export default function RepoCard(props) {
  return (
    <Link
      to={`/repo/${props.repoData.id}`}
      state={{
        date: props.repoData.updated_at,
        author: props.repoData.full_name,
      }}
    >
      <div className="repocard--container">
        <div>Name: {props.repoData.name}</div>
        <div>Description: {props.repoData.description}</div>
        <div>Language: {props.repoData.language}</div>
        <div>Forks Count: {props.repoData.forks_count}</div>
      </div>
    </Link>
  );
}
