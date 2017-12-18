<template>
    <div class=" main_container" id="events_container"><!-- for some reason if you do not put an outer container div this component template will not render -->
        <h3 class="promotion_heading" v-if="property">Start your Career at {{property.name}}</h3>
        <p class="exclusive_deals sub_title">Join our family of dedicated professionals!</p>
        <div class="row" v-for="(jobs,store_name) in allJobs">
            <h2 class="store_details_promo_heading sub_title">
                    {{store_name}}
                </h2>
            <div id="promos_container">
                <div class="col-md-6 no_padding" v-for="promo in jobs" :data-cat="promo.cat_list">
                    <div class="promo_item cats_row is-table-row" v-if="promo">
                        <div class="col-md-5 col-xs-4 no_padding">
                            <img class="promo_store_image" :src="promo.store.image_url" :alt="promo.name" />
                        </div>
                        <div class="col-md-7  padding_tb_20">
                            <router-link :to="'/jobs/'+promo.slug" class="">
                                <h2 class="promo_list_name">{{promo.name}}</h2>
                            </router-link>
                            <p>
                                <span class="promo_dates sub_title">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</span>
                            </p>
                            <div class="promo_list_desc hidden_phone">{{truncate(promo.description) }}</div>
                            <div class="text_center position_relative hidden_phone">
                                <router-link :to="'/jobs/'+promo.slug" class="animated_btn text_center">Read More</router-link>
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
        allJobs() {
            var jobs = this.$store.getters.processedJobs;
            jobs = _.sortBy(jobs, [function(o) { if(o.store) return o.store.name; }]);
            // console.log(_.groupBy(jobs, job => job.store.name));
          return _.groupBy(jobs, job => if(o.store) job.store.name);
        },
        timezone () {
          return this.$store.getters.getTimezone;
        },
        property (){
            return this.$store.getters.getProperty;
        }
        
      },
      methods : {
          truncate(val_body){
            var truncate = _.truncate(val_body, { 'length': 75, 'separator': ' ' });
            return truncate;
        }
      }
    });
  });
</script>
