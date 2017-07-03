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

  //must pass option object with the proper keys in order to make  a successful request
    request(option, function(err, response, body) {
      if (err) {
        console.log(`Error fetching: ${option}`, err);
        return;
      }

    if(response.statusCode === 200) {
      var json = JSON.parse(body);
      json.forEach(function(item) {
        // console.log(item['avatar_url']);
        console.log(item['avatar_url'],item['login'])
        cb(item["avatar_url"],item["login"]);
      })

    }
  });
}

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream("./avatars/" + filePath + '.jpg'));
}

getRepoContributors("jquery", "jquery", downloadImageByURL);

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");
// downloadImageByURL();