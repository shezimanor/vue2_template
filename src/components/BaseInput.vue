<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value" v-on="listeners" v-bind="$attrs" :class="inputClass" />
  </div>
</template>

<script>
import formFieldMixin from '../mixins/formFieldMixin';
export default {
  mixins: [formFieldMixin],
  props: {
    inputClass: {
      type: [String, Array, Object]
    }
  }
};
</script>
