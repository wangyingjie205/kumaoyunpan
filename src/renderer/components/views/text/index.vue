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


    var isSave = true; //文件保存标识符

    var currentFile = ""; //保存文件的路径

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
          //先判断文件是否已经保存 ，如若没有保存则提示并保存

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
            //得到文件里面的东西
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

    //实现文件保存

    function askSaveDialog() {
      if (!isSave) {
        var index = remote.dialog.showMessageBox({
          type: "question",
          message: "请您确认保存?",
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
        //显示保存路径以及类型

        var dir = remote.dialog.showSaveDialog({
          defaultPath: ".txt",
          filters: [{ name: "All Files", extensions: ["*"] }]
        });

        if (dir) {
          currentFile = dir;

          fs.writeFileSync(currentFile, textAreaDom.value);
          isSave = true;
          //修改文本名
          document.title = currentFile;
        }
      } 
    }
  }
};
</script>

<style scoped>
* {
  margin: 1px;
  padding: 1px;
}
#textArea {
  font-size: 20px;

  position: fixed;

  bottom: 100px;
top:100px;
  width: 98%;
  height: 85%;
 margin-top:50px;
}
</style>