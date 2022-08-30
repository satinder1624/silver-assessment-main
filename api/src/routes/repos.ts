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
      let data = result.data;
      // filtering those who has fork value false
      data = data.filter((element: { fork: any; }) => !element.fork)
      // sorting res array in reverse chronological order
      data.sort(function(a:any,b:any){
        return +new Date(b.created_at) - +new Date(a.created_at);
      })
      res.json(data);
      // console.log(result.data);
    })
    .catch(err => {
        console.log(err);        
    });
});
