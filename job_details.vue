<template>
    <div class="row main_container" v-if="currentJob">
        <div class="promo_main_header sub_title" v-if="property">
                {{currentJob.store.name | uppercase}}
        </div>
        <div class="row mobile_padding" id="promo_details_container">
            <div class="col-md-4">
                <img :src="currentJob.store.image_url"  alt="Store Logo" class="details_image" />
            </div>
            <div class="col-md-8">
                <h2 class="promo_list_name">{{currentJob.name}}</h2>
                <p class="promo_dates sub_title">{{currentJob.start_date | moment("MMM D", timezone)}} - {{currentJob.end_date | moment("MMM D", timezone)}}</p>
                <div class="store_details_desc">{{currentJob.description}}</div>
                <div class="text_center padding_tb_20">
                    <social-sharing :url="shareURL(currentJob.slug)" :title="currentJob.title" :description="currentJob.body" :quote="truncate(currentJob.description)" twitter-user="ShopCanyonCrest" :media="currentJob.image_url" inline-template>
                        <div class="blog-social-share">
                            <h5>Share this promotion</h5>
                            <network network="facebook">
                                <img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512057980767/fb@2x_whiteborder.png" class="" alt="">
                            </network>
                            <network network="twitter">
                                <img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512058120246/twt@2x_whiteborder.png" class="" alt="">
                            </network>
                        </div>
                    </social-sharing>
                </div>
            </div>
        </div>
        <div class="promo_main_header sub_title" v-if="storePromos && property" style="border-top: 1px solid #000;">
               OTHER {{currentJob.store.name | uppercase }} JOBS
        </div>
        <div id="promos_container" v-if="storePromos">
            <div class="col-md-6 no_padding" v-for="promo in storePromos" :data-cat="promo.cat_list">
                <div class="promo_item cats_row is-table-row">
                    <div class="col-md-5 no_padding">
                        <img class="promo_store_image" :src="promo.store.image_url" :alt="promo.name" />
                    </div>
                    <div class="col-md-7 padding_tb_20">
                        <h2 class="promo_list_name">{{promo.name}}</h2>
                        <p>
                            <span class="promo_dates sub_title">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</span>
                        </p>
                        <div class="promo_list_desc">{{promo.description_short }}</div>
                        <div class="text_center position_relative">
                            <router-link :to="'/jobs/'+promo.slug" class="animated_btn text_center">Read More</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
    return Vue.component("job-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          currentJob: null,
          success_subscribe : false,
          storePromos : null
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentJob = vm.findJobBySlug(to.params.id);
          if (vm.currentJob === null || vm.currentJob === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentJob = this.findJobBySlug(to.params.id);
        if (this.currentJob === null || this.currentJob === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      watch : {
        currentJob : function (){
            var vm = this;
            var temp_promo = [];
            var current_id =_.toNumber(this.currentJob.id);
            var job_id = this.currentJob.jobable_id ;
            console.log(current_id);
            _.forEach(this.allJobs, function(value, key) {
                console.log(value)
                if(_.toNumber(value.id) != current_id && _.toNumber(value.jobable_id) == job_id){
                    var current_promo = vm.findJobById(value.id);
                    current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
                    temp_promo.push(current_promo);
                }
            });
            this.storePromos = temp_promo;
            console.log("promos",this.storePromos);
        }  
      },
      computed: {
        findJobBySlug () {
          return this.$store.getters.findJobBySlug;
        },
        findJobById () {
          return this.$store.getters.findJobById;
        },
        allJobs () {
             return this.$store.getters.processedJobs;
        },
        timezone() {
          return this.$store.getters.getTimezone;
        },
        property (){
            return this.$store.getters.getProperty;
        }
      },
      methods: {
                truncate(val_body){
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
                shareURL(slug){
                    // console.log(window.location.host, "\n http://"+ window.location.host);
                    var share_url = "http://www.shopcanyoncrest.com/promotions/" + slug;
                    return share_url;
                }
            }
    });
  });
</script>
