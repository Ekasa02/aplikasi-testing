<template>
    <div class="bg-[#33333385] fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center font-montserrat">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <div class="">
                <img src="../assets/CloseCircle.svg" alt="image" class="cursor-pointer float-right" @click="closeDelete">
            </div>
            <div class="px-5 items-center justify-center font-montserrat">
                <img class="mx-auto" src="../assets/Delete.svg" alt="image">
                <p class="text-center py-2 mt-4">Are you sure you want to delete your account?<br>All your data will be lost after you delete your account</p>
            </div>
            <div class="flex pt-[30px] justify-center items-center gap-x-5">
                <button
                    class="bg-[#FFFFFF] font-['Montserrat'] text-[#554AF0] font-bold py-2 px-4 rounded border border-[#554AF0] hover:text-white hover:bg-red-500"
                    @click="closeDelete">
                    Cancel
                </button>
                <button class="font-['Montserrat'] bg-[#554AF0] text-white font-bold py-2 px-4 rounded" @click="deleteProfile">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            userId: '',
        }
    },
    mounted() {
        this.getProfile();
    },
    methods: {
        async deleteProfile() {
            try {
                await this.$axios.delete(`/users/${this.userId}`);
                window.location.reload();
                this.$router.push("/");
            } catch (error) {
                console.log(error);
            }
        },
        closeDelete() {
            this.$emit("closeDelete");
        },
        async getProfile() {
            try {
                const response = await this.$axios.get(`/profiles`);
                console.log(response);
                this.userId = response.data.data.id
                // Additional logic or actions after deleting the item
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
  