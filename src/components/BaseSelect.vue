<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" v-on="listeners" v-bind="$attrs" :class="selectClass">
      <option v-for="option in options" :value="option" :key="option.id" :selected="option === value">{{
        option
      }}</option>
    </select>
  </div>
</template>

<script>
import baseFieldMixin from '../mixins/baseFieldMixin';
export default {
  mixins: [baseFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    },
    selectClass: {
      type: [String, Array, Object]
    }
  }
};
</script>
