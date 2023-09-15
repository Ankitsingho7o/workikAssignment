const {app, BrowserWindow, Menu}= require("electron")
const path = require("path")
const url = require("url")




function createWindow(){
    let win = new  BrowserWindow({
        width:900,
        height:600,
        title:"Conversion App"
    })

    win.loadFile("./src/index.html")
    // win.webContents.openDevTools();

    win.on('closed', ()=>{
        win = null
    })   


    var menu = Menu.buildFromTemplate([
        {
            label:'Menu',
            submenu:[{
                label:"Exit",
                click(){
                    app.quit();
                }
            }]

        }
    ])

    Menu.setApplicationMenu(menu)
}

app.whenReady().then(createWindow)