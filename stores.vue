<template>
    <div class="content_container main_container position_relative padding_top_20">
        <div class="map_container">
            <!--<div id="map" class="hidden_phone">-->
                <!--<img alt="map" id="map_image" src="">-->
            <!--</div>-->
            <svg-map :svgMapUrl="getSVGurl"></svg-map>
        </div>
        <h2 class="stores_main_heading">Directory</h2>
        <p class="store_main_desc">explore • enjoy • shop</p>
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
                    <a href="#7" id="all_stores_a">all</a>
                    <a href="#7">#</a>
                    <a href="#A">A</a>
                    <a href="#B">B</a>
                    <a href="#C">C</a>
                    <a href="#D">D</a>
                    <a href="#E">E</a>
                    <a href="#F">F</a>
                    <a href="#G">G</a>
                    <a href="#H">H</a>
                    <a href="#I">I</a>
                    <a href="#J">J</a>
                    <a href="#K">K</a>
                    <a href="#L">L</a>
                    <a href="#M">M</a>
                    <a href="#N">N</a>
                    <a href="#O">O</a>
                    <a href="#P">P</a>
                    <a href="#Q">Q</a>
                    <a href="#R">R</a>
                    <a href="#S">S</a>
                    <a href="#T">T</a>
                    <a href="#U">U</a>
                    <a href="#V">V</a>
                    <a href="#W">W</a>
                    <a href="#X">X</a>
                    <a href="#Y">Y</a>
                    <a href="#Z">Z</a>
                </div>
            </div>
            <div class="col-md-8">
                <h5 class="category_header" style="display:none" id="cat_name_header">All</h5>
                <div class="row">
                    <div class="col-md-6 store_col_1">
                    <div v-for="store in storesByAlphaIndex">
                        <!--<span class="store_initial open_stores numbers_exist" data-initial="number">#</span>-->
                        <div id="numbered_store_list_container" class="numbers_exist">
                            <div class="store_list_content cats_row" data-cat="{{cat_list}}">
                                <p class="store_name"><a href="/stores/{{slug}}">{{name}}</a></p>
                            </div>
                        </div>   
                        </div>
                    </div>
                    <!--<div class="col-md-6 store_col_2">-->
                    <!--    <div class="store_list" id="store_list_container2"></div>-->
                    <!--</div>-->
                </div>
                <div id="cat_store_container">
                    <div class="store_list_content cats_row" data-cat="{{cat_list}}">
                        <p class="store_name"><a href="/stores/{{slug}}">{{name}}</a></p>
                    </div>
                </div>
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
          listMode: "alphabetical"
        }
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
            if(letter == "#"){
                this.processedStores = _.filter(this.allStores, function(o) { return _.inRange(_.toNumber(o.name[0]), -1, 10); });
            }
            else {
                this.processedStores = _.filter(this.allStores, function(o) { return _.lowerCase(o.name[0]) == _.lowerCase(letter); });
            }
            // console.log(this.processedStores);
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
