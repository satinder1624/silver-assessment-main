import React from 'react';

export default function RepoCard(props) {
  return (
    <div className="repocard--container">
      <div>Name: {props.repoData.name}</div>
      <div>Description: {props.repoData.description}</div>
      <div>Language: {props.repoData.language}</div>
      <div>Forks Count: {props.repoData.forks_count}</div>
    </div>
  );
}
