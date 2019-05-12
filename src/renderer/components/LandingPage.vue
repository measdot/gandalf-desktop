<template>
  <split-pane :default-percent='10' split="horizontal">
    <template slot="paneL">
      TOOLBAR
    </template>

    <template slot="paneR">
      <split-pane  :default-percent='25' split="vertical">
        <template slot="paneL">
          <sidebar></sidebar>
        </template>
        <template slot="paneR">
         TASKBAR
        </template>
      </split-pane>
    </template>

  </split-pane>
</template>
<style>
  #app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

<script>
import SideBar from './SideBar'
export default {
  components: {
    'sidebar': SideBar
  }
}
</script>
