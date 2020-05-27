// import { app, BrowserWindow } from 'electron'
// const { Menu } = require('electron')
var {
  Menu,
  shell,
  ipcMain,
  BrowserWindow,
  app
} = require('electron');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html#/LocalStorage/`

function createWindow() {
  var m = Menu.buildFromTemplate(template);


  Menu.setApplicationMenu(m);

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 610,
    width: 1300,
    //使用web页面尺寸
    useContentSize: true,
    //居中
    center: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

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

var template = [{
    label: '文件',
    submenu: [{
        label: '新建',
        accelerator: "Ctrl+N",
        click: function () {
          //主进程通知渲染进程操作文件
          BrowserWindow.getFocusedWindow().webContents.send('action', 'new');

        }

      },
      {
        label: '打开',
        accelerator: "Ctrl+O",
        click: function () {

          //主进程通知渲染进程操作文件
          BrowserWindow.getFocusedWindow().webContents.send('action', 'open');


        }
      },

      {
        accelerator: "Ctrl+S",
        label: '保存',
        click: function () {
          BrowserWindow.getFocusedWindow().webContents.send('action', 'save');

        }
      },
      {
        type: 'separator'
      },

      {
        label: '打印',
        accelerator: "Ctrl+P",
        click: function () {
          //打印功能通过 webContents  https://electronjs.org/docs/api/web-contents

          BrowserWindow.getFocusedWindow().webContents.print();


        }
      },
      {
        label: '退出',
        accelerator: "Ctrl+Q",
        click: function () {

          //要提示用户保存  未保存的文件

          //主进程通知渲染进程执行退出操作
          BrowserWindow.getFocusedWindow().webContents.send('action', 'exit');

        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [

      {
        label: '撤销',
        role: 'undo'
      },
      {
        label: '恢复',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: '截切',
        role: 'cut'
      },
      {
        label: '复制',
        role: 'copy'
      },
      {
        label: '黏贴',
        role: 'paste'
      },

      {
        label: '删除',
        role: 'delete'
      },
      {
        label: '全选',
        role: 'selectall'
      }
    ]
  },
  {
    label: '视图',
    submenu: [{
        label: '加载',
        role: 'reload'
      },

      {
        label: '放大',
        role: 'zoomin'
      },
      {
        label: '缩小',
        role: 'zoomout'
      },
      {
        label: '重置缩放',
        role: 'resetzoom'
      },
      {
        type: 'separator'
      },
      {
        label: '全屏',
        role: 'togglefullscreen'
      }
    ]
  }
];
var m = Menu.buildFromTemplate(template);


Menu.setApplicationMenu(m);



//右键菜单


const contextMenuTemplate = [{
    label: '撤销',
    role: 'undo'
  },
  {
    label: '恢复',
    role: 'redo'
  },
  {
    type: 'separator'
  },
  {
    label: '截切',
    role: 'cut'
  },
  {
    label: '复制',
    role: 'copy'
  },
  {
    label: '黏贴',
    role: 'paste'
  },
  {
    type: 'separator'
  }, //分隔线
  {
    label: '全选',
    role: 'selectall'
  } //Select All菜单项
];

var contextMenu = Menu.buildFromTemplate(contextMenuTemplate);


// 监听右键事件
ipcMain.on('contextMenu', function () {

  contextMenu.popup(BrowserWindow.getFocusedWindow())
})



//监听客户端的退出操作
ipcMain.on('exit-app', () => {

  app.quit();
})