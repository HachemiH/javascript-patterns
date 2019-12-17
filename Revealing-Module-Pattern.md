# The Revealing Module Pattern in Javascript
> Zach Caceres

Javascript does not have the typical 'private' and 'public' specifiers of more traditional object oriented languages like C# or Java. However, you can achieve the same effect through the clever application of Javascript's function-level scoping. The Revealing Module pattern is a design pattern for Javascript applications that elegantly solves this problem.

The central principle of the Revealing Module pattern is that all functionality and variables should be hidden *unless deliberately exposed*.

Let's imagine we have a music application where a musicPlayer.js file handles much of our user's experience. We need to access some methods, but shouldn't be able to mess with other methods or variables.

#### Using Function Scope to Create Public and Private Methods

Let's first see how Javascript's function-level scope can help us create public and private methods.

We can move all functionality inside a function's scope. Then we return an object with the functions that we'd like accessible in other files.

```js
// musicPlayerModule.js

var musicPlayer = function () {
  // Let's make sure no one can directly access our songList
  var songList = ['California Girls', 'California Dreaming', 'Hotel California'];  

  // We'll expose all these functions to the user
  function play () {
    console.log('Im playing the next song!');
  }

  function pause () {
    console.log('Im paused!');
  }

  function addTrackToMusicQueue (track) {
    songList.push(track);
    console.log('I added a song');
  }

  function showNextTrack () {
    console.log('My next track is', songList[0]);
  }

  // Let's hide this function
  function loadSong() {
    filesystem.loadNextSong();
  }

  return {
    playMusic: play,
    pauseMusic: pause,
    showNextTrack: showNextTrack,
    addTrack: addTrackToMusicQueue
  }
}

const musicModule = musicPlayer(); // invoke our musicPlayer to return it's object (module)
musicModule.playMusic(); // 'Im playing the next song!'
musicModule.pauseMusic(); // 'I'm paused!'
musicModule.showNextTrack(); // 'The next track is California Girls'

// Things we can't access...
musicModule.loadSong(); // error: not a function
musicModule.songList.push('White Rabbit'); // undefined error
```

Now we can access all the methods that we need on our `musicModule` object. But we can't fiddle with our `songList` or access the `loadSong()` method. These are both private.

This works fine. But there's one big problem.

We're using `musicPlayer` as a namespace to hold our functions. But wait, our `musicPlayer` is a function that's still exposed to the global scope!

Someone could come along and invoke it again, creating a new `musicPlayer`. Then we would have multiple instances of `musicPlayer` floating around, polluting our environment and causing all sorts of confusion.

#### Hiding Your Module with an IIFE
The best way to avoid exposing your top-level function to the global scope is to wrap everything in an IFFE. An IIFE is an *immediately-invoked function expression*. That's a mouthful. It just means that we call (invoke) this function as soon as the file is run (immediately).

Since our function has no name, we call it an expression. Since it has no name, it can never be invoked elsewhere.

Here's how that looks:

```js
var musicModule = (function () {
  // Let's make sure no one can directly access our songList
  var songList = ['California Girls', 'California Dreaming', 'Hotel California'];  

  // We'll expose all these functions to the user
  function play () {
    console.log('Im playing the next song!');
  }

  function pause () {
    console.log('Im paused!');
  }

  function addTrackToMusicQueue (track) {
    songList.push(track);
    console.log('I added a song');
  }

  function showNextTrack () {
    console.log('My next track is', songList[0]);
  }

  // Let's hide this function
  function loadSong() {
    filesystem.loadNextSong();
  }

  return {
    playMusic: play,
    pauseMusic: pause,
    showUpNext: showNextTrack,
    addTrack: addTrackToMusicQueue
  }
})(); // our IIFE function (surrounded with parens) is invoked here

musicModule.playMusic(); // 'Im playing the next song!'
musicModule.pauseMusic(); // 'I'm paused!'
musicModule.showUpNext(); // 'The next track is California Girls'
musicModule.loadSong(); // error: not a function
musicModule.songList.push('White Rabbit'); // undefined
```

Our function-level scope still keeps our methods and variables public and private based on whether we expose them in the return object.

But this time, we avoid the risk that we can invoke our module elsewhere in the code.

In other files we can now use `musicModule`'s' functionality – a well-encapsulated module in our global scope!

[Source](https://gist.github.com/zcaceres/bb0eec99c02dda6aac0e041d0d4d7bf2)
