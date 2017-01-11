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
            <span @click="selectType('type',$event)" v-for="(value, key) in typeData" :type="key" :class = "{'z-active':type==key}"> {{value}} </span>
        </div>
        <div class="c-type">
            <p>性别：</p>
            <span @click="selectType('sex',$event)" v-for="(value, key) in sexData" :type="key" :class = "{'z-active':sex==key}"> {{value}} </span>

        </div>
        <div class="c-type">
            <p>年龄：</p>
            <select id="age">
                <option v-for="n in 11">{{ n }}个月</option>
                <option v-for="d in 20">{{ d }}岁</option>
            </select>
        </div>
        <div class="c-type">
            <p>来源：</p>
            <span @click="selectType('from',$event)" v-for="(value, key) in fromData" :type="key" :class = "{'z-active':from==key}"> {{value}} </span>

        </div>

        <div class="c-type ">
            <p>绝育：</p>
            <span @click="selectType('sterilization',$event)" v-for="(value, key) in otherData" :type="key" :class = "{'z-active':sterilization==key}"> {{value}} </span>

        </div>
        <div class="c-type">
            <p>免疫：</p>
            <span @click="selectType('immune',$event)" v-for="(value, key) in otherData" :type="key" :class = "{'z-active':immune==key}"> {{value}} </span>

        </div>
        <div class="c-type">
            <p>体内驱虫：</p>
            <span @click="selectType('insect',$event)" v-for="(value, key) in otherData" :type="key" :class = "{'z-active':insect==key}"> {{value}} </span>

        </div>
        <div class="c-type">
            <p>宠物图片：</p>
            <div class="c-img-list">
                <div class="c-img clearfix">
                    <div v-for="(value, key) in imgArr" class="img-box"><a @click="remove" :type="key"   class="glyphicon glyphicon-remove"></a><img  :src="value.sPhoto"></div>
                </div>
                <div class="c-add">
                    <span @click = 'clickImg' class="btn-add btn">添加</span>
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
                type:0,//宠物类型
                typeData:['狗狗','猫猫','兔子', '鼠类', '其他'],
                sex:0,//性别
                sexData:['GG','MM'],
                from:0,//来源
                fromData:['家养','流浪'],
                sterilization:2,//绝育
                immune:2,//免疫
                insect:2,//驱虫
                otherData:['是','否','不详'],
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
            selectType(t,e){
                let d = e.target;
                if(d.classList.value.indexOf('z-active')<0){
                    switch (t){
                        case 'type':this.type = d.getAttribute('type');break;
                        case 'sex':this.sex = d.getAttribute('type');break;
                        case 'from':this.from = d.getAttribute('type');break;
                        case 'sterilization':this.sterilization = d.getAttribute('type');break;
                        case 'immune':this.immune = d.getAttribute('type');break;
                        case 'insect':this.insect = d.getAttribute('type');break;
                    }
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
                let age = document.querySelector('#age').value;
                let data = {
                    title:this.title,
                    type:this.type,
                    imgArr:this.imgArr,
                    pet:{
                        sex:this.sex,
                        from:this.from,
                        immune:this.immune,
                        sterilization:this.sterilization,
                        insect:this.insect,
                        age:age
                    },
                    content : this.content,
                    address:address
                };
                this.$store.dispatch('saveArticle',data)

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

//                if(file){
//                    var fr = new FileReader();
//                    fr.onloadend = function(e) {
//                        vm.imgArr.push(e.target.result);
//                    };
//                    fr.readAsDataURL(file);
//                }

                this.$store.dispatch('articlePhoto',data)

            },
            clickImg:function () {
                document.querySelector('#file').click();
            },

            /*
            * 删除图片
            *
            * */
            remove:function (e) {
                let k = e.target.getAttribute('type');
                this.$store.commit('REMOVE_ARTICLE_PHOTO',k)
            }
        },
        // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            },
            imgArr:function () {
                console.log(this.$store.getters.getImgArr)
                if(this.$store.getters.getImgArr.length>0){
                    return this.$store.getters.getImgArr
                }else{
                    return []
                }
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

