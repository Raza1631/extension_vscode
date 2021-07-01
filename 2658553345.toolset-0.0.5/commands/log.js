const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
module.exports = function addCommand(context) {

	let disposable = vscode.commands.registerTextEditorCommand('toolset.log', function (activeTextEditor) {
		// The code you place here will be executed every time your command is executed

		// 步骤分解
		// 1. 获取选中文本信息
		// 2. 获取选中文本位置
		// 3. 获取console分隔符配置
		// 4. 添加console代码

		const activeDocument = activeTextEditor.document;

		// 1. 获取所有选中行信息
		const selection = activeTextEditor.selection;
		const { start, end } = selection;
		 
		// 当前行文本内容
		const curLineText = activeDocument.lineAt(start.line).text;

		// 当前行非空文本起始位置
		const curLineStartCharacter = curLineText.search(/\S/i);

		// 当前行为空文本
		const curBlankText = curLineText.substring(0, curLineStartCharacter);

		// 当前选中文本内容
		const curText = curLineText.substring(start.character, end.character);

		// console插入位置
		const insertPositon = new vscode.Position(start.line + 1, 0);

		// 获取配置
		const config = vscode.workspace.getConfiguration('toolset');
		const identifier = config.get('identifier') || ':';
		
		// 调用编辑接口
		activeTextEditor.edit((TextEditorEdit) => {
			TextEditorEdit.insert(insertPositon, `${curBlankText}console.log('${curText}${identifier}', ${curText});\n`);
		});
	});

	context.subscriptions.push(disposable);
}
