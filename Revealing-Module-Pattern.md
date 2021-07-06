# The Revealing Module Pattern in Javascript
> Zach Caceres

Javascript ne dispose pas des spécificateurs "private" et "public" typiques des langages orientés objet plus traditionnels comme C# ou Java. Cependant, il est possible d'obtenir le même effet grâce à une application intelligente de la portée au niveau des fonctions de Javascript. Le modèle "Revealing Module" est un modèle de conception pour les applications Javascript qui résout élégamment ce problème.

Le principe central du modèle Revealing Module est que toutes les fonctionnalités et les variables doivent être cachées, *sauf si elles sont délibérément exposées*.

Imaginons que nous ayons une application musicale où un fichier musicPlayer.js gère une grande partie de l'expérience utilisateur. Nous avons besoin d'accéder à certaines méthodes, mais nous ne devons pas être en mesure d'intervenir sur d'autres méthodes ou variables.

#### Utilisation de la portée de la fonction pour créer des méthodes publiques et privées

Voyons d'abord comment la portée au niveau des fonctions de Javascript peut nous aider à créer des méthodes publiques et privées.

Nous pouvons déplacer toutes les fonctionnalités à l'intérieur de la portée d'une fonction. Ensuite, nous retournons un objet avec les fonctions que nous voudrions accessibles dans d'autres fichiers.

```js
// musicPlayerModule.js

var musicPlayer = function () {
  // Assurons-nous que personne ne puisse accéder directement à notre songList
  var songList = ['California Girls', 'California Dreaming', 'Hotel California'];  

  // Nous allons exposer toutes ces fonctions à l'utilisateur
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

  // Cachons cette fonction
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

const musicModule = musicPlayer(); // invoquer notre musicPlayer pour renvoyer son objet (module)
musicModule.playMusic(); // 'Im playing the next song!'
musicModule.pauseMusic(); // 'I'm paused!'
musicModule.showNextTrack(); // 'The next track is California Girls'

// Des choses auxquelles nous n'avons pas accès...
musicModule.loadSong(); // error: not a function
musicModule.songList.push('White Rabbit'); // undefined error
```

Maintenant, nous pouvons accéder à toutes les méthodes dont nous avons besoin sur notre objet `music Module`. Mais nous ne pouvons pas jouer avec notre `songList` ou accéder à la méthode `loadSong()`. Elles sont toutes deux privées.

Cela fonctionne bien. Mais il y a un gros problème.

Nous utilisons `musicPlayer` comme espace de noms pour contenir nos fonctions. Mais attendez, notre `musicPlayer` est une fonction qui est toujours exposée à la portée globale !

Quelqu'un pourrait venir et l'invoquer à nouveau, créant un nouveau `musicPlayer`. Ensuite, nous aurions plusieurs instances de `musicPlayer` flottantes, polluant notre environnement et provoquant toutes sortes de confusions.

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
