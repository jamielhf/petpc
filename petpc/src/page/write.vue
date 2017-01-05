<template>
    <div class="g-write">
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :config="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                      @change="onEditorChange($event)">>
        </quill-editor>
            <a class="btn">保存</a>
    </div>

</template>



<script>


    import { quillEditor } from 'vue-quill-editor'

    require('../css/write')
    export default {
        data(){
            return{
                content: '<h2>I am Example</h2>',
                editorOption: {
                    // something config
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorBlur(editor) {
//                console.log('editor blur!', editor)
                console.log(this.content)
            },
            onEditorFocus(editor) {
            },
            onEditorReady(editor) {

            },
            onEditorChange({ editor, html, text }) {
//                 console.log('editor change!', editor, html, text)
                this.content = html;
                console.log(this.content)
            }
        },
        // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            }
        },
        mounted() {
            // you can use current editor object to do something(editor methods)
            console.log('this is my editor', this.editor)
            // this.editor to do something...
        }
    }

    </script>

