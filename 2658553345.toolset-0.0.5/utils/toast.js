const vscode = require('vscode');

module.exports=  {
  success(str) {
    vscode.window.showInformationMessage(str);
  },
  waring(str) {
    vscode.window.showWarningMessage(str);
  },
  error(str) {
    vscode.window.showErrorMessage(str);
  }
}