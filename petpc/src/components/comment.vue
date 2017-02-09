<template>
    <div class="m-comments">
        <p class="c-title">评论</p>
        <div class="c-p">
            <img src="http://localhost:3000/user/20170117/file-1484533279305.png">
            <textarea placeholder="说说你的想法" @keyup.enter="enter" ></textarea>
            <div class="c-submit clearfix" >
                <div class="c-btn" >评论</div>
            </div>
        </div>
        <div class="c-comments">
            <div class="comments-list">
                <img src="http://localhost:3000/user/20170117/file-1484533279305.png">
                <p class="c-name">卑劣者</p>
                <time>2017.02.09 13:17</time>
                <p class="c-content">拍马屁，我只服那一句“笔神落惊风雨，诗成泣鬼”</p>
                <span @click = "showReply">回复</span>
                <div class="c-reply content">
                    <textarea placeholder="对 卑劣者 的回复"></textarea>
                    <a @click="cancel" class="c-btn cancel">取消</a>
                    <a class="c-btn sure">确定</a>
                </div>
            </div>
            <div class="comments-list">
                <img src="http://localhost:3000/user/20170117/file-1484533279305.png">
                <p class="c-name">卑劣者</p>
                <time>2017.02.09 13:17</time>
                <p class="c-content">拍马屁，我只服那一句“笔落惊风雨，诗成泣鬼神”</p>
                <span @click = "showReply">回复</span>
                <div class="c-reply">
                    <textarea placeholder="对 卑劣者 的回复"></textarea>
                    <a  @click="cancel" class="c-btn cancel">取消</a>
                    <a class="c-btn sure">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang = "scss" >
    @import "../css/base/min";
   .m-comments{
       position: relative;
       width: 800px;
       margin: 30px auto;
       padding:20px;
       box-sizing: border-box;
       background-color: #fff;
       border-top:1px solid #f1f1f1;
       .c-title{
           text-align: center;
           color: #909090;
           font-size: 18px;
           padding: 20px 0;
       }
       .c-submit{
           position: relative;
           width: 100%;
           height: 40px;
           margin-top: 20px;
           left:30px;
           .c-btn{
               top:5px;
               right: 0;
           }
       }
       .c-p{
           position: relative;
           width: 600px;
           margin: 0 auto 30px;
           background-color: #f8f9fa;
           border: 1px solid #f1f1f1;
           padding:20px 50px;
           img{
               position: absolute;
               display: block;
               left: 1.5em;
               top: 20px;
               width:40px;
               height: 2.5em;
           }
           textarea{
               left: 30px;
               top:0;
               height: 80px;;
           }

       }
       .c-comments{
            position: relative;
           width: 600px;
           margin:0 auto;
       }
       .comments-list{
           position: relative;
           padding: 20px;
           box-sizing: border-box;
           border-bottom:1px solid #f1f1f1;
           img{
               display: inline-block;
               border-radius: 100%;
               width: 40px;
               height: 40px;
               border:1px solid #f1f1f1;
           }
           .c-name{
               position: absolute;
               display: inline-block;
               color: #666;
               left: 70px;;
           }
           .c-content{
               color: #333;
               line-height: 2;
               padding-top: 10px;;
           }
           time{
               position: absolute;
               left: 70px;;
               top:40px;
               display: inline-block;
               color: #999;
               font-size: 12px;;
           }
           &:hover{
               span{
                   display: block;
               }
           }
           span{
               position: absolute;
               z-index: 3;
               right: 40px;
               top:30px;
               color: $color;
               display: none;
               cursor: pointer;
           }
       }
       .c-reply{
           position: relative;
           transition:all .3s;
           margin-bottom: 50px;
           display: none;
           textarea{
               margin-top: 10px;
               height: 80px;
           }
           .sure{
                margin-top: 10px;;
               right: 0;
           }
           .cancel{
                background-color: #fff;
               color: $color;
               border: 1px solid $color;
               box-sizing: border-box;
               margin-top: 10px;;
               right: 80px;
           }
           &.z-show{
               display: block;
           }
       }
       textarea{
           position: relative;
           height: 40px;
           border-radius: 4px;
           border: 1px solid #ddd;
           display: block;
           padding: 8px;
           transition: border .3s;
           background: #fff;
           box-sizing: border-box;
           width:100%;
           resize: none;
           &:focus{
               border-color: $color
           }
       }
       .c-btn{
           position: absolute;
           text-decoration: none;
           cursor: pointer;
           display: inline-block;
           background: $color;
           color: #fff;
           font-size: 14px;
           border-radius: 2px;
           border: none;
           padding:5px 12px;
       }
   }
</style>
<script>

    export default{
        data(){
            return{
                heightNum:80,
            }
        },
        methods:{
            enter(){

            },
            showReply(e){
                let d = e.target.parentNode.querySelector('.c-reply').classList;
               if(d.value.indexOf('z-show')>=0){
                   d.remove('z-show')
               }else{
                   d.add('z-show')
               }

            },
            cancel(e){
                e.target.parentNode.classList.remove('z-show');
            }
        }

    }
</script>
