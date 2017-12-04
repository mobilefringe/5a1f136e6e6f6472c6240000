<template>
    <div class="content_container main_container position_relative padding_top_20">
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
            <!--<select id="mobile_alpha_list" class="form-control custom_form_control">-->
            <!--    <option disabled="disabled" selected>Index</option>-->
            <!--    <option value="7">top</option>-->
            <!--    <option value="7">#</option>-->
            <!--    <option value="a">a</option>-->
            <!--    <option value="b">b</option>-->
            <!--    <option value="c">c</option>-->
            <!--    <option value="d">d</option>-->
            <!--    <option value="e">e</option>-->
            <!--    <option value="f">f</option>-->
            <!--    <option value="g">g</option>-->
            <!--    <option value="h">h</option>-->
            <!--    <option value="i">i</option>-->
            <!--    <option value="j">j</option>-->
            <!--    <option value="k">k</option>-->
            <!--    <option value="l">l</option>-->
            <!--    <option value="m">m</option>-->
            <!--    <option value="n">n</option>-->
            <!--    <option value="o">o</option>-->
            <!--    <option value="p">p</option>-->
            <!--    <option value="q">q</option>-->
            <!--    <option value="r">r</option>-->
            <!--    <option value="s">s</option>-->
            <!--    <option value="t">t</option>-->
            <!--    <option value="u">u</option>-->
            <!--    <option value="v">v</option>-->
            <!--    <option value="w">w</option>-->
            <!--    <option value="x">x</option>-->
            <!--    <option value="y">y</option>-->
            <!--    <option value="z">z</option>-->
            <!--</select>-->
            
        </div>
        <div class="row padding_bottom_50">
            <div class="col-md-12">
                <div class="alpha_list">
                    <a @click="filterStores('All')" class="all_a">All</a>
                    <a @click="filterStores('#')">#</a>
                    <a v-for="letter in alphabet"></a>
                    <!--<a @click="filterStores('A')">A</a>-->
                    <!--<a @click="filterStores('B')">B</a>-->
                    <!--<a @click="filterStores('C')">C</a>-->
                    <!--<a @click="filterStores('D')">D</a>-->
                    <!--<a @click="filterStores('E')">E</a>-->
                    <!--<a @click="filterStores('F')">F</a>-->
                    <!--<a @click="filterStores('G')">G</a>-->
                    <!--<a @click="filterStores('H')">H</a>-->
                    <!--<a @click="filterStores('I')">I</a>-->
                    <!--<a @click="filterStores('J')">J</a>-->
                    <!--<a @click="filterStores('K')">K</a>-->
                    <!--<a @click="filterStores('L')">L</a>-->
                    <!--<a @click="filterStores('M')">M</a>-->
                    <!--<a @click="filterStores('N')">N</a>-->
                    <!--<a @click="filterStores('O')">O</a>-->
                    <!--<a @click="filterStores('P')">P</a>-->
                    <!--<a @click="filterStores('Q')">Q</a>-->
                    <!--<a @click="filterStores('R')">R</a>-->
                    <!--<a @click="filterStores('S')">S</a>-->
                    <!--<a @click="filterStores('T')">T</a>-->
                    <!--<a @click="filterStores('U')">U</a>-->
                    <!--<a @click="filterStores('V')">V</a>-->
                    <!--<a @click="filterStores('W')">W</a>-->
                    <!--<a @click="filterStores('X')">X</a>-->
                    <!--<a @click="filterStores('Y')">Y</a>-->
                    <!--<a @click="filterStores('Z')">Z</a>-->
                </div>
            </div>
            <div class="col-md-12">
                <h5 class="category_header" style="display:none" id="cat_name_header">All</h5>
                <div class="row">
                    <div class="col-md-4 store_col_1">
                    <div v-for="(stores,key) in processedStores" v-if="key ">
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
                this.processedStores = this.storesByAlphaIndex;
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
                        this.processedStores = this.storesByAlphaIndex;
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
                }
            }
        });
    });
</script>
