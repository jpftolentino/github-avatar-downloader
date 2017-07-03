var repoOwner = process.argv[2];
var repoName = process.argv[3];

var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'jpftolentino';
var GITHUB_TOKEN = '1cc7286ae8e54f8294fc4c6ea9f900a1a447d79c';


function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);

  //must create options variable from github documents to access the database
  var option = {
    url: requestURL,
    headers: {
      'User-Agent': 'github-avatar-downloader'
    }
  };

    if (!repoOwner || !repoName) {
      console.log('No repoName or repoOwner submitted');
      return;
    }

  //must pass option object with the proper keys in order to make  a successful request
  request(option, function(err, response, body) {
    if (err) {
      console.log(`Error fetching: ${option}`, err);
      return;
    }

    //if request was successful iterate through github profiles use avatar url key and login as parameters for callback
    if(response.statusCode === 200) {
      var json = JSON.parse(body);
      json.forEach(function(item) {
        console.log(item['avatar_url'],item['login'])
        cb(item["avatar_url"],item["login"]);
      })

    }

  });
}

//downloads images and outputs them into avatars folder of project
function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream("./avatars/" + filePath + '.jpg'));
}

getRepoContributors(repoOwner, repoName, downloadImageByURL);

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");
// downloadImageByURL();