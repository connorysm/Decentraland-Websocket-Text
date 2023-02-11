import * as WebSocket from "ws";
//twitter set up
const needle = require('needle');
require('dotenv/config');
// Access BEARER_TOKEN from process.env object
const BEARER_TOKEN = process.env.BEARER_TOKEN;


const endpointURL = "https://api.twitter.com/2/tweets/search/recent";

async function getTweets() {

  // These are the parameters for the API request
  // specify Tweet IDs to fetch, and any additional fields that are required
  // by default, only the Tweet ID and text are returned
  const params = {
      "query": "DCL",
      "tweet.fields": "lang,author_id",
      "user.fields": "created_at"
  }

  // this is the HTTP header that adds bearer token authentication
  const res = await needle('get', endpointURL, params, {
      headers: {
          "User-Agent": "v2TweetLookupJS",
          "authorization": `Bearer ${BEARER_TOKEN}`
         
      }
  })

  if (res.body) {
      return res.body;
  } else {
      throw new Error('Unsuccessful request');
  }
}




const wss = new WebSocket.Server({ port: 13370 });

interface customWs extends WebSocket {
  room: string;
}

let tweet:any



wss.on("connection", async (clientWs, request) => {
  const ws = clientWs as customWs;
  ws.room = request.url || "";
  

  wss.clients.forEach(async function each(client) {
    const cWs = client as customWs;

    
      tweet = await getTweets();
      console.log(tweet)
      tweet = JSON.stringify(tweet)
      cWs.send(tweet);
      
      
      
      
  });


  ws.on("message", function incoming(data) {
    
    });
  });




wss.once("listening", ()=>{
  
  console.log("Listening on port 13370")



  
})
