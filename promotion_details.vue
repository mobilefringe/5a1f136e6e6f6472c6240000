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
        <div class="promo_main_header sub_title" v-if="storePromos" style="border-top: 1px solid #000;">
               OTHER {{currentPromo.store.name | uppercase }} PROMOTIONS
        </div>
        <div id="promos_container" v-if="storePromos">
            <div class="col-md-6 no_padding" v-for="promo in storePromos" :data-cat="promo.cat_list">
                <div class="promo_item cats_row is-table-row">
                    <div class="col-md-5 no_padding">
                        <img class="promo_store_image" :src="promo.image_url" :alt="promo.name" />
                    </div>
                    <div class="col-md-7 padding_tb_20">
                        <h2 class="promo_list_name">{{promo.name}}</h2>
                        <p>
                            <span class="promo_dates sub_title">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</span>
                        </p>
                        <div class="promo_list_desc">{{promo.description_short }}</div>
                        <div class="text_center position_relative">
                            <router-link :to="'/promotions/'+promo.slug" class="animated_btn text_center">Read More</router-link>
                        </div>
                    </div>
                </div>
            </div>
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
            if(this.currentPromo != null) {
            var vm = this;
            var temp_promo = [];
            var current_id =_.toNumber(this.currentPromo.id);
            // console.log(x);
            _.forEach(this.currentPromo.store.promotions, function(value, key) {
                if(_.toNumber(value) != current_id){
                    var current_promo = vm.findPromoById(value);
                    current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
                    temp_promo.push(current_promo);
                }
            });
            this.storePromos = temp_promo;
            console.log("promos",this.storePromos);
            }
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
