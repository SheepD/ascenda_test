<template>
  <div class="section hotel-card" @click="toggleDescription">
    <div class="container">
      <div class="columns">
        <div class="column is-2 is-offset-2"><img :src="photo" /></div>
        <div class="column is-6">
          <div class="hotel-mini-details">
            <div>{{ name }}</div>
            <div>
              <span>Rating: {{ rating }}</span>
              <span>{{ `(${stars} Stars)` }}</span>
            </div>
            <div>{{ address }}</div>
            <div v-if="priceLoading">Price Information Loading</div>
            <div v-else>{{ price ? price : "Rates unavailable" }}</div>
          </div>
          <div v-html="description" v-show="displayDescription" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotelCard",

  props: {
    name: String,
    rating: Number,
    stars: Number,
    address: String,
    description: String,
    photo: String,
    price: String,
    priceLoading: Boolean
  },

  data() {
    return {
      displayDescription: false
    };
  },

  methods: {
    toggleDescription() {
      this.displayDescription = !this.displayDescription;
    }
  }
};
</script>

<style scoped>
.hotel-card:hover {
  cursor: pointer;
  background-color: #eee;
}

.hotel-mini-details {
  text-align: left;
  margin-bottom: 7px;
  padding-bottom: 7px;
  border-bottom: 1px solid #000;
}
</style>
