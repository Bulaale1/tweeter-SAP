/* eslint-disable no-var */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
];
$(document).ready(function() {
  let $tweetContainer = $("#tweet-container");
  let timeElement = Date.now();
  let time = timeago.format(timeElement);
  // let time2 = timeago.format(timeElement);
  let $tim = $('#timeago').text(time);
  console.log($tim);
  const createTweetElement = function(tweet) {
    let header = $('<header>');
    var userInfo = $('<div class="userInfo">');
    var avatar = $('<img>').attr('src', tweet.user.avatars);
    var name = $('<p class="name">').text(tweet.user.name);
    var handle = $('<p class="username">').text(tweet.user.handle);
    var avatarAndName = $('<div class="avatarAndName">');
    avatar.appendTo(avatarAndName);
    name.appendTo(avatarAndName);
    avatarAndName.appendTo(userInfo);
    handle.appendTo(userInfo);
    userInfo.appendTo(header);
    let content = $('<p class="tweet-text"></p>').text(tweet.content.text);
    $tweetContainer.append(header);
    $tweetContainer.append(content);
    return $tweetContainer;
  };
  const renderTweets = function(tweets) {
    const $tweetContainer = $('#tweet-container');
    tweets.forEach(function(tweet) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
    });
  };
  renderTweets(data);
  $("#form").on("submit", function(event) {
    // alert("Handler for `submit` called.");
    event.preventDefault();
    let tweetLength = $('#tweet-text').val().length;
    if (tweetLength > 140) {
      alert('You exeeded the allowed limit');
      return;
    } else if (tweetLength <= 0) {
      alert('Cannot tweet empty post');
      return;
    }
    let  $formData = $("#form").serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $formData
    }).then((response) =>{
      console.log('Response was succefully sent',response);
      // var parsedResponse = JSON.parse(response);
      // var tweetId = parsedResponse.tweetId;
      // console.log(tweetId);
      const tweet = {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png",
          "handle": "@SirIsaac"
        },
        "content": {
          "text":$('#tweet-text').val()
        },
        "created_at": 1461116232227
      };
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
      tweetLength = 140;
      $('#tweet-text').val("");
      let counterElement = $('.counter');
      counterElement.text(140);
    });
  });
  const loadTweets = function() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      dataType: 'json',
    });
  };
  loadTweets();
});