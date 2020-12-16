# TodoMVC App Using Angular 

## Development server

Run `ng serve` for a dev server locally. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
<br>
Access the project on https://kristimihali.github.io/tp3-web-avancee/ .

<img src = "https://i.imgur.com/KPvrAJc.png">

#### Done
* [x] 1 - **Delete All** Delete all items of the list.
* [x] 2 - **Modify Todo Label** Modify main label by double clicking it.
* [x] 3 - **Local Storage** Add items to local storage.
* [x] 4 - **Maps** Add position to each item.
* [x] 5 - **Responsive verion*** Accessible in mobile navigators.
* [x] 6 - **QR Code** List of elements in JSON.
* [x] 7 - **Voice Recognition** Start and Stop. Language used is in French.
* [x] 8 - **PWA Functionality** project available at : https://kristimihali.github.io/tp3-web-avancee/

#### Undone
* [ ] 1 - **Firebase** 
* [ ] 2 - **Undo/Redo**
* [ ] 3 - **Ionic**
* [ ] 4 - **Video/Images**
## Delete All 
This functionality Deletes all the items of the list.


## Modify the ToDo Label
This functionality allows the user to modify the label of the App when double-clicking it. To save it, you need to press enter.

<img src = "https://i.imgur.com/cp4qBCR.png">

## Local Storage et Maps
The list of objects is accessible on the local storage. Every object has the position (lat, long) of where the list item was added.

<img src="https://i.imgur.com/DWyvzwn.png">

## Responsive version
Accesssible on mobile phones.

<img src="https://i.imgur.com/i83FR0f.png" width ="450px" height = "650px">


## QR Functionality 
The list of the items that are uploaded to the Todo App, is updated to the QR on a JSON Format. Whenever you modify the list of the items, for the QR Code to be updated, a Reload of the page needs to be done. If the code is scanned, a list of the items on a JSON format is generated. 
<img src = "https://i.imgur.com/S8qrHOJ.png">

## Voice Recognition
  Press start and allow the voice recognition on your browser. Whenever you are finished talking, press stop and the text will show in the "Que faire?" input.
  It only works on some browsers, so use one of the following to test it.
  1. Google chrome
  2. Chrome for Android
  3. Samsung Internet
  4. QQ Browser
  5.Baidu Browser
  
## PWA Functionality
The project is accessible at https://kristimihali.github.io/tp3-web-avancee/. 
<br>
``` "deploy": "npx gh-pages -d dist/tp3-web-avancee" ```
<br>
The project was put online using 
<br>
``` npm run deploy ```
<br>
after installing 
<br>
``` npm i -D gh-pages ```

