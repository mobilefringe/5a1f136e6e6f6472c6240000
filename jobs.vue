<template>
    <div class=" main_container" id="events_container"><!-- for some reason if you do not put an outer container div this component template will not render -->
        <h3 class="promotion_heading" v-if="property">Start your Career at {{property.name}}</h3>
        <p class="exclusive_deals sub_title">Join our family of dedicated professionals!</p>
        <div class="row">
            <div id="promos_container">
                <div class="col-md-6 no_padding" v-for="promo in jobs" :data-cat="promo.cat_list">
                    <div class="promo_item cats_row is-table-row">
                        <div class="col-md-5 no_padding">
                            <img class="promo_store_image" :src="promo.store.image_url" :alt="promo.name" />
                        </div>
                        <div class="col-md-7 padding_tb_20">
                            <h2 class="promo_list_name">{{promo.name}}</h2>
                            <p>
                                <span class="promo_dates sub_title">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</span>
                            </p>
                            <div class="promo_list_desc">{{promo.description }}</div>
                            <div class="text_center position_relative">
                                <router-link :to="'/promotions/'+promo.slug" class="animated_btn text_center">Read More</router-link>
                            </div>
                        </div>
                    </div>
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
    return Vue.component("jobs-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          success_subscribe : false
        }
      },
      computed: {
        jobs() {
            // var promos = this.$store.getters.processedEvents;
            // console.log(this.$store);
            // _.forEach(promos, function (val) {
            //     if(val.description.length >50) {
            //       val.description = _.truncate(val.description, {'length':50,'separator': ' '})
            //     }
            // });
            var jobs = this.$store.getters.processedJobs;
            console.log(_.groupBy(jobs, job => job.store.name));
          return jobs;
        },
        timezone () {
          return this.$store.getters.getTimezone;
        },
        property (){
            return this.$store.getters.getProperty;
        },
        truncate(val_body){
            var truncate = _.truncate(val_body, { 'length': 75, 'separator': ' ' });
            return truncate;
        }
      }
    });
  });
</script>
