// we using this file to active the server of render beacuse the reander server is sleeping aftr 15 minutes for free users so for fix this issue we need to ping the server every 5 minutes
//  or 14 minutes

import cron from 'cron';
import https from 'https';

const URL = "https://expense-tracking-36eb.onrender.com";

const job = new cron.CronJob("*/14 * * * *", function() {
       https.get(URL, (res) => {
              if (res.statusCode === 200) {
                     console.log("Server is awake");
              }else{
                     console.log("Server is sleeping", res.statusCode);
              }
       })
       .on("error", (err) => {
              console.error("Error seding request to server:", err);
       });    
});
export default job;
