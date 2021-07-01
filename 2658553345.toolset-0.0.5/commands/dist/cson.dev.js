"use strict";

var vscode = require('vscode');

var CSON = require('CSON');

var fs = require('fs');

var toast = require('../utils/toast');

var editorConfig = vscode.workspace.getConfiguration('editor');

var space = function space() {
  return editorConfig.useTabStops ? Array(editorConfig.tabSize).join(" ") : "\t";
};

module.exports = function addCommand(context) {
  var cson2jsonDisposable = vscode.commands.registerTextEditorCommand('toolset.cson2json', function (TextEditor, TextEditorEdit) {
    var fileName = TextEditor.document.fileName;
    var data = fs.readFileSync(fileName, {
      encoding: 'utf-8'
    });

    try {
      var parsed = CSON.parse(data);
      var handledText = JSON.stringify(parsed, null, space());
      fs.writeFileSync(fileName, handledText);
    } catch (error) {
      toast.error(error);
    }
  });
  context.subscriptions.push(cson2jsonDisposable);
  var json2csonDisposable = vscode.commands.registerTextEditorCommand('toolset.json2cson', function (TextEditor, TextEditorEdit) {
    var fileName = TextEditor.document.fileName;
    var data = fs.readFileSync(fileName, {
      encoding: 'utf-8'
    });

    try {
      var parsed = JSON.parse(data);
      var handledText = CSON.stringify(parsed, null, space());
      fs.writeFileSync(fileName, handledText);
    } catch (error) {
      toast.error(error);
    }
  });
  context.subscriptions.push(json2csonDisposable);
};