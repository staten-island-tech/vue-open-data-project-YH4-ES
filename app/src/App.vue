<template>
    <DropOption id="DropOption" v-for="(value, key) in dropOptions[`bar1`][`Y`]" v-show="value || openedOptions[`bar1`][`Y`]" :option="key" @click="clickOption(key, value, `bar1`, `Y`)"/>
  <div>
    <RouterView/>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>