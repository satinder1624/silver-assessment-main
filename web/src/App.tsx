import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import RepoCard from './components/RepoCard';
import FilterButton from './components/FilterButton';
import SingleRepo from './components/SingleRepo';

export function App() {
  const [repos, setRepos] = useState<any[]>([]);
  const [filteringRepos, setFilteringRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = true;

    function callApi() {
      axios
        .get('http://localhost:4000/repos', {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((result) => {
          if (isCancelled) {
            // console.log(result.data);
            setRepos(result.data);
            setFilteringRepos(result.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          // If terrible middleware gives an error then call api again
          callApi();
        });
    }

    callApi();

    return () => {
      isCancelled = false;
    };
  }, []);

  // Grabbing filter buttons name in an Array
  const languages = Array.from(
    new Set(repos?.map((repo: any) => repo.language))
  );

  const appComponent = (
    <>
      <h1>Let's see</h1>
      <div className="App-Filter-Button-Container">
        {languages?.map((name: any, i: any) => (
          <FilterButton
            key={i}
            buttonText={name}
            data={filteringRepos}
            setData={setFilteringRepos}
            originalRepo={repos}
          />
        ))}
        {
          <FilterButton
            buttonText={'All'}
            data={filteringRepos}
            setData={setFilteringRepos}
            originalRepo={repos}
          />
        }
      </div>
      <div className="App-Card-Container">
        {filteringRepos?.map((repo: any, i: any) => (
          <RepoCard key={i} repoData={repo} />
        ))}
      </div>
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              {isLoading ? <CircularProgress /> : appComponent}
            </div>
          }
        />
        <Route path="/repo/:repoID" element={<SingleRepo />} />
      </Routes>
    </BrowserRouter>
  );
}
