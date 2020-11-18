<template>
  <div class="">
    <h1>Random User</h1>
    <div v-if="users.length > 0">
      <div v-for="user in users" :key="user.login.uuid">
        <div>{{ `${user.name.first} ${user.name.last}` }}</div>
        <img :src="user.picture.thumbnail" :alt="user.name.first" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RandomUser',
  components: {},
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      try {
        const { data } = await this.axios.get('https://randomuser.me/api/?gender=female');
        console.log(data.results[0]);
        this.users = data.results;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
