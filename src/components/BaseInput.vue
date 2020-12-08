<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value" v-on="listeners" v-bind="$attrs" :class="inputClass" />
  </div>
</template>

<script>
import baseFieldMixin from '../mixins/baseFieldMixin';
export default {
  mixins: [baseFieldMixin],
  props: {
    inputClass: {
      type: [String, Array, Object]
    }
  }
};
</script>
