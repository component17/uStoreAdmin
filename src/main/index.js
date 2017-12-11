import {app, BrowserWindow, Menu} from 'electron'

/*const electron = require('electron');
const squirrelUrl = "http://test-update.lan:80/";

const startAutoUpdater = (squirrelUrl) => {
	// The Squirrel application will watch the provided URL
	electron.autoUpdater.setFeedURL(`${squirrelUrl}/win64/`);
	
	// Display a success message on successful update
	electron.autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName) => {
		electron.dialog.showMessageBox({"message": `The release ${releaseName} has been downloaded`});
	});
	
	// Display an error message on update error
	electron.autoUpdater.addListener("error", (error) => {
		electron.dialog.showMessageBox({"message": "Auto updater error: " + error});
	});
	
	// tell squirrel to check for updates
	electron.autoUpdater.checkForUpdates();
}*/

app.on('ready', function () {
	// Add this condition to avoid error when running your application locally
	//if (process.env.NODE_ENV !== "dev") startAutoUpdater(squirrelUrl)
});
/*const appUpdater = function () {
	startAutoUpdater(squirrelUrl);
}

const template = [
	{
		role: 'help',
		submenu: [
			{
				label: 'Check updates',
				click() {
					appUpdater()
				}
			}
		]
	}
];
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)*/

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}


if (require('electron-squirrel-startup')) {
	app.quit();
}


function isWindowsOrmacOS() {
	return process.platform === 'darwin' || process.platform === 'win32';
}


let mainWindow
const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080`
	: `file://${__dirname}/index.html`;


function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: 563,
		useContentSize: true,
		width: 1000
	});
	
	mainWindow.loadURL(winURL);
	//appUpdater();
	
	/*const page = mainWindow.webContents;
	
	page.once('did-frame-finish-load', () => {
		const checkOS = isWindowsOrmacOS();
		if (checkOS && !isDev) {
			// Initate auto-updates on macOs and windows
			appUpdater();
		}
	});*/
	
	
	mainWindow.on('closed', () => {
		mainWindow = null
	})
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
/*
const handleSquirrelEvent = () => {
	if (process.argv.length === 1) {
		return false;
	}
	
	const squirrelEvent = process.argv[1];
	switch (squirrelEvent) {
		case '--squirrel-install':
		case '--squirrel-updated':
		case '--squirrel-uninstall':
			setTimeout(app.quit, 1000);
			return true;
		
		case '--squirrel-obsolete':
			app.quit();
			return true;
	}
}

if (handleSquirrelEvent()) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	return;
}*/
