<template>
  <div class="flex  items-center justify-between py-2 mt-auto">
    <div class="text-xs">Показано 1-10 из 10 записей</div>
    <ul class="list-none flex items-center">
      <li>
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
          <SvgIcon class="w-3 h-5" name="leftArrow"/>
        </button>
      </li>

      <!-- Visible Buttons Start -->
      <li
        v-for="page in pages"
        :class="{ active: isPageActive(page.name) }"
        class="rounded-full w-10 h-10 text-gray-55 border-2 border-gray-55 flex mx-1 justify-center items-center"
        :key="page.name"
      >
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
        >
          {{ page.name }}
        </button>
      </li>
      <!-- Visible Buttons End -->

      <li>
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
        >
          <SvgIcon class="w-3 h-5" name="rightArrow"/>
        </button>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },    
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }
      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
};
</script>
<style>
.active {
  background-color: #6160DC;
  color: #ffffff;
  border-width: 1px;
}
</style>