import * as WebSocket from "ws";
//twitter set up
const needle = require('needle');

//import dotenv from 'dotenv';
//require('dotenv/config');
// Access BEARER_TOKEN from .env
//const BEARER_TOKEN = process.env.BEARER_TOKEN;
const BEARER_TOKEN = 'BEARER TOKEN HERE'


const endpointURL = "https://api.twitter.com/2/tweets/search/recent";

interface Tweet {
  text: string;
}

async function getTweets() {

  // These are the parameters for the API request
  // specify Tweet IDs to fetch, and any additional fields that are required
  // by default, only the Tweet ID and text are returned
  const params = {
      "query": "DragonCity",
      "tweet.fields": "lang,text",
      //"user.fields": "created_at",
  }

  // this is the HTTP header that adds bearer token authentication
  const res = await needle('get', endpointURL, params, {
      headers: {
          "User-Agent": "v2TweetLookupJS",
          "authorization": `Bearer ${BEARER_TOKEN}`
         
      }
  });

  if (res.body) {
      const tweets: Tweet[] = Array.from(res.body.data)
        .filter((tweet: any) => !tweet.text.match(/[#@]/))
        .map((tweet: any) => {
          return {
            text: tweet.text,
          };
        });
    return tweets;
     
  } else {
      throw new Error('Unsuccessful request');
  }

  
}




const wss = new WebSocket.Server({ port: 13370 });

interface customWs extends WebSocket {
  room: string;
}

let tweet:any

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



wss.on("connection", async (clientWs, request) => {
  const ws = clientWs as customWs;
  ws.room = request.url || "";
  


///////////////////////////////////////////

  wss.clients.forEach(async function each(client) {
    const cWs = client as customWs;
    const tweets: Tweet[] = await getTweets();

    const randomIndex = Math.floor(Math.random() * tweets.length);
    const randomTweet = tweets[randomIndex];


    const tweetText: string = randomTweet.text;

      tweet = await getTweets();
      //tweet = JSON.stringify(tweet);
      //console.log(tweet)
      console.log(tweetText)
      cWs.send(tweetText);
      
      
      
      
  });


  ws.on("message", function incoming(data) {
    
    });
  });




wss.once("listening", ()=>{
  
  console.log("Listening on port 13370")



  
})
