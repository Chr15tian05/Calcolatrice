const { app, globalShortcut, BrowserWindow, ipcMain } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 450,
    frame: false, // rimuove il frame standard
    title: "Calcolatrice Made By Chris",
    titleBarStyle: "hiddenInset", // mantiene i "traffic lights" nativi ma nascosti
    titleBarOverlay: true, // mostra overlay della barra in Windows/Linux
    icon: path.join(__dirname, "imgs", "Fifth Row", "Logo.png"),
    resizable: false, // impedisce il ridimensionamento della finestra
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
}
// app.whenReady().then(createWindow);
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 200,
    height: 352,
    resizable: false, // 🔒 Impedisce il ridimensionamento
    minimizable: false, // 🔒 Disabilita la possibilità di ridurre a icona
    maximizable: false, // 🔒 Disabilita l'ingrandimento
    frame: false, // ❌ Rimuove la barra del sistema
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // se usi preload, altrimenti rimuovi
      nodeIntegration: true, // se necessario
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
});

ipcMain.on("window-close", () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.on("window-minimize", () => {
  if (mainWindow) mainWindow.minimize();
});
