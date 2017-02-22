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

<style  rel="stylesheet/scss" lang="scss">
    @import "../css/base/min";

    .g-write{

        width: 1000px;
        margin: 0px auto ;
        resize: vertical;
        padding: 10px 100px 100px;
        box-sizing: border-box;
        background-color: #fff;
    .title{
        height: 50px;
        line-height: 50px;
        margin-bottom: 10px;
        width: 100%;
        border:1px solid #ddd;
        border-radius: 4px;
        background-color:transparent;
        padding-left: 20px;
        font-size: 16px;
        color: #666;
    //box-shadow: 1px 1px 3px #ccc;
    &:focus{
     //box-shadow: 0 0 15px #ccc;
     }

    }

    .m-editor{
        border-right:0;
        border-left:0;
        margin-bottom: 30px;
        color: #666;
        line-height: 1.4;
    //box-shadow: 1px 1px 4px #ccc;
    .ql-editor.ql-blank::before{ /* WebKit browsers */
        font-style: normal;
        color: #999;
    }
    }
    .ql-container .ql-editor {
        min-height: 500px;
        background-color: #fff;
    img{
        max-height:500px;
    }
    }

    .ql-toolbar.ql-snow{
        border-right:0;
        border-left:0;
        border-top:1px solid  $color;;
        border-bottom:1px solid #ddd;;
    }
    .ql-editor p, .ql-editor ol, .ql-editor ul, .ql-editor pre, .ql-editor blockquote, .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6{
        line-height: 1.5;
    }
    .ql-container.ql-snow{
        border-right:0;
        border-left:0;
        border-top:1px solid $color;
        border-bottom:1px solid $color;;
    }
    .ql-editor p{
        font-size: 16px;
        font-family: "Microsoft YaHei";
        color: #666;
    }
    .btn-primary{
        width: 150px;
        margin: 0 auto;
        background-color: $color;
        border: 0;
    }
    .btl{
        border-top: 1px solid $color;
        padding-top: 20px;
    }

    .c-type{
        position: relative;
        margin: 15px 0;
    &.last{
         margin-bottom: 0;
    h3{
        border: 0;
    }
    }
    h3{
        font-size: 20px;
        padding: 30px 0 20px;
        border-bottom: 1px solid $color;
        color:#333;
    }
    p{
        display: inline-block;
        color: #666;
        font-size: 16px;
    }
    span{
        display: inline-block;
        font-size: 14px;
        color:  #999;
        border: 1px solid #999;
        background-color: #fff;
        padding: 2px 10px;
        line-height: 1.2;
        border-radius: 3px;
        cursor: pointer;
        margin-right: 5px;
    &.z-active{
         border: 1px solid $color;
         background-color: $color;
         color: #fff;
     }


    }
    select{
        border: 1px solid #999;
        font-size: 14px;
        color: #666;
        margin-right: 10px;
        outline: none;
        border-radius: 3px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        padding: 0 5px;
    }
    .c-img-list{
        position: relative;
        padding: 10px 0;
    img{
        width: 200px;
        padding: 5px;
        border-radius: 2px;
        border:1px solid #ddd;
        box-sizing: border-box;
    }
    .glyphicon-remove{
        position: absolute;
        right: 2px;
        top:2px;
        z-index: 5;
        font-size: 14px;
        text-decoration: none;
    &:hover{
         color: $color
     }
    }
    .img-box{
        position: relative;
        display: block;
        float: left;
        width:200px;
        min-height:200px;
    }
    #file{
        width: 0;
        height: 0;
        opacity: 0;
    }
    }
    .c-add{

    .btn-add{
        margin-top: 20px;
        box-sizing: border-box;
        border-radius: 2px;
        font-size: 16px;
        padding: 5px 20px;
        border:1px solid $color;
        color: $color;
    }

    }
    }

    }

</style>
<script>
   import {addressInit} from '../js/lib/address';

    import { quillEditor } from 'vue-quill-editor'


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
                file:'https://shq-pic.b0.upaiyun.com/Attachment/face/010/82/07/06_avatar.jpg',

            }
        },
        created(){

        },
        mounted() {
            addressInit('cmbProvince', 'cmbCity', 'cmbArea');

        },
        components: {
            quillEditor
        },
        methods: {
            onEditorBlur(editor) {
//                console.log('editor blur!', editor)
//                console.log(this.content)
            },
            onEditorFocus(editor) {
            },
            onEditorReady(editor) {

            },
            onEditorChange({ editor, html, text }) {
//                 console.log('editor change!', editor, html, text)
                this.content = html;
//                console.log(this.content)
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
                let vm = this;
                let address = document.querySelector('#cmbProvince').value +"|"+
                             document.querySelector('#cmbCity').value +"|"+
                             document.querySelector('#cmbArea').value ;
                let age = document.querySelector('#age').value;
                if(this.title==''){
                    this.$store.commit('SET_TIPS','请填写标题')
                    return false
                }
                if(this.content==''){
                    this.$store.commit('SET_TIPS','请填写领养要求')
                    return false
                }
                if(this.imgArr.length==0){
                    this.$store.commit('SET_TIPS','请至少上传一张图片')
                    return false
                }
                let data = {
                    title:this.title,
                    imgArr:this.imgArr,
                    pet:[{
                        type:this.typeData[this.type],
                        sex:this.sexData[this.sex],
                        from:this.fromData[this.from],
                        immune:this.otherData[this.immune],
                        sterilization:this.otherData[this.sterilization],
                        insect:this.otherData[this.insect],
                        age:age
                    }],
                    content : this.content,
                    address:address
                };
                this.$store.dispatch('saveArticle',data).then(function(){
                   setTimeout(function(){
                       vm.$router.push('/user/article')
                   },500)
                })

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
//                return []
                if(this.$store.getters.getImgArr.length>0){
                    return this.$store.getters.getImgArr
                }else{
                    return []
                }
            }
        }

    }

    </script>

