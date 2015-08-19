var gui=require('nw.gui');
var win=gui.Window.get();//get window object
var menuBar=new gui.Menu({
	type:'menubar'
});//whole menu baar
var contactUs=new gui.Menu();//create new menu tab	
contactUs.append(new gui.MenuItem({//new item in that tab
	label:'Like Us on Facebook!',
	click:function(){
		gui.Shell.openExternal("http://facebook.com/Manan.ymcaust");//to open something in user's default browser
	}
}));
var github=new gui.Menu();
github.append(new gui.MenuItem({
	label:'Fork us on github!',
	click:function(){

		gui.Shell.openExternal('https://github.com/Manan-YMCA/');
	}
}));
win.menu = menuBar;
win.menu.insert(new gui.MenuItem({
	label:"Contact Us!",
	submenu:contactUs
}),1);
win.menu.insert(new gui.MenuItem({
	label:"Source Code",
	submenu:github
}),1);
