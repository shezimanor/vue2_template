<template>
  <!-- Now we can render the icon using the v-html attribute and the svg computed property: -->
  <div class="icon-wrapper"
    :style="{
      color: iconColor
    }"
  >
    <i :data-feather="name"></i>
    <slot></slot>
  </div>
</template>

<script>
// https://github.com/feathericons/feather
import feather from 'feather-icons';
export default {
  name: 'Icon',
  // This way, our BaseIcon is designed to be able to draw any symbol.
  // we want it to from the feather-icons library.
  // When we place our BaseIcon component within the template of a parent component,
  // we can feed it a name via props, which BaseIcon will render the symbol that matches the name.
  // <BaseIcon name="activity" width="48" height="48" />
  // To increase the reusability of our component, we should make the name of the icon a prop:
  props: {
    name: String, // the name of the symbol we want to use
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    iconColor: {
      type: String,
      default: '#000'
    }
  },
  mounted() {
    feather.replace({
      class: 'icon',
      width: this.width, // new prop
      height: this.height // new prop
    });
  },
  computed: {
    // On the topic of props, the toSvg method allows other optional configurations such as width and height to control the size of the icon.
    svg() {
      return feather.icons[this.name].toSvg({
        class: 'icon',
        width: this.width, // new prop
        height: this.height // new prop
      });
    }
  }
};
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 6px;
}
</style>
