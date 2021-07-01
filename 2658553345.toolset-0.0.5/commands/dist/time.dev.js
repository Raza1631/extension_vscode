"use strict";

var vscode = require('vscode'); // const path = require('path')


function provideHover(document, position) {
  // const fileName    = document.fileName;
  // const workDir     = path.dirname(fileName);
  var word = document.getText(document.getWordRangeAtPosition(position));
  var time;

  if (/^\d{13}$/.test(word)) {
    time = word;
  } else if (/^\d{10}$/.test(word)) {
    console.log(10);
  }

  if (time) {
    try {
      var dateObj = new Date(+time);
      var dateString = "".concat(dateObj.getFullYear(), "\u5E74").concat(dateObj.getMonth() + 1, "\u6708").concat(dateObj.getDate(), "\u65E5 ").concat(dateObj.getHours(), ":").concat(dateObj.getMinutes(), ":").concat(dateObj.getSeconds());
      return new vscode.Hover(dateString);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = function addCommand(context) {
  var disposable = vscode.languages.registerHoverProvider('*', {
    provideHover: provideHover
  });
  context.subscriptions.push(disposable);
};