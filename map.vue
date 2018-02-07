<template>
    <div class="content_container  position_relative padding_top_20 storelist_container">
        <div class="main_container">
            <div class="row">
                <div class="select_container show_phone">
                    <v-select :options="allStores" :placeholder="'Select A Store'" :searchable="false" :label="'name'" :on-change="dropPin" id="mobile_alpha_list"></v-select> 
                </div>
                
                <div class="col-sm-12">
                    <div class="map_container">
                        <div class="map_storelist hidden_phone">
                            <v-select :options="allStores" :placeholder="'Select A Store'" :searchable="false" :label="'name'" :on-change="dropPin"></v-select>                         </div>
                        <svg-map ref="svgRef" v-bind:svgMapUrl="getSVGurl"></svg-map>
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
        return Vue.component("map-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    listMode: "alphabetical"
                }
            },
            created (){
                window.Raphael = Raphael; // our mapSvg plugin is stupid and outdated. need this hack to tie Raphael to window object (global variable)
            },
            mounted () {
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
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores'
                ]),
                allStores() {
                    return this.processedStores;
                },
                getSVGurl () {
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                    // return "//www.mallmaverick.com/system/site_images/photos/000/035/014/original/Canyon_Crest_-_Map.svg?1512066588";
                },
                svgMapRef() {
                    return _.filter(this.$children, function(o) { return (o.$el.className == "svg-map") })[0];
                },
                regions () {
                    var regions = {}
                    _.forEach( this.processedStores , function( val, key ) {
                        if(val.svgmap_region != null && typeof(val.svgmap_region)  != 'undefined'){
                            if(!val.store_front_url_abs ||  val.store_front_url_abs.indexOf('missing.png') > -1 || val.store_front_url_abs.length === 0){
                                val.store_front_url_abs = '//codecloud.cdn.speedyrails.net/sites/55ddf3f86e6f640775000000/a22fcf023d728855c6f575ba100806d7/default.jpg';
                            }
                            obj = {};
                            obj["tooltip"] = "<p class='tooltip_name'>"+val.name+"</p>";
                            obj["attr"] = {};
                            obj["attr"]["href"] = "/stores/"+val.slug;
                            regions[val.svgmap_region] = obj;
                        }
                    });
                    return regions;
                }
            }
        });
    });
</script>
