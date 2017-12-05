<template>
    <div class="row main_container" v-if="currentStore">
        <div id="store_container">
           <div class="promo_main_header">
                {{currentStore.name}}
                <div class="store_details_anchors pull-right">
                    <a href="#map">
                        <img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507179000/map_icon.png" class="" alt="">
                        <tt>Map</tt>
                    </a>
                    <a id="promo_anchor" href="#promos_main" v-if="promotions.length > 0">
                        <img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507166000/promo_icon.png" class="" alt="">
                        <tt>Promos (<span></span>)</tt>
                    </a>
                    <a id="job_anchor" href="#jobs_main" v-if="jobs.length > 0">
                        <img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507192000/jobs_icon.png" class="" alt="jobs icon">
                        <tt>Jobs (<span></span>)</tt>
                    </a>
                </div>
            </div>
            <div class="row is-table-row">
                <div class="col-md-8">
                    <div id="map">
                        <svg-map @updateMap="updateSVGMap()" :svgMapUrl="getSVGurl" ></svg-map>
                    </div>
                    
                </div>
                <div class="col-md-4">
                    <img :src="currentStore.image_url" class="store_logo hidden_phone" :alt="currentStore.name" style="margin:0;max-width:100%;" />
                   
                </div> 
            </div>
            <div class="row is-table-row">
                <div class="col-md-8">
                            <div class="store_details_desc hidden_phone padding_top_20">{{currentStore.description}}</div>
                      
                </div>
                <div class="col-md-4">
                    <div class="side_stores">
                        <div class="store_header_btns newsletter_btn animated_btn" v-if="currentStore.phone">
                            <a :href="'tel:'+currentStore.phone" >{{currentStore.phone}}</a>
                        </div>
                        <br v-if="currentStore.phone"/>
                        <br/>
                        <div class="store_header_btns newsletter_btn animated_btn" v-if="currentStore.website">
                            <a :href="currentStore.website" target="_blank" >Visit Store Website</a>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 promo_item" id="promos_main" v-if="currentStore && currentStore.total_published_promos > 0">
                <h2 class="store_details_promo_heading">
                    <!--<img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507166000/promo_icon.png" class="" alt="promo icon">-->
                    {{currentStore.name}} Promotions
                </h2>
                <div id="promos_container">
                    <div class="row promo_item cats_row" v-for="promo in promotions" :data-cat="promo.cat_list">
                        <div class="col-md-5">
                            <img class="promo_store_image" :src="promo.image_url" :alt="promo.name" />
                        </div>
                        <div class="col-md-7">
                            <h2 class="promo_list_name">{{promo.name}}</h2>
                            <p>
                                <span class="promo_dates">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</span>
                            </p>
                            <div class="promo_list_desc">{{promo.description_short}}</div>
                            <router-link class="read_more" :to="'/promotions/'+promo.slug">Read More...</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8 promo_item" id="jobs_main" v-if="currentStore && currentStore.total_published_jobs > 0">
                <h2 class="store_details_promo_heading">
                    <!--<img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507192000/jobs_icon.png" class="" alt="jobs icon">-->
                    {{currentStore.name}} Jobs
                </h2>
                <div id="jobs_container">
                    <div class="row promo_item" v-for="job in jobs" :data-cat="job.cat_list">
                        <div class="col-md-12">
                            <h2 class="promo_list_name">{job.{name}}</h2>
                            <p>
                                <!-- <span class="promo_store">{{store_name}}</span>-->
                                <span class="promo_dates">{{job.job_type}}</span> 
                                <span class="promo_store"> - {{promo.published_on | moment("MMM D", timezone)}}</span>
                            </p>
                            <div class="promo_list_desc">{{job.description_short}}</div>
                            <router-link class="read_more" :to="'/jobs/'+job.slug">Read More...</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue","jquery", "Raphael", "mm_mapsvg","mousewheel","vue!svg-map"], function(Vue, $, Raphael, mapSvg,mousewheel,SVGMapComponent) {
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
            beforeRouteEnter (to, from, next) {
                next(vm => {
                    // access to component instance via `vm`
                    vm.currentStore = vm.findStoreBySlug(to.params.id);
                    if (vm.currentStore === null || vm.currentStore === undefined){
                        vm.$router.replace({ name: '404'});
                    }
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.currentStore = this.findStoreBySlug(to.params.id);
                if (this.currentStore === null || this.currentStore === undefined){
                    this.$router.replace({ name: '404'});
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
            },
            watch : {
                map : function (){
                    setTimeout(function () {
                        console.log(this);
                        this.dropPin();
                      }, 500);
                },
                currentStore : function (){
                    console.log("currentStore promo",this.currentStore );
                    var vm = this;
                    var temp_promo = [];
                    var temp_job = [];
                    _.forEach(this.currentStore.promotions, function(value, key) {
                        // console.log(vm.findPromoById(value));
                        temp_promo.push(vm.findPromoById(value));
                        temp_job.push(vm.findJobById(value));
                    });
                    this.promotions = temp_promo;
                    this.jobs = temp_job;
                    console.log("promos",this.promotions);
                }
            },
            computed: {
                findStoreBySlug () {
                  return this.$store.getters.findStoreBySlug;
                },
                findPromoById () {
                    return this.$store.getters.findPromoById;
                },
                findJobById () {
                    return this.$store.getters.findJobById;
                },
                property (){
                    return this.$store.getters.getProperty;
                },
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                },
                svgMapRef () {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                }
            },
            methods: {
                updateSVGMap (map) {
                    this.map = map;
                    console.log("this",this);
                },
                dropPin () {
                    console.log(this.currentStore.svgmap_region);
                    // this.svgMapRef.hideMarkers();
                    this.svgMapRef.addMarker(this.currentStore,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(this.currentStore)
                }   
            }
        });
    });
</script>
