var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
	appDirectory: './build/win-unpacked',
	outputDirectory: './release/installer',
	authors: 'Me',
	exe: 'upoint.sotre Admin App.exe'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));