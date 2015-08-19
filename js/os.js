//since node-webkit has different menu styles for window and mac so display accordingly
if(navigator.platform.toUpperCase().indexOf('MAC')>=0)
	document.write('<script src="js/Menus/MacMenu.js"></script>');
else
	document.write('<script src="js/Menus/windowMenu.js"></script>');