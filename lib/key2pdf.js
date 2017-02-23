"use strict";
var url = require("url");
var GitHubAPI = require("github");
var Promise = require("bluebird");
var request = require("request");
var github = new GitHubAPI({
  //debug: true,
  Promise: require('bluebird'),
});

// Update with a real source keynote
var source = "https://github.com/azizshamim/test_keynote_data"

github.authenticate({
  type: "token",
  token: process.env.GITHUB_TOKEN
});

// process.argv
var parse_source_url = function (s_url) {
  var source = url.parse(s_url)
  var t = source.path.split("/")

  source.owner = t[1]
  source.repository = t[2]
  source.type = t[3]
  source.branch = t[4]
  source.filename = t[5]
  return source;
};

var valid_parameters = function (s) {
  return true;
};

var async_sleep = function(timeout, body, callback) {
  var options = {
    method: "post",
    body: body,
    json: true,
    url: "http://localhost:3000/sleep/" + timeout,
  }
  request.post(options, function (error, response, body) {
      // body is the decompressed response body
      console.log('the decoded data is: ' + JSON.stringify(response.body));
      if (callback) {
        callback();
      };
  });
};

var get_from_github = function (job, callback) {
    async_sleep(1000, {function: 'get_from_github'}, function() {
      console.log("gfg 1");
      async_sleep(1000, {function: 'get_from_github'}, function() {
        console.log("gfg 2");
        async_sleep(1000, {function: 'get_from_github'}, function() {
          console.log("gfg 3");
          if (callback) { callback() };
        });
      });
    });
};

var convert_to_pdf = function(keynote, callback) {
  async_sleep(1000, {function: 'convert_to_pdf'}, function() {
    console.log("ctp 1");
    async_sleep(1000, {function: 'convert_to_pdf'}, function() {
      console.log("ctp 2");
      async_sleep(1000, {function: 'convert_to_pdf'}, function() {
        console.log("ctp 3");
        if (callback) { callback() };
      });
    });
  });
};

var save_pdf = function(pdf) {
  //if ( pdf.job.local_path ) {
  if ( true ) {
    save_to_disk(pdf);
  }
  // if ( pdf.job.commit_to_github ) {
  if ( true ) {
    save_to_github(pdf);
  }
  // if ( pdf.job.save_to_gdrive ) {
  if ( true ) {
    save_to_gdrive(pdf);
  }
};

var save_to_disk = function (o) {
    async_sleep(10000, {function: 'save_to_disk'});
};

var save_to_github = function (o) {
    async_sleep(10000, {function: 'save_to_github'});
};

var save_to_gdrive = function (o) {
    async_sleep(10000, {function: 'save_to_gdrive'});
};

/*
if valid_parameters_passed then
  get_file_from_github then
    post_to_cloud_convert receive jobID
      check_for_jobID_complete then
        get_file_from_cloudconvert(jobID) then
            and/or save_pdf_locally
            and/or commit_to_github_pr
            and/or copy_pdf_to_gdrive
*/

var process_job = function(job) {
  if ( valid_parameters() ) {
    get_from_github(job, function(err, keynote) {
       convert_to_pdf(keynote, function(err, pdf) {
           save_pdf(pdf);
           console.log("DONE");
       });
     });
  };
};

process_job({job: true });
