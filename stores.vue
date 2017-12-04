<template>
    <div class="content_container main_container position_relative padding_top_20">
    <div class="row">
    <div class="col-md-4">
        
    </div>
    <div class="col-md-4">
        
    </div>
    </div>
        <div class="map_container">
            <div id="map" class="hidden_phone">
                <img src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1511892740000/Canyon Crest - Map-01.png" class="" alt="" style="max-height:100%">
            </div>
            <!--<svg-map :svgMapUrl="getSVGurl"></svg-map>-->
        </div>
        <h2 class="stores_main_heading">Shops & Entertaiment</h2>
        <p class="store_main_desc sub_title">Explore • Enjoy • Shop</p>
        <div class="mobile_padding show_phone">
            <a href="/map" class="mobile_dd">Open Center Map</a>
            <!--<select id="mobile_cat_list" class="form-control custom_form_control">-->
            <!--        <option value="{{id}}">{{name}}</option>-->
            <!--</select>-->
            <select id="mobile_alpha_list" class="form-control custom_form_control">
                <option disabled="disabled" selected>Index</option>
                <option value="7">#</option>
                <option v-for="letter in alphabet" :value="letter"> {{letter}}</option>
            </select>
            
        </div>
        <div class="row padding_bottom_50">
            <div class="col-md-12">
                <div class="alpha_list">
                    <a @click="filterStores('All')" class="all_a">All</a>
                    <a @click="filterStores('#')">#</a>
                    <a v-for="letter in alphabet" @click="filterStores(letter)">{{letter}}</a>
                </div>
            </div>
            <div class="col-md-12">
                <h5 class="category_header" style="display:none" id="cat_name_header">All</h5>
                <div class="row" v-if="processedStores">
                    <div class="col-md-4 store_col_1">
                        <div v-for="(stores,key) in processedStores">
                            <span class="store_initial" :data-initial="key">{{key}}</span>
                            <div id="store_list_container" class="store_list" v-for="store in stores">
                                <div class="store_list_content cats_row" :data-cat="store.cat_list">
                                    <p class="store_name"><router-link :to="'/stores/'+store.slug">{{store.name}}</router-link></p>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
                <!--<div id="cat_store_container">-->
                <!--    <div class="store_list_content cats_row" data-cat="{{cat_list}}">-->
                <!--        <p class="store_name"><a href="/stores/{{slug}}">{{name}}</a></p>-->
                <!--    </div>-->
                <!--</div>-->
            </div>
            <!--<div class="col-md-4 hidden_phone">-->
            <!--    <div id="new_stores">-->
            <!--        <p class="category_header">Now Open</p>-->
            <!--        <div id="new_store_container">-->
            <!--            <h5 class="category_name"><a href="/stores/{{slug}}">{{name}}</a></h5>-->
            <!--        </div>-->
            <!--    </div>-->
            <!--    <div id="coming_soon_stores">-->
            <!--        <p class="category_header">Opening Soon</p>-->
            <!--        <div id="coming_soon_container">-->
            <!--            <h5 class="category_name"><a href="/stores/{{slug}}">{{name}}</a></h5>-->
            <!--        </div>-->
            <!--    </div>-->
            <!--    <p class="category_header">Categories</p>-->
            <!--    <h5 class="category_name active_cat hidden_phone"><a href="#" class="show_all_stores">All</a></h5>-->
            <!--    <div id="category_container" class="hidden_phone">-->
            <!--        <h5 class="category_name"><a href="#" class="show_cat_stores" data-id="{{id}}">{{name}}</a></h5>-->
            <!--    </div>-->
                
                
            <!--</div>-->
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
    define(["Vue","jquery", "Raphael", "mm_mapsvg","mousewheel", "vue!svg-map"], function(Vue,$, Raphael, mapSvg,mousewheel,SVGMapComponent) {
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    listMode: "alphabetical",
                    processedStores: null,
                    alphabet : [
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
                    ]
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
            },
            mounted () {
                this.processedStores = this.storesByAlphaIndex;// this.storesByAlphaIndex;
                var total_stores;
                // _.forEach(this.storesByAlphaIndex, function(value) {
                //   console.log(value.length);
                //   total_stores = _.add(value.length,total_stores);
                // });
                // console.log(total_stores);
                // var x = 
                
                // console.log(x);
            },
            methods: {
                changeMode (mode) {
                    this.listMode = mode;
                },
                dropPin(store) {
                    this.svgMapRef.hideMarkers();
                    console.log(store);
                    this.svgMapRef.addMarker(store,'//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png');
                    this.svgMapRef.setViewBox(store)
                },
                filterStores (letter) {
                    if(letter == "All"){
                        this.processedStores = this.storesByAlphaIndex;//this.storesByAlphaIndex;
                    }
                    else {
                        var filtered = _.filter(this.storesByAlphaIndex, function(o,i) { return _.lowerCase(i) == _.lowerCase(letter); })[0];
                        this.processedStores = _.groupBy(filtered, store => (isNaN(store.name.charAt(0)) ? store.name.charAt(0) : "#"));
                    }
                    
                }
            },
            computed: {
                property (){
                    return this.$store.getters.getProperty;
                },
                getSVGurl () {
                    // return "https://www.mallmaverick.com" + this.property.svgmap_url;
                    return "//www.mallmaverick.com/system/site_images/photos/000/035/014/original/Canyon_Crest_-_Map.svg?1512066588";
                },
                allStores() {
                    return this.$store.getters.processedStores;
                },
                storesByAlphaIndex() {
                    console.log(this.$store.getters.storesByAlphaIndex);
                    return this.$store.getters.storesByAlphaIndex;
                },
                storesByCategoryName() {
                  return this.$store.getters.storesByCategoryName;
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                },
                sliceAllStores(start,end){
                    var div_stores = _.ceil(this.allStores.length/ 3);
                    var chunks = [];//_.chunk(this.allStores,div_stores);
                    // console.log(chunks);
                    var num_store = 0;
                    var chunky = 0;
                    var temp_stores = [];
                    _.forEach(this.storesByAlphaIndex, function(value, i) {
                        // chunks[i]=_.groupBy(value, store => (isNaN(store.name.charAt(0)) ? store.name.charAt(0) : "#"));
                        num_store = _.add(value.length, num_store);
                        temp_stores.push(value);
                        console.log(value,i)
                        // console.log (num_store,div_stores)
                        if( num_store >= div_stores){
                            console.log("temp_stores",temp_stores);
                            var x = _.groupBy(temp_stores, store => (isNaN(store.name.charAt(0)) ? store.name.charAt(0) : "#"));
                            console.log("x",x);
                            chunks[chunky] = x;
                            temp_stores= [];
                            chunky++;
                            num_store= 0 ;
                        }
                    });
                    
                    console.log("chunks",chunks);
                    // if (end >=20){
                    //     end = this.alphabet.length;
                    // }
                    // var x =_.pick(this.storesByAlphaIndex, _.slice(this.alphabet, start, end));
                    // // console.log(start,end);
                    // // console.log(x);
                   return chunks;
                }
            }
        });
    });
</script>
