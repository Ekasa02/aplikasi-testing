<template>
    <div class="bg-white rounded-lg  overflow-hidden">
      <div class="flex flex-row items-center justify-start">
        <div class="w-1/4 mx-5">
          <img v-if="items.img_url" :src="items.img_url" class="w-[90px] h-[60px] md:w-[80px] md:h-[80px] rounded-full" alt="Profile picture">
          <img v-if="!items.img_url" src="../assets/Profil.svg" class="w-[80px] h-[80px] rounded-full border-2 border-solid" alt="Profile Picture">
        </div>
        <div class="w-3/4 pl-6 pr-20 ">
          <h2 class="text-xl font-bold">{{items.name}}</h2>
          <p>{{items.email}}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Component options
    data(){
      return{
        items:[]
      }
    },
    mounted (){
      this.getProfile();
    },
    methods:{
      async getProfile() {
            try {
                const response = await this.$axios.$get('/profiles')
                console.log('data'+ response)
                this.items = response.data
            } catch (e) {
                console.log(e)
            }
        }
    }
  }
  </script>
  
  <style scoped>
  /* Empty for now */
  </style>
  