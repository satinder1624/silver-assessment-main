import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

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
  return (
    <div className="App">
      <h1>Let's see</h1>
      {repos[0]?.map((repo: any, i: any) => (
        <div key={i}>{repo?.id}</div>
      ))}
    </div>
  );
}
