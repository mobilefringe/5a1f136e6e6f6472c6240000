<template>
    <div class="content_container  position_relative padding_top_20 storelist_container">
        <div class="shop_mobile_banner show_phone">
            <img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512663245990/shop_mobile_placeholder.png" alt="">
        </div>
        <div class="main_container">
            <div class="row hidden_phone">
                <div class="col-sm-4">
                    <p class="category_header">Categories</p>
                    <div id="category_container">
                        <h5 class="category_name active_cat hidden_phone"><a @click="filteredByCategory('All')" class="show_all_stores">All</a></h5>
                        <div  class="" v-for="cat in allCategories">
                            <h5 class="category_name"><a @click="filteredByCategory(cat.name)" class="show_cat_stores" :data-id="cat.id">{{cat.name}}</a></h5>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="map_container">
                    <div class="map_storelist">
                        <v-select :options="allStores" :placeholder="'Select A Store'" :searchable="false" :label="'name'" :on-change="dropPin"></v-select> 
                    </div>
                        <svg-map v-bind:svg-map-url="getSVGurl"></svg-map>
                    </div>
                </div>
            </div>
            
            <h2 class="stores_main_heading">Shops & Entertaiment</h2>
            <p class="store_main_desc sub_title">Explore • Enjoy • Shop</p>
            <div class="mobile_padding show_phone">
                <div class="select_container">
                    <v-select :options="allMobileCategories" :placeholder="'Select By Categoty'" :searchable="false" :on-change="filteredByCategory" id="mobile_cat_list"></v-select> 
                </div>
                <div class="select_container">
                    <v-select :options="mobileAlphabet" :placeholder="'Select Store A-Z'" :searchable="false" :on-change="filterStores" id="mobile_alpha_list"></v-select> 
                </div>
                
                
            </div>
            <div class="row padding_bottom_50 phone_padding_top_60">
                <div class="col-md-12">
                    <div class="alpha_list">
                        <a @click="filterStores('All')" class="all_a">All</a>
                        <a @click="filterStores('#')">#</a>
                        <a v-for="letter in alphabet" @click="filterStores(letter)">{{letter}}</a>
                    </div>
                </div>
                <div class="col-md-12">
                    <h5 class="category_header" style="display:none" id="cat_name_header">All</h5>
                    <div class="row" v-if="filteredStores">
                        <div class="col-md-12 store_col_1" :class="{ all_storelist_container: breakIntoCol }">
                            <div v-for="(stores,key) in filteredStores" style="padding:0 10px;">
                                <span class="store_initial" :data-initial="key">{{key}}</span>
                                <div id="store_list_container" class="store_list" v-for="store in stores">
                                    <div class="store_list_content cats_row" :data-cat="store.cat_list">
                                        <p class="store_name"><router-link :to="'/stores/'+store.slug">{{store.name}}</router-link></p>
                                    </div>
                                </div>   
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
    define(["Vue","vuex", "jquery", "Raphael", "mm_mapsvg","mousewheel", "vue!svg-map"], function(Vue, Vuex, $, Raphael, mapSvg,mousewheel,SVGMapComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    listMode: "alphabetical",
                    filteredStores: null,
                    mobileAlphabet : ['All',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                    ],
                    alphabet : [
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                    ],
                    breakIntoCol : true
                    // selected_cat : 'All',
                    // selected_alpha : 'All'
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
                this.$store.dispatch("getData", "categories");
            },
            mounted () {
                this.filteredStores = this.storesByAlphaIndex;// this.storesByAlphaIndex;
                var total_stores;
                // this.allMobileCategories;
                // _.forEach(this.storesByAlphaIndex, function(value) {
                //   console.log(value.length);
                //   total_stores = _.add(value.length,total_stores);
                // });
                // console.log(total_stores);
                // var x = 
                
                // console.log(x);
            },
            watch : {
                selected_cat : function () {
                    var cat_id = null;
                    if(this.selected_cat == "All" || this.selected_cat == null ||  this.selected_cat == undefined){
                        this.selected_cat = "All";
                        cat_id = "All";
                        this.breakIntoCol = true;
                    }
                    else {
                        cat_id= this.findCategoryByName(this.selected_cat).id;
                    }
                    this.filteredByCategory(cat_id);
                },
                selected_alpha : function () {
                    // var cat_id = null;
                    // if(this.selected_alpha == "All"){
                    //     cat_id = this.selected_cat;
                    // }
                    // else {
                    //     cat_id= this.findCategoryByName(this.selected_alpha).id;
                    // }
                    this.filterStores(this.selected_alpha);
                }
            },
            methods: {
                changeMode (mode) {
                    this.listMode = mode;
                },
                updateSVGMap (map) {
                    this.map = map;
                },
                dropPin(store) {
                    this.svgMapRef.hideMarkers();
                    console.log(store);
                    this.svgMapRef.addMarker(store,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(store)
                },
                filterStores (letter) {
                    
                    this.breakIntoCol = false;
                    if(letter == "All"){
                        this.filteredStores = this.storesByAlphaIndex;//this.storesByAlphaIndex;
                        // this.breakIntoCol = true;
                    }
                    else {
                        var filtered = _.filter(this.storesByAlphaIndex, function(o,i) { return _.lowerCase(i) == _.lowerCase(letter); })[0];
                        this.filteredStores = _.groupBy(filtered, store => (isNaN(store.name.charAt(0)) ? store.name.charAt(0) : "#"));
                        this.breakIntoCol = false;
                    }
                    
                },
                filteredByCategory (category_id) {
                    if(category_id == "All" || category_id == null ||  category_id == undefined){
                        category_id = "All";
                    }
                    else {
                        category_id= this.findCategoryByName(category_id).id;
                    }
                    
                    this.breakIntoCol = false;
                    console.log(category_id);
                    if(category_id == "All"){
                        this.filteredStores = this.storesByAlphaIndex;//this.storesByAlphaIndex;
                        // this.breakIntoCol = true;
                    }
                    else {
                        
                        var find = this.findCategoryById;
                        var filtered = _.filter(this.allStores, function(o) {return _.indexOf(o.categories, _.toNumber(category_id)) > -1; });
                        _.forEach(filtered, function(value, i) {
                            value.currentCategory = find(category_id).name;
                        });
                        // console.log(filtered)
                        sortedCats = _.groupBy(filtered, store => store.currentCategory);
                        // console.log(sortedCats);
                        this.filteredStores = sortedCats;
                    }
                    $("#cat_name_header")
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'repos',
                    'findRepoByName',
                    'processedStores',
                    'processedCategories',
                    'storesByAlphaIndex',
                    'storesByCategoryName',
                    'findCategoryById',
                    'findCategoryByName',
                ]),
                // property (){
                //     return this.$store.getters.getProperty;
                // },
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                    // return "//www.mallmaverick.com/system/site_images/photos/000/035/014/original/Canyon_Crest_-_Map.svg?1512066588";
                },
                allStores() {
                    return this.processedStores;
                },
                allCategories() {
                    return this.processedCategories;
                },
                allMobileCategories() {
                    var cats =_.map(this.processedCategories, 'name');
                    cats.unshift('All');
                    console.log(cats);
                    return cats;
                },
                // storesByAlphaIndex() {
                //     var stores = this.$store.getters.storesByAlphaIndex;
                    
                //     if (_.size(stores) <= 4) { 
                //         this.breakIntoCol = false;
                //     }
                //     else {
                //         this.breakIntoCol = true;
                //     }
                //     console.log(_.size(stores),"break?",this.breakIntoCol);
                //     return stores;
                // },
                // storesByCategoryName() {
                //   return this.$store.getters.storesByCategoryName;
                // },
                // findCategoryById () {
                //     return this.$store.getters.findCategoryById;
                // },
                // findCategoryByName (){
                //     return this.$store.getters.findCategoryByName;
                // },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                }
            }
        });
    });
</script>
