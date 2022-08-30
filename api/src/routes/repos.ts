import { Router, Request, Response } from 'express';
import axios from 'axios';
export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  axios.get('https://api.github.com/users/silverorange/repos',{
    headers:{
      "content-type":"application/json"
    }
  })
    .then(result => {
      res.json(result.data);
      // console.log(result.data);
    })
    .catch(err => {
        console.log(err);        
    });
});
