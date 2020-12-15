<template>
  <div>
    Start My App Idea
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {};
  },
  methods: {
    async demoDispatch() {
      const response = await this.$store.dispatch('user/getUser', this.tempUserProfile);
      // 處理錯誤
      if (response.type !== this.responseType.CONNECT_CORRECT) {
        alert(response.message);
      }
      // 沒有錯誤！繼續執行資料處理
      // ...
    }
  }
};
</script>
