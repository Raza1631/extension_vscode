const vscode = require('vscode')
const CSON = require('CSON')
const fs = require('fs')
const toast = require('../utils/toast')
const editorConfig = vscode.workspace.getConfiguration('editor');

const space = ()=> {
    return editorConfig.useTabStops ? Array(editorConfig.tabSize).join(" ") : "\t" 
}


module.exports = function addCommand(context) {
    let cson2jsonDisposable = vscode.commands.registerTextEditorCommand('toolset.cson2json', function (TextEditor, TextEditorEdit) {
        let fileName = TextEditor.document.fileName
        let data = fs.readFileSync(fileName, { encoding: 'utf-8'})
        try {
            let parsed = CSON.parse(data)
            let handledText = JSON.stringify(parsed, null, space())
            fs.writeFileSync(fileName, handledText)
        } catch (error) {
            toast.error(error)
        }
    });
    context.subscriptions.push(cson2jsonDisposable);

    let json2csonDisposable = vscode.commands.registerTextEditorCommand('toolset.json2cson', function (TextEditor, TextEditorEdit) {
        let fileName = TextEditor.document.fileName
        let data = fs.readFileSync(fileName, { encoding: 'utf-8' })
        try {
            let parsed = JSON.parse(data)
            let handledText = CSON.stringify(parsed, null, space())
            fs.writeFileSync(fileName, handledText)
        } catch (error) {
            toast.error(error)
        }
    });
    context.subscriptions.push(json2csonDisposable);

}
