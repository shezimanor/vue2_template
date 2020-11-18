<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/random-user">Random user</router-link>
    </div>
    <router-view />
  </div>
</template>
