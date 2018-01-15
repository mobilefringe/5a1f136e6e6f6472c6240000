<template>
    <div class="row main_container" v-if="currentStore">
        <div id="store_container">
           <div class="promo_main_header sub_title">
                {{currentStore.name}}
                <div class="store_details_anchors pull-right">
                    <a href="#map">
                        <tt>Map</tt>
                        <img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512494350242/map-icon.png" class="" alt="">
                    </a>
                    <a id="promo_anchor" href="#promos_main" v-if="promotions.length > 0">
                        <tt>Promos (<span>{{currentStore.total_published_promos}}</span>)</tt>
                        <img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512494363776/promo_icon.png" class="" alt="">
                    </a>
                    <a id="job_anchor" href="#jobs_main" v-if="jobs.length > 0">
                        <tt>Jobs (<span>{{currentStore.total_published_jobs}}</span>)</tt>
                        <img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512494378989/jobs_icon.png" class="" alt="jobs icon">
                    </a>
                </div>
            </div>
            <div class="row is-table-row" style="width:100%;">
                <div class="col-md-8 col-sm-8  col-xs-12">
                    <div id="map">
                        <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl" ></svg-map>
                    </div>
                    
                </div>
                <div class="col-md-4 col-sm-4">
                    <img :src="currentStore.image_url" class="store_logo hidden_phone" :alt="currentStore.name" style="margin:0;max-width:100%;" />
                   
                </div> 
            </div>
            <div class="row is-table-row" style="width:100%;">
                <div class="col-md-8 col-sm-8 ">
                            <div class="store_details_desc hidden_phone">{{currentStore.description}}</div>
                      
                </div>
                <div class="col-md-4 col-sm-4">
                    <div class="side_stores">
                        <div class="store_header_btns animated_btn" v-if="currentStore.phone">
                            <a :href="'tel:'+currentStore.phone" >{{currentStore.phone}} <i class="fa fa-phone"></i>
                            <!--<img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512504104945/phone_icon.png" class="" alt="">-->
                                
                            </a>
                        </div>
                        <br v-if="currentStore.phone"/>
                        <br/>
                        <div class="store_header_btns animated_btn" v-if="currentStore.website">
                            <a :href="currentStore.website" target="_blank" >Visit Store Website  <i class="fa fa-globe"></i>
                            <!--<img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512504093874/web_icon.png" class="" alt="">-->
                                
                            </a>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 promo_item" id="promos_main" v-if="currentStore && currentStore.total_published_promos > 0">
                <h2 class="store_details_promo_heading sub_title">
                    <!--<img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507166000/promo_icon.png" class="" alt="promo icon">-->
                    {{currentStore.name}} Promotions
                </h2>
                <div id="promos_container">
                    <div class="col-md-6 col-sm-6 no_padding" v-for="promo in promotions" :data-cat="promo.cat_list">
                        <div class="promo_item cats_row is-table-row">
                            <div class="col-md-5 col-xs-4 no_padding">
                                <img class="promo_store_image" :src="promo.image_url" :alt="promo.name" />
                            </div>
                            <div class="col-md-7 padding_tb_20">
                                <router-link :to="'/promotions/'+promo.slug" class="">
                                    <h2 class="promo_list_name">{{promo.name}}</h2>
                                </router-link>
                                <p>
                                    <span class="promo_dates sub_title">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</span>
                                </p>
                                <div class="promo_list_desc hidden_phone">{{promo.description_short }}</div>
                                <div class="text_center position_relative hidden_phone">
                                    <router-link :to="'/promotions/'+promo.slug" class="animated_btn text_center">Read More</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 promo_item" id="jobs_main" v-if="currentStore && currentStore.total_published_jobs > 0">
                <h2 class="store_details_promo_heading sub_title">
                    <!--<img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507192000/jobs_icon.png" class="" alt="jobs icon">-->
                    {{currentStore.name}} Jobs
                </h2>
                <div id="jobs_container">
                    <div class="col-md-6 col-sm-6" v-for="job in jobs" :data-cat="job.cat_list">
                        <!--<div class="col-md-12">-->
                        <!--    <h2 class="promo_list_name">{{job.name}}</h2>-->
                        <!--    <p>-->
                                <!-- <span class="promo_store">{{store_name}}</span>-->
                        <!--        <span class="promo_dates">{{job.job_type}}</span> -->
                        <!--        <span class="promo_store"> - {{job.published_on | moment("MMM D", timezone)}}</span>-->
                        <!--    </p>-->
                        <!--    <div class="promo_list_desc">{{job.description_short}}</div>-->
                        <!--    <div class="text_center position_relative">-->
                        <!--        <router-link :to="'/jobs/'+job.slug" class="animated_btn text_center">Read More</router-link>-->
                        <!--    </div>-->
                        <!--</div>-->
                        <div class="promo_item cats_row is-table-row">
                            <div class="col-md-5 col-xs-4 no_padding">
                                <img class="promo_store_image" :src="currentStore.image_url" :alt="job.name" />
                            </div>
                            <div class="col-md-7 padding_tb_20">
                                <h2 class="promo_list_name">{{job.name}}</h2>
                                <p>
                                    <span class="promo_dates sub_title">{{job.start_date | moment("MMM D", timezone)}} </span>
                                </p>
                                <div class="promo_list_desc">{{job.description_short }}</div>
                                <div class="text_center position_relative">
                                    <router-link :to="'/jobs/'+job.slug" class="animated_btn text_center">Read More</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue","vuex", "jquery", "Raphael", "mm_mapsvg","mousewheel","vue!svg-map", "vue2-filters"], function(Vue, Vuex, $, Raphael, mapSvg,mousewheel,SVGMapComponent, Vue2Filters) {
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentStore: null,
                    promotions : [],
                    jobs:[],
                    map: null
                }
            },
            // beforeRouteEnter (to, from, next) {
            //     next(vm => {
            //         // access to component instance via `vm`
            //         vm.currentStore = vm.findStoreBySlug(to.params.id);
            //         if (vm.currentStore === null || vm.currentStore === undefined){
            //             vm.$router.replace({ name: '404'});
            //         }
            //     })
            // },
            // beforeRouteUpdate (to, from, next) {
            //     this.currentStore = this.findStoreBySlug(to.params.id);
            //     if (this.currentStore === null || this.currentStore === undefined){
            //         this.$router.replace({ name: '404'});
            //     }
            // },
            props:['id'],
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
                 this.$store.dispatch("getData", "stores").then(response => {
                    this.updateCurrentStore(this.id);
                    this.$store.dispatch("getData", "promotions");
                    this.$store.dispatch("getData", "jobs")
                }, error => {
                  console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
            },
            watch : {
                map : function (){
                    var vm = this;
                    setTimeout(function () {
                        console.log(this);
                        vm.dropPin();
                      }, 500);
                },
                currentStore : function (){
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
                    if(_.includes(this.currentStore.image_url, 'missing'))
                        this.currentStore.image_url = "//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/jpeg/1515531874445/canyon_crest_default.jpg";
                    this.promotions = temp_promo;
                    this.jobs = temp_job;
                    console.log("promos",this.promotions);
                },
                $route : function () {
                    this.updateCurrentStore(this.$route.params.id);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores',
                    'findStoreBySlug',
                    'findPromoById',
                    'findJobById',
                ]),
                // findStoreBySlug () {
                //   return this.$store.getters.findStoreBySlug;
                // },
                // findPromoById () {
                //     return this.$store.getters.findPromoById;
                // },
                // findJobById () {
                //     return this.$store.getters.findJobById;
                // },
                // property (){
                //     return this.$store.getters.getProperty;
                // },
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                },
                svgMapRef () {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                },
                // timezone () {
                //     return this.$store.getters.getTimezone;
                // }
            },
            methods: {
                updateCurrentStore (id) {
                    this.currentStore = this.findStoreBySlug(id);
                    if (this.currentStore === null || this.currentStore === undefined){
                        this.$router.replace({ name: '404'});
                    }
                },
                updateSVGMap (map) {
                    this.map = map;
                    console.log("this",this);
                },
                dropPin () {
                    console.log(this.currentStore);
                    console.log(this.currentStore.svgmap_region);
                    // this.svgMapRef.hideMarkers();
                    this.svgMapRef.addMarker(this.currentStore,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(this.currentStore)
                }   
            }
        });
    });
</script>
