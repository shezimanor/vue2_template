export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  computed: {
    listeners() {
      const vm = this;
      return {
        ...vm.$listeners,
        // 覆寫原本的 $listeners
        input(event) {
          vm.$emit('input', event.target.value);
        }
      };
    }
  }
};
