import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import RepoCard from './components/RepoCard';
import FilterButton from './components/FilterButton';

export function App() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    let isCancelled = true;
    axios
      .get('http://localhost:4000/repos', {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((result) => {
        if (isCancelled) {
          // console.log(result.data);
          setRepos([result.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isCancelled = false;
    };
  }, []);

  // Grabbing filter buttons name in an Array
  const languages = Array.from(
    new Set(repos[0]?.map((repo: any) => repo.language))
  );

  return (
    <div className="App">
      <h1>Let's see</h1>
      <div className="App-Filter-Button-Container">
        {languages?.map((name: any, i: any) => (
          <FilterButton key={i} data={name} />
        ))}
      </div>
      <div className="App-Card-Container">
        {repos[0]?.map((repo: any, i: any) => (
          <RepoCard key={i} repoData={repo} />
        ))}
      </div>
    </div>
  );
}
