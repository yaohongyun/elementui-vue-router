<template>
  <el-submenu v-if="menu.list && menu.list.length >= 1" :index="menu.menuId + ''">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
      v-for="item in menu.list" 
      :key="item.menuId"
      :menu="item"
      :dynamicMenuRoutes="dynamicMenuRoutes">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.menuId + ''" @click="gotoRouteHandle(menu)">
    <i class="el-icon-location"></i>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
  import SubMenu from '@/views/main-sidebar-sub-menu'
  export default {
    name: 'sub-menu',
    components: {
      SubMenu
    },
    props: {
      menu: {
        type: Object,
        required: true
      },
      dynamicMenuRoutes: {
        type: Array,
        required: true
      }
    },
    methods: {
      // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
      gotoRouteHandle (menu) {
        var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.menuId)
        if (route.length >= 1) {
          this.$router.push({ name: route[0].name })
        }
      }
    },
  };
</script>

<style>
</style>