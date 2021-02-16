<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
//
// + 括号匹配
import 'codemirror/addon/edit/matchbrackets'
// + 格式化
import 'codemirror'
//
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

export default {
  name: 'JsonEditor',
  /* eslint-disable vue/require-prop-types */
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: [Object, String, Array],
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      jsonEditor: false
    }
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue()
      if (value !== editorValue) {
        if (typeof value === 'object') {
          this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
        } else {
          this.jsonEditor.setValue(this.value, null, 2)
        }
      }
    }
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      mode: 'application/json',
      // gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      // 缩进单位，默认2
      indentUnit: 2,
      // 显示行号
      styleActiveLine: true,
      // lineNumbers: true,
      // 代码折叠
      lineWrapping: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      // 全屏模式
      fullScreen: true,
      // 括号匹配
      matchBrackets: true,
      autoRefresh: true,
      // CodeMirror-lint-markers是实现语法报错功能
      lint: true,
      readOnly: this.readOnly
    })

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 1))
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue()
    },
    refresh() {
      this.jsonEditor && this.jsonEditor.refresh()
    }
  }
}
</script>

<style scoped>
  .json-editor {
    height: 100%;
    position: relative;
  }

  .json-editor >>> .CodeMirror {
    height: auto;
    min-height: 420px;
  }

  .json-editor >>> .CodeMirror-scroll {
    min-height: 420px;
  }

  .json-editor >>> .cm-s-rubyblue span.cm-string {
    color: #F08047;
  }
</style>
