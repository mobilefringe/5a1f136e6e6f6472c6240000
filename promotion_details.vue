<template>
    <div class="row main_container" v-if="currentPromo">
        <div class="promo_main_header sub_title">
                {{currentPromo.store.name | uppercase}}
        </div>
        <div class="row mobile_padding" id="promo_details_container">
            <div class="col-md-4">
                <img :src="currentPromo.image_url"  alt="Store Logo" class="details_image" />
            </div>
            <div class="col-md-8">
                <h2 class="promo_list_name">{{currentPromo.name}}</h2>
                <p class="promo_dates sub_title">{{currentPromo.start_date | moment("MMM D", timezone)}} - {{currentPromo.end_date | moment("MMM D", timezone)}}</p>
                <div class="store_details_desc">{{currentPromo.description}}</div>
                <div class="text_center padding_top_20">
                    <social-sharing :url="shareURL(currentPromo.slug)" :title="currentPromo.title" :description="currentPromo.body" :quote="truncate(currentPromo.description)" twitter-user="ShopCanyonCrest" :media="currentPromo.image_url" inline-template>
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
        <div class="promo_main_header sub_title">
               OTHER {{currentPromo.store.name | uppercase }} PROMOTIONS
        </div>
    </div>
</template>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-social-sharing"], function(Vue, moment, tz, VueMoment, SocialSharing) {
    return Vue.component("promo-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          currentPromo: null,
          storePromos : null
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentPromo = vm.findPromoBySlug(to.params.id);
          if (vm.currentPromo === null || vm.currentPromo === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentPromo = this.findPromoBySlug(to.params.id);
        if (this.currentPromo === null || this.currentPromo === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      watch : {
        currentPromo : function (){
            console.log("currentStore promo",this.currentStore );
            var vm = this;
            var temp_promo = [];
            var temp_job = [];
            _.forEach(this.currentStore.promotions, function(value, key) {
                // console.log(vm.findPromoById(value));
                var current_promo = vm.findPromoById(value);
                current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
                temp_promo.push(current_promo);
            });
            _.forEach(this.currentStore.jobs, function(value, key) {
                var current_job = vm.findJobById(value);
                current_job.description_short = _.truncate(current_job.description, {'length': 70});
                temp_job.push(current_job);
                
            })
            this.promotions = temp_promo;
            this.jobs = temp_job;
            console.log("promos",this.promotions);
        }  
      },
      computed: {
        findPromoBySlug () {
          return this.$store.getters.findPromoBySlug;
        },
        findPromoById () {
                    return this.$store.getters.findPromoById;
                },
        timezone() {
          return this.$store.getters.getTimezone;
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
