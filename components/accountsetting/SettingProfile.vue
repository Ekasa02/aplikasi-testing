<template>
    <div>
        <div class="flex items-center justify-end py-[14px] pr-10 border-b-[1px] border-gray-300">
            <div class="ml-auto">
                <button @click="showProfile" class="m-0 p-0">
                    <LogibugProfile />
                </button>
            </div>
        </div>
        
    </div>
</template>

<script>
import LogibugProfile from '../major/LogibugProfile.vue';

export default {
    components: { LogibugProfile },
    data() {
        return {
            showPopup: false
        }
    },
    methods: {
        showProfile() {
            this.$emit("showProfile");
        },
    }
}
</script>

<style lang="scss" scoped></style>