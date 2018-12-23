import Vue from "vue";
import Router from "vue-router";
import ResultPage from "./views/ResultPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "homePage",
      component: ResultPage
    },
    {
      path: "/:currency",
      name: "resultPage",
      component: ResultPage
    }
  ]
});
