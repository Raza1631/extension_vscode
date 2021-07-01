"use strict";

var vscode = require('vscode');

var path = require('path');

module.exports = function addCommand(context) {
  // 资源管理中打开当前文件夹
  var disposable2 = vscode.commands.registerCommand('toolset.revealFileInOS', function () {
    var fileDir = path.dirname(vscode.window.activeTextEditor.document.fileName);
    var uri = vscode.Uri.file(fileDir);
    vscode.commands.executeCommand('revealFileInOS', uri, true);
  });
  context.subscriptions.push(disposable2);
};