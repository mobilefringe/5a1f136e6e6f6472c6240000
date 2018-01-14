<template>
    <div class=" main_container" id="promotions_container" v-if="promotions"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <h3 class="promotion_heading">Up Coming Events & Promotions!</h3>
        <p class="exclusive_deals sub_title">Don’t miss our exclusive deals & events</p>
        <div class="row">
            <div class="col-md-4" v-for="promo in promotions">
                <hr class="show_phone">
                <div class="promo_list_container text_center">
                    <p class="top_promo_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
                    <div class="promo_list_img_container">
                        <!--<a :href="promo.image_url" target="_blank">-->
                        <img :src="promo.store.image_url" class="promo_list_img">
                            
                        <!--</a>-->
                    </div>
                    <p class="description_text">{{ promo.name }}</p>
                    <router-link :to="{ name: 'promotionDetails', params: { id: promo.slug }}" class="animated_btn text_center">Read More</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
  .center{
    text-align: center
  }
  .store-section a{
    color: #708090;
  }
  .top_promo_date{
      margin-top:10px;
  }
</style>

<script>
  define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, Vuex, moment, tz, VueMoment, Meta) {
    Vue.use(Meta);
    return Vue.component("promos-component", {
      template: template, // the variable template will be injected
      computed: {
        ...Vuex.mapGetters([
            'property',
            'timezone',
            'processedPromos',
        ]),
        promotions() {
        //   return this.$store.getters.processedPromos;
          var promos = this.$store.getters.processedPromos;
            promos.map(promo => {
                if(promo.store != null && promo.store != undefined && _.includes(promo.store.image_url, 'missing'))
                    promo.store.image_url = "//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/jpeg/1515531874445/canyon_crest_default.jpg";
            });
            return promos;
        },
        timezone () {
          return this.$store.getters.getTimezone;
        }
      }
    });
  });
</script>
