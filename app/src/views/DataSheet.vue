<template>
    <div class="dropDiv">
        <DropOption
            v-for="(value, key) in shownExpandData[`xValue`]",
            :option="value"
            class="dropoption"
        />
    </div class="dropDiv">
    <div id="rightDrop">

        <DropOption
            v-for="(value, key) in shownExpandData[`yValue`]",
            :option="value"
            class="dropoption"
        />
    </div>
</template>

<script setup>
import { shownExpandData } from '@/store';
import DropOption from '@/Components/DropOption.vue';

console.log(shownExpandData)
</script>

<style lang="css" scoped>

#rightDrop{
    float: right;
}
.dropDiv{
    width: fit-content;
    float: left;
}

</style>