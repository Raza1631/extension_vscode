const  vscode = require('vscode')
// const path = require('path')

function provideHover (document, position) {
  // const fileName    = document.fileName;
  // const workDir     = path.dirname(fileName);
  const word        = document.getText(document.getWordRangeAtPosition(position));

  let time
  if(/^\d{13}$/.test(word)) {
    time = word
  }else if(/^\d{10}$/.test(word)) {
    console.log(10)
  }

  if(time) {
    try {
      let dateObj = new Date(+time)
      let dateString = `${dateObj.getFullYear()}年${dateObj.getMonth()+1}月${dateObj.getDate()}日 ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
      return new vscode.Hover(dateString)
    } catch (error) {
      console.error(error)
    }
  }


}
module.exports =  function addCommand (context) {
  let disposable = vscode.languages.registerHoverProvider ('*', {
    provideHover
	});

	context.subscriptions.push(disposable);
}
