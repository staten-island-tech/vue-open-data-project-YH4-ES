<template>
    <div>
        <p>{{ props.option }}</p>
    </div>
</template>

<script setup>

const props = defineProps({
    option : {
        type : String,
        required : true
    }
})

</script>

<style lang="css" scoped>

</style>