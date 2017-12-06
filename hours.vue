<template>
    <div class=" main_container" id="promotions_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <h3 class="promotion_heading">Up Coming Events & Promotions!</h3>
        <p class="exclusive_deals sub_title">Don’t miss our exclusive deals & events</p>
        <div class="row">
            <div class="col-md-4" v-for="promo in promotions">
                <div class="promo_list_container text_center">
                    <p>{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
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
        <div class="margin_25_across padding_top_20">
    
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12"> 
                            <h3 class="hours_heading" >Regular Shopping Hours</h3>
                            <div id="hours_container" class="hours_container">
                                    <div class="hours_div">
                                        <span>{{day}}:</span>
                                        <span>{{h}}</span>
                                    </div>
                            </div>
                            <div class="padding_top_20"></div>
                            <h3 class="hours_heading">Reduced Holiday Hours of Operation</h3>
                            <div id="holidays_hours_container" class="hours_container">
                                    <div class="hours_div">
                                        <span>{{holiday_name}} ({{formatted_date}})</span>
                                        <span>{{h}}</span>
                                    </div>
                            </div>
                            <div class="padding_top_20"></div>
                            <h3 class="hours_heading">Holiday Closures</h3>
                            <div id="closed_hours_container" class="hours_container">
                                    <div class="hours_div">
                                        <span>{{holiday_name}} ({{formatted_date}})</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 hidden_phone">
                    <img style="margin-bottom:20px;" src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512574241932/placeholder_insidepage_image.png" alt="plaza">
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
</style>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
    Vue.use(Meta);
    return Vue.component("hours-component", {
      template: template, // the variable template will be injected
      mounted () {
          console.log(this.hours);
          console.log(this.holidayHours);
      },
      computed: {
        promotions() {
          return this.$store.getters.processedPromos;
        },
        timezone () {
          return this.$store.getters.getTimezone;
        },
        hours () {
            return this.$store.getters.getPropertyHours;
        },
        holidayHours () {
            return this.$store.getters.getPropertyHolidayHours;
        
      }
    });
  });
</script>
