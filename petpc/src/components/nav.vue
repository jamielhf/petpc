<template>
    <div class="m-nav">
      <ul class="nav-ul">
          <li class="nav-li " :class = {active:isActive[0]} @click="handleClick(0)">
              <div>首页</div>
              <ul class="nav-ul-ul">
                  <li><a class="active">分类1</a></li>
                  <li><a>分类1</a></li>
              </ul>

          </li>
          <li class="nav-li"  :class = {active:isActive[1]}  @click="handleClick(1)">
              <div>已被领养</div>
              <ul class="nav-ul-ul">
                  <li><a class="active">本周</a></li>
                  <li><a>本月</a></li>
                  <li><a>历史</a></li>
              </ul>

          </li>
          <li class="nav-li" :class = {active:isActive[2]}   @click="handleClick(2)">
              <div>未被领养</div>
              <ul class="nav-ul-ul">
                  <li><a class="active">本周</a></li>
                  <li><a>本月</a></li>
                  <li><a>历史</a></li>
              </ul>

          </li>
          <li class="nav-li" :class = {active:isActive[3]}   @click="handleClick(3)">
              <div>发现</div>

          </li>
      </ul>
    </div>
</template>
<style  rel="stylesheet/scss" lang="scss">
    @import "../css/base/min";

    .m-nav{
        position: relative;
        width: 150px;
        margin-right: 20px;
        float: left;
        .nav-li{
            text-align: center;
            margin:10px 0 ;
            &.active, &:hover{
                div{

                    background-color: #dcdcdc;
                }
            }
            &.active{
                .nav-ul-ul{
                    display: block;
                }
            }
            div{
                transition: all .3s;
                cursor: pointer;
                padding: 5px;
                border-radius: 2px;
                color: #333;
                font-size: 16px;
                font-weight: 600;
            }
        }
        .nav-ul-ul{
            display: none;
        }
        .nav-ul-ul li{

            position: relative;
            margin: 10px 0;
            font-size: 14px;
            cursor: pointer;
            a{
                color: #999;
                text-decoration: none;
                transition: color .3s;
                &.active{
                    font-weight: 600;
                    color: $color;
                }
                &:hover{

                    color: $color;
                }

            }
        }
    }
</style>
<script>

    export default{
        data(){
            return{
                isActive:[1,0,0,0]
            }
        },
        methods:{
            handleClick:function (index) {
                this.isActive = [0,0,0,0];
                this.isActive[index] = 1
            }
        }

    }
</script>
