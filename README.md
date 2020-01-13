## 3D Spotify Visualizer
Demo https://www.youtube.com/watch?v=SIk1UGomKik

 This project is a 3D music visualizer that connects to your Spotify account and allows for web playback audio control. The visuals move dynamically to the song by making two API calls to Spotify's API. The first to acquire the "audio analysis" for not only data like tempo, beat, or song duration for dynamic movement, but for the album cover image and artist name for the interface display. The second API call acquires "audio features" like danceability or energy.
 
  The rainbow rings move to the song beat data, the center structures move to the song tempo data, and the velocity you move in "space" is controlled by the "energy" of the song data received from the song features and analytics from Spotify's API. You can rotate the camera by dragging the mouse around and change the position of the camera with your keyboard arrows. 
  
  As far as I have found this project is one of a few Spotify visualizers that is 3D and allows you to move around the space and is the only one built with React.     

## Motivation
  I made this project because the visual components and challenging engineering of Three.js excited me and I wanted to try it out. 

## Build status
Build has main functionalty built out.The project was created in react at the deficate of using Three.js to allow for modualr expansion of non-visualizer features like song selection, the ability to create playlist and more. 

## Example Track Analysis
https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/

## Example Track Features
https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/

## Tech/framework used
react

MIT © [dannyWoodford]()
