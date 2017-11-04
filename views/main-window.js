require('dotenv').config();
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const url = require('url');
const path = require('path');

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
      width: 1152, height: 964
    });
    this.window.openDevTools();
    this.window.loadURL(url.format({
      pathname: path.join(`${__dirname}/../public`
      , 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
    this.window.on('closed', () => {
      this.window = null;
    });
  }
};
