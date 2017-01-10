<template>
    <div class="g-write">
       
        <div class="c-type">
            <input class="title " v-model = 'title' placeholder="输入标题"/>
        </div>
        <div class="c-type">
            <h3>宠物信息</h3>
        </div>
        <div class="c-type">
            <p>地区：</p>
            <select id="cmbProvince" name="cmbProvince"></select>
            <select id="cmbCity" name="cmbCity"></select>
            <select id="cmbArea" name="cmbArea"></select>
        </div>
        <div class="c-type">
            <p>种类：</p>
            <span @click ="selectType" type = "0" class="z-active" >全部</span>
            <span @click ="selectType" type = "1"  >狗狗</span>
            <span @click ="selectType"  type = "2" >猫猫</span>
            <span @click ="selectType"  type = "3" >兔子</span>
            <span @click ="selectType"  type = "4" >鼠类</span>
            <span @click ="selectType" type = "5" >其他</span>
        </div>
        <div class="c-type">
            <p>性别：</p>
            <span class="z-active">GG</span>
            <span>MM</span>
        </div>
        <div class="c-type">
            <p>年龄：</p>
            <select >
                <option v-for="n in 11">{{ n }}个月</option>
                <option v-for="d in 20">{{ d }}岁</option>
            </select>
        </div>
        <div class="c-type">
            <p>来源：</p>
            <span class="z-active">家养</span>
            <span>流浪</span>
        </div>

        <div class="c-type ">
            <p>绝育：</p>
            <span >是</span>
            <span>否</span>
            <span class="z-active">不详</span>
        </div>
        <div class="c-type">
            <p>免疫：</p>
            <span >是</span>
            <span>否</span>
            <span class="z-active">不详</span>
        </div>
        <div class="c-type">
            <p>体内驱虫：</p>
            <span >是</span>
            <span>否</span>
            <span class="z-active">不详</span>
        </div>
        <div class="c-type">
            <p>宠物图片：</p>
            <div class="c-img-list">
                <div class="c-img">
                    <img :src="file">
                </div>
                <div class="c-add">
                    <span class="glyphicon glyphicon-picture"></span>
                    <input  type="file" id="file" @change = "upload" >
                </div>
            </div>
        </div>
        <div class="c-type last">
            <h3>宠物描述以及领养要求</h3>
        </div>

        <div class="m-editor">
            <quill-editor ref="myTextEditor"
                          v-model="content"
                          :config="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)"
                          @change="onEditorChange($event)">>
            </quill-editor>
        </div>

        <a @click = "saveArticle" class="btn btn-primary  btn-default btn-block">投递领养信息</a>
    </div>

</template>



<script>
   import {addressInit} from '../js/lib/address';


    import { quillEditor } from 'vue-quill-editor'

    require('../css/write')
    export default {
        data(){
            return{
                content: '',
                editorOption: {
                    // something config
                },
                title:'',
                type:2,//宠物类型
                imgArr:[],
                file:'https://shq-pic.b0.upaiyun.com/Attachment/face/010/82/07/06_avatar.jpg'
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
            },
            selectType(e){
              let d = e.target;

                if(d.classList.value.indexOf('z-active')<0){
                    d.parentNode.querySelector('.z-active').classList.remove('z-active');
                    d.classList.add('z-active');
                    this.type = d.getAttribute('type');

                }

            },
            /*
            *
            * 保存文章
            * */
            saveArticle:function () {
                let address = document.querySelector('#cmbProvince').value +"|"+
                             document.querySelector('#cmbCity').value +"|"+
                             document.querySelector('#cmbArea').value ;
                let data = {
                    title:this.title,
                    type:this.type,
                    content : this.content,
                    address:address
                };
//                this.$store.dispatch('saveArticle',data)
                console.log(data);

            },
            /*
            * 图片上传
            *
            * */
            upload:function (event) {
                let vm =this;
                let file = event.target.files[0];
                let data = new FormData();
                data.append("file",file);

                if(file){
                    var fr = new FileReader();
                    fr.onloadend = function(e) {
                        vm.file =  e.target.result;
                    };
                    fr.readAsDataURL(file);
                }

//                this.$store.dispatch('setHead',data)

            },
            clickImg:function () {
                document.querySelector('#file').click();
            },
        },
        // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            }
        },
        mounted() {
            addressInit('cmbProvince', 'cmbCity', 'cmbArea');
            // you can use current editor object to do something(editor methods)
//            console.log('this is my editor', this.editor)
            // this.editor to do something...
        }
    }

    </script>

