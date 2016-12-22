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

<script>
require('../css/nav.scss');
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
