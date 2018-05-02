const fs = require('fs');
const http = require('http');

function getPhoto() {
    http.get('https://s3.amazonaws.com/around-us-photos/test.jpg')
        .then(data => {
            fs.writeFile('photo', data, err => {
                if(err)
                    console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        });
}


getPhoto();