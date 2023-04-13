const fs = require('fs');
const LOG_FILE_PATH = './log.txt';

module.exports = {
    log: function(data){
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let logText = `[${day}/${month}/${year} ${hour}:${minute}:${second}]: ${data}\n`;
        fs.exists(LOG_FILE_PATH, (isExists) => {
            if(isExists){
                fs.appendFile(LOG_FILE_PATH, logText, err => {
                    if(err){
                        console.log(err);
                    }
                });
            }else{
                fs.writeFile(LOG_FILE_PATH, logText, err => {
                    if(err){
                        console.log(err);
                    }
                });
            }
        })
    }
}
