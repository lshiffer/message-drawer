## Message Drawer | A Mixmax Enhancement
Enhancement for Mixmax to include drawn messages.

### About
Adds an Enhancement to Mixmax allowing the User to draw a message to be included in his/her email.  Developed with vanilla JS and EaselJS with Node on the back running Express.  

A User can edit his/her drawing by clicking on 'Edit' once the drawing is within the email.  New doodles can be added to the drawing and will be saved when the User clicks 'Attach'.  Clicking 'Clear' will <i>only</i> clear the new doodles on the drawing, the original drawing will remain.  'Clear' when not editing a drawing will clear the entire canvas. 

/  
* server.js  
  Routes incoming and outgoing requests.

public/canvas/  
* canvas.js  
  Pop-up editor Controller.
  
* canvas.css  
  Styles for pop-up editor.
 
enhancement/  
* canvas.html  
  Pop-up editor View.
  
api/  
* canvasResolver.js  
  Receives the User drawing and returns an HTML snippet for email insertion. 
	
	
### Set Up Locally  
1.  Install using `npm install`  
2.  Run using `npm start`  

To test the editor locally, go to <https://localhost:8910/canvas> in your browser.  

To include the functionality in your Mixmax app:  

Settings > Integrations & API  
	Under 'Enhancements' click:  `Add Enhancement`  
	Fill in the following fields as such:  
	`Name`:  Drawer  
	`Icon Tooltip`:  Draw a Message  
	`Editor URL`:  https://localhost:8910/canvas/  
	`Resolver API URL`:  https://localhost:8910/api/canvas/  

Other settings can be left to their default value (height: 600, width: 680). 

For further information please visit: <http://developer.mixmax.com/docs/overview-enhancement#tutorial-building-giphy-enhancement>

### ToDo
*  Close Button  
	-  Implement 'Close' button calling Mixmax.cancel() for Mobile use.  
*  Additional Features
	-  Provide a pallete for User to choose different colors.  
	-  Adjust the pen size.
	-  Add text and external images to canvas.
	-  Eraser. 
