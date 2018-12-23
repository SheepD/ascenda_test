<template>
  <div>
    <select v-model="currency">
      <option>USD</option>
      <option>SGD</option>
      <option>CNY</option>
      <option>KRW</option>
    </select>

    <div>
      <div v-if="hotelsLoading">Loading hotel information</div>
      <hotel-card
        v-else
        v-for="hotel in hotels"
        :key="hotel.id"
        :name="hotel.name"
        :rating="hotel.rating"
        :stars="hotel.stars"
        :address="hotel.address"
        :description="hotel.description"
        :photo="hotel.photo"
        :price="hotel.price"
        :priceLoading="priceLoading"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HotelCard from "../components/HotelCard";

export default {
  name: "ResultPage",

  components: {
    HotelCard
  },

  created() {
    this.hotelsLoading = true;
    axios
      .get("https://5c08f37bea3172001389ccbd.mockapi.io/hotels/tokyo")
      .then(response => {
        const hotels = response.data;
        this.hotels = hotels;
        this.hotelsLoading = false;
        this.fetchCurrency();
      });
  },

  data() {
    return {
      hotelsLoading: false,
      hotels: [],
      currency: this.$route.params.currency || "USD",
      priceLoading: false
    };
  },

  watch: {
    currency(newValue) {
      this.$router.history.push({
        name: "resultPage",
        params: { currency: newValue }
      });
      this.fetchCurrency();
    }
  },

  methods: {
    currencyUrl() {
      switch (this.currency) {
        case "USD":
          return "http://5c08f37bea3172001389ccbd.mockapi.io/hotels/tokyo/1/USD";
        case "SGD":
          return "http://5c08f37bea3172001389ccbd.mockapi.io/hotels/tokyo/1/SGD";
        case "CNY":
          return "http://5c08f37bea3172001389ccbd.mockapi.io/hotels/tokyo/1/CNY";
        case "KRW":
          return "http://5c08f37bea3172001389ccbd.mockapi.io/hotels/tokyo/1/KRW";
        default:
          return null;
      }
    },

    currencyFormatter() {
      if (["USD", "SGD", "CNY"].includes(this.currency)) {
        return amount => {
          return `${this.currency} ${Math.round(amount).toLocaleString()}`;
        };
      } else if (this.currency === "KRW") {
        return amount => {
          var price = Math.trunc(amount / 100) * 100;
          return `${this.currency} ${price.toLocaleString()}`;
        };
      } else {
        return undefined;
      }
    },

    fetchCurrency() {
      this.priceLoading = true;
      axios.get(this.currencyUrl()).then(
        function(response) {
          this.priceLoading = false;
          const prices = response.data;
          const formatter = this.currencyFormatter();

          // merge prices into hotel obj array
          const hotemp = this.hotels.map(hotel => {
            const price = prices.find(curr => curr.id === hotel.id);

            return {
              ...hotel,
              price: price ? formatter(price.price) : undefined
            };
          });

          this.hotels = hotemp.sort((a, b) => {
            if (a.price) {
              if (b.price) {
                return 0;
              } else {
                return -1;
              }
            } else {
              if (b.price) {
                return 1;
              } else {
                return 0;
              }
            }
          });
        }.bind(this)
      );
    }
  }
};
</script>

<style></style>
