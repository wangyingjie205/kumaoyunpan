<template>
  <div>
    <textarea id="textArea"></textarea>
  </div>
</template>

<script>
export default {
  mounted() {
    var { ipcRenderer, remote } = require("electron");
    var fs = require("fs");

    document.title = "无标题";

    //获取文本框dom

    var textAreaDom = document.querySelector("#textArea");

    /*

问题：
    1、新建 打开 保存的问题

    2、如果已经保存 第二次保存的时候不提示直接保存

    3、判断文件是否已经保存  改变软件左上角的内容

*/

    var isSave = true; //判断文件是否保存

    var currentFile = ""; //保存当前文件的路径

    //内容变化的时候 让isSave等于false
    textAreaDom.oninput = function() {
      if (isSave) {
        document.title += " *";
      }

      isSave = false;
    };

    document.addEventListener("contextmenu", function(e) {
      e.preventDefault();

      ipcRenderer.send("contextMenu");
    });

    //监听主进程的操作

    ipcRenderer.on("action", function(event, action) {
      console.log(action);

      switch (action) {
        case "new":
          //判断文件是否保存  如果没有保存提示   并保存

          askSaveDialog();

          textAreaDom.value = "";

          break;

        case "open":
          //判断文件是否保存  如果没有保存提示   并保存

          askSaveDialog();

          //通过dialog打开文件
          var dir = remote.dialog.showOpenDialog({
            properties: ["openFile"]
          });

          if (dir) {
            var fsData = fs.readFileSync(dir[0]);
            //获取文件里面的东西
            textAreaDom.value = fsData;
          }
          break;

        case "save":
          saveCurrentDoc();

          break;

        case "exit":
          askSaveDialog(); //同步方法

          //通知主进程退出应用

          ipcRenderer.send("exit-app");

          break;
      }
    });

    //判断文件师傅保存并执行保存功能

    function askSaveDialog() {
      if (!isSave) {
        var index = remote.dialog.showMessageBox({
          type: "question",
          message: "是否要保存此文件?",
          buttons: ["Yes", "No"]
        });

        if (index == 0) {
          //执行保存操作
          saveCurrentDoc();
        }
      }
    }

    //执行保存的方法
    function saveCurrentDoc() {
      if (!currentFile) {
        //当前文件路径不存在 提示保存

        var dir = remote.dialog.showSaveDialog({
          defaultPath: "aaa.txt",
          filters: [{ name: "All Files", extensions: ["*"] }]
        });

        if (dir) {
          currentFile = dir;

          fs.writeFileSync(currentFile, textAreaDom.value);
          isSave = true;
          //改变软件的标题
          document.title = currentFile;
        }
      } else {
        fs.writeFileSync(currentFile, textAreaDom.value);
        isSave = true;

        //改变软件的标题
        document.title = currentFile;
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
#textArea {
  font-size: 14px;

  position: fixed;

  top: 0px;
  bottom: 0px;

  width: 100%;
  height: 100%;
  margin-left: -10px;
  margin-top: 50px;
}
</style>