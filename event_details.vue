<template>
    <div class="row main_container" v-if="currentEvent">
        <div class="promo_main_header sub_title" v-if="property">
                {{property.name | uppercase}}
        </div>
        <div class="row mobile_padding" id="promo_details_container">
            <div class="col-md-4 col-sm-4">
                <img :src="currentEvent.image_url"  alt="Store Logo" class="details_image" />
            </div>
            <div class="col-md-8 col-sm-8">
                <h2 class="promo_list_name">{{currentEvent.name}}</h2>
                <p class="promo_dates sub_title">{{currentEvent.start_date | moment("MMM D", timezone)}} - {{currentEvent.end_date | moment("MMM D", timezone)}}</p>
                <div class="store_details_desc">{{currentEvent.description}}</div>
                <div class="text_center padding_tb_20">
                    <social-sharing :url="shareURL(currentEvent.slug)" :title="currentEvent.title" :description="currentEvent.body" :quote="truncate(currentEvent.description)" twitter-user="ShopCanyonCrest" :media="currentEvent.image_url" inline-template>
                        <div class="blog-social-share">
                            <h5>Share this promotion</h5>
                            <div class="social_share">
                                <network network="facebook">
                                    <img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512057980767/fb@2x_whiteborder.png" class="" alt="">
                                </network>
                                <network network="twitter">
                                    <img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512058120246/twt@2x_whiteborder.png" class="" alt="">
                                </network>
                            </div>
                        </div>
                    </social-sharing>
                </div>
            </div>
        </div>
        <div class="promo_main_header sub_title" v-if="storePromos.length > 0 && property" style="border-top: 1px solid #000;">
               OTHER {{property.name | uppercase }} EVENTS
        </div>
        <div id="promos_container" v-if="storePromos">
            <div class="col-md-6 col-sm-6 no_padding" v-for="promo in storePromos" :data-cat="promo.cat_list">
                <div class="promo_item cats_row is-table-row">
                    <div class="col-md-5 col-xs-4 no_padding">
                        <img class="promo_store_image" :src="promo.store.image_url" :alt="promo.name" />
                    </div>
                    <div class="col-md-7 padding_tb_20">
                        <router-link :to="'/events/'+promo.slug" class="">
                            <h2 class="promo_list_name">{{promo.name}}</h2>
                        </router-link>
                        <p>
                            <span class="promo_dates sub_title">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</span>
                        </p>
                        <div class="promo_list_desc hidden_phone">{{promo.description_short }}</div>
                        <div class="text_center position_relative hidden_phone">
                            <router-link :to="'/events/'+promo.slug" class="animated_btn text_center">Read More</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
        return Vue.component("event-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentEvent: null,
                    success_subscribe: false,
                    storePromos: null
                }
            },
            beforeRouteEnter(to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentEvent = vm.findEventBySlug(to.params.id);
                    if (vm.currentEvent === null || vm.currentEvent === undefined) {
                        vm.$router.replace({
                            name: '404'
                        });
                    }
                })
            },
            beforeRouteUpdate(to, from, next) {
                this.currentEvent = this.findEventBySlug(to.params.id);
                if (this.currentEvent === null || this.currentEvent === undefined) {
                    this.$router.replace({
                        name: '404'
                    });
                }
            },
            watch: {
                currentEvent: function() {
                    var vm = this;
                    var temp_promo = [];
                    var current_id = _.toNumber(this.currentEvent.id);
                    console.log(current_id);
                    _.forEach(this.allEvents, function(value, key) {
                        console.log(value)
                        if (_.toNumber(value.id) != current_id) {
                            var current_promo = vm.findEventById(value.id);
                            current_promo.description_short = _.truncate(current_promo.description, {
                                'length': 70
                            });
                            temp_promo.push(current_promo);
                        }
                    });
                    this.storePromos = temp_promo;
                    console.log("promos", this.storePromos);
                }
            },
            computed: {
                findEventBySlug() {
                    return this.$store.getters.findEventBySlug;
                },
                findEventById() {
                    return this.$store.getters.findEventById;
                },
                allEvents() {
                    var events =this.$store.getters.processedEvents;
                    jobs.map(job => {
                            if(job.store != null && job.store != undefined && _.includes(job.store.image_url, 'missing'))
                                job.store.image_url = "//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/jpeg/1515531874445/canyon_crest_default.jpg";
                    });
                    return jobs;
                },
                timezone() {
                    return this.$store.getters.getTimezone;
                },
                property() {
                    return this.$store.getters.getProperty;
                }
            },
            methods: {
                truncate(val_body) {
                    var truncate = _.truncate(val_body, {
                        'length': 99,
                        'separator': ' '
                    });
                    return truncate;
                },
                shareURL(slug) {
                    // console.log(window.location.host, "\n http://"+ window.location.host);
                    var share_url = "http://www.shopcanyoncrest.com/events/" + slug;
                    return share_url;
                }
            }
        });
    });
</script>
