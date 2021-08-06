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
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import SubMenu from '@/views/main-sidebar-sub-menu'
  import { isURL } from '@/utils/validate'
  export default {
    data() {
      return {
        dynamicMenuRoutes: [],
        menuList: []
      }
    },
    components: {
      SubMenu
    },
    created(){
      this.getMenuList()
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
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
      },
      // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || '',
              params: route.params,
              query: route.query
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      }
    }
  }
</script>

<style>

</style>