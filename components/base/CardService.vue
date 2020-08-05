<template>
  <div :class="classes" class="pt-2">
    <base-avatar
      v-if="icon"
      color="primary"
      dark
      :icon="icon"
      :outlined="outlined"
      :size="size"
      class="mb-3"
    />

    <div :class="horizontal && name && 'ml-6'">
      <base-title :title="name" class="text-uppercase" space="3" />

      <base-body
        v-if="description || $slots.default"
        :space="horizontal ? 0 : undefined"
        :description="description"
        class="mx-auto"
        max-width="700"
      >
        <slot />
      </base-body>
    </div>
  </div>
</template>

<script>
// Mixins
import Heading from "@/mixins/heading";

export default {
  name: "BaseAvatarCard",

  mixins: [Heading],

  props: {
    align: {
      type: String,
      default: "left"
    },
    horizontal: Boolean,
    icon: String,
    outlined: {
      type: Boolean,
      default: true
    },
    space: {
      type: [Number, String],
      default: 8
    },
    size: {
      type: [Number, String],
      default: 72
    },
    description: String,
    name: String
  },

  computed: {
    classes() {
      const classes = [`mb-${this.space}`];

      if (this.horizontal) {
        classes.push("d-flex");

        if (!this.$slots.default && !this.description) {
          classes.push("align-center");
        }
      }

      return classes;
    }
  }
};
</script>
