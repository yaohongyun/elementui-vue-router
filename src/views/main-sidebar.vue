<template>
  <aside class="site-sidebar">
    <div class="site-sidebar__inner">
      <el-menu 
        default-active="home"
        class="el-menu-vertical-demo"
        background-color="#263238"
        text-color="#8a979e"
        active-text-color="#fff">
        <el-menu-item index="home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- <sub-menu></sub-menu> -->
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import SubMenu from '@/views/main-sidebar-sub-menu'
  export default {
    data() {
      return {
        menuList: []
      }
    },
    components: {
      SubMenu
    },
    created(){
      this.getMenuList()
    },
    methods: {
      // 获取路由
      getMenuList(){
        this.$API.menuList().then(({data}) => {
          if (data && data.code === 0){
            this.menuList = data.menuList
          }else{
            this.$message.error(data.msg)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>

</style>