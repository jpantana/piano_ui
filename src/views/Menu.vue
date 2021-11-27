<template>
  <h1>Menu Page</h1>
  <p>Items:</p>
  <div v-for="item in items" :key="item.id">{{item.name}}</div>
  <button @click="getItems">Get all</button>
  <hr />
  <div>{{selectedItem.name}}</div>
  <input v-model="itemId" type="number" />>
  <button @click="getItemById" :disabled="hasIdSpeficied">Get by Id</button>
</template>

<script>
import {getAllItems, getItemById} from '@/utils/data/items.data.js';

export default {
  data: () => ({
    items: [],
    selectedItem: {},
    itemId: null,
  }),
  computed: {
    hasIdSpeficied() {
      return !this.itemId;
    },
  },
  methods: {
    async getItems() {
      const results = await getAllItems();
      if (results) {
        this.items = results.results;
      }
    },
    async getItemById() {
      const result = await getItemById(this.itemId);
      if (result) {
        console.warn(result.results)
        this.selectedItem = result.results[0];

      }
    },
  },
}
</script>