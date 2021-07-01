const vscode = require("vscode");
const fs = require("fs")
const path = require("path")
const toast = require('../utils/toast')

async function createComponent(fsPath) {
  let filename
  try {
    let name = await vscode.window.showInputBox({
      prompt: "请输入组件名称"
    });
    name = (name || "").trim();
    if (!name) {
      return toast.error("请输入组件名称");
    } else if (/.vue$/.test(name)) {
      filename = name
    } else {
      filename = `${name}.vue`
    }

    const filePath = path.resolve(fsPath, filename);
    const str = `<template>
  <div class="${name.toLowerCase()}-wrapper">
    ${name}
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less scoped">
.${name.toLowerCase()}-wrapper{
}
</style>`;

    fs.writeFileSync(filePath, str, "utf8");
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
}

module.exports = function addCommand(context) {
  let disposable = vscode.commands.registerCommand('toolset.createComponent', async function () {
    let fileDir = path.dirname(vscode.window.activeTextEditor.document.fileName)
    console.log(fileDir)
    await createComponent(fileDir)
  });

  context.subscriptions.push(disposable);
}