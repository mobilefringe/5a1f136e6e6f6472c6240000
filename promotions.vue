<template>
    <div class=" main_container" id="promotions_container" v-if="dataloaded"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <h3 class="promotion_heading">Up Coming Events & Promotions!</h3>
        <p class="exclusive_deals sub_title">Don’t miss our exclusive deals & events</p>
        <div class="row">
            <div class="col-sm-4" v-for="promo in promotions">
                <hr class="show_phone">
                <div class="promo_list_container text_center">
                    <p class="top_promo_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
                    <div class="promo_list_img_container">
                        <!--<a :href="promo.image_url" target="_blank">-->
                        <img :src="promo.store.store_front_url_abs" class="promo_list_img">
                            
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
            data: function() {
                return {
                    dataloaded: false
                }
            },
            created () {
                this.$store.dispatch("getData", "promotions").then(response => {
                    this.dataloaded = true;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });    
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedPromos',
                ]),
                promotions() {
                    //   return this.$store.getters.processedPromos;
                    // var promos = this.processedPromos;
                    // console.log("promos 1", this.processedPromos);
                    // // console.log(this);
                    // var vm= this;
                    // promos.map(promo => {
                    //     if (promo.store != null && promo.store != undefined && _.includes(promo.store.store_front_url_abs, 'missing')) {
                    //         promo.store.store_front_url_abs = vm.property.default_logo_url;
                    //     }
                    //     else if (promo.store == null || promo.store == undefined) {
                    //         promo.store = {};
                    //         promo.store.store_front_url_abs =  vm.property.default_logo_url;
                    //     }
                    // });
                    // console.log("promos 2", promos);
                    // return promos;
                    var vm = this;
                    var temp_promo = [];
                    var temp_job = [];
                    _.forEach(this.processedPromos, function(value, key) {
                        today = moment().tz(vm.timezone);
                        webDate = moment(value.show_on_web_date).tz(vm.timezone)
                        if (today.format('DMY') >= webDate.format('DMY')) {
                            value.description_short = _.truncate(value.description, {
                                'length': 150
                            });
                            value.description_short_2 = _.truncate(value.description_2, {
                                'length': 150
                            });
                            if (value.store != null && value.store != undefined && _.includes(value.store.image_url, 'missing')) {
                                value.store.image_url = vm.operty.default_logo_url;
                            }
                            else if (value.store == null || value.store == undefined) {
                                value.store = {};
                                value.store.image_url =  vm.property.default_logo_url;
                            }
                            temp_promo.push(value);
                        }
                    });
                    _.sortBy(temp_promo, [function(o) { return o.start_date; }]);
                    return temp_promo;
                },
            },
        });
    });
</script>