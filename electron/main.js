// LifecycleCompass desktop wrapper. Loads the SAME single-file app shipped on the
// web (assembled into www/ by scripts/make-www.js) — never a divergent copy.
// External links open in the user's real browser.
const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1320, height: 900, minWidth: 360, backgroundColor: '#0e0f13',
    title: 'LifecycleCompass',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  Menu.setApplicationMenu(null);
  // Desktop opens straight into the tool; index.html is the web landing page.
  win.loadFile(path.join(__dirname, '..', 'www', 'lifecyclecompass.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) { shell.openExternal(url); return { action: 'deny' }; }
    return { action: 'allow' };
  });
  win.webContents.on('will-navigate', (event, url) => {
    // allow the internal index.html -> lifecyclecompass.html redirect; send real
    // external links to the browser.
    if (/^https?:\/\//i.test(url)) { event.preventDefault(); shell.openExternal(url); }
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
