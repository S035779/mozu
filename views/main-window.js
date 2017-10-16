require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

module.exports = class MainWindow {
  constructor() {
    this.window = null;
    this.start();
  }
  start() {
    app.on('ready', () => {
      this.createWindow();
    });
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    });
    app.on('activate', () => {
      if (this.window === null) {
        createWindow()
      }
    });
  }
  createWindow() {
    this.window = new BrowserWindow({
      x: 0, y: 0, width: 1152, height: 964
      //, frame: false
      //, titleBarStyle: 'hidden'
      //, titleBarStyle: 'hiddenInset'
      //, titleBarStyle: 'customButtonsOnHover', frame: false
      , titleBarStyle: 'customButtonsOnHover'
    });
    this.window.loadURL(url.format({
      pathname: path.join(`${__dirname}/../public`, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
    this.window.webContents.openDevTools();
    this.window.on('closed', () => {
      this.window = null;
    });
  }
};
