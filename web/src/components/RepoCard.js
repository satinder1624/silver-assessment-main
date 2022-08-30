import React from 'react';

export default function RepoCard(repoData) {
  return (
    <div className="repocard--container">
      <div>Name: {repoData.repoData.name}</div>
      <div>Description: {repoData.repoData.description}</div>
      <div>Language: {repoData.repoData.language}</div>
      <div>Forks Count: {repoData.repoData.forks_count}</div>
    </div>
  );
}
