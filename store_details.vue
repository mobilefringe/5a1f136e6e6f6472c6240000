<template>
    <div class="row main_container" v-if="currentStore">
        <div id="store_container">
        <script id="store_template" type="x-tmpl-mustache/text">
           <div class="promo_main_header">
                {{name}}
                <div class="store_details_anchors pull-right">
                    <a href="#map">
                        <img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507179000/map_icon.png" class="" alt="">
                        <tt>Map</tt>
                    </a>
                    <a id="promo_anchor" href="#promos_main">
                        <img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507166000/promo_icon.png" class="" alt="">
                        <tt>Promos (<span></span>)</tt>
                    </a>
                    <a id="job_anchor" href="#jobs_main">
                        <img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507192000/jobs_icon.png" class="" alt="jobs icon">
                        <tt>Jobs (<span></span>)</tt>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div id="map">
                        
                    </div>
                    <div class="row promo_item">
                        <div class="col-md-12">
                            <div class="store_details_desc hidden_phone padding_top_20">{{description}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <img src="{{alt_store_front_url}}" class="store_logo hidden_phone" alt="{{name}}" style="margin:0;" />
                    <div class="side_stores">
                        <div class="store_header_btns newsletter_btn animated_btn" style="{{phone_show}}">
                            <a href="tel:{{phone}}" >{{phone}}</a>
                        </div>
                        <br style="{{phone_show}}" />
                        <br/>
                        <div class="store_header_btns newsletter_btn animated_btn" style="{{show}}">
                            <a href="//{{website}}" target="_blank" >Visit Store Website</a>
                        </div>
                    </div>
                </div> 
            </div>
        </script>
    </div>
    <div class="row">
        <div class="col-md-8 promo_item" id="promos_main">
            <h2 class="store_details_promo_heading">
                <img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507166000/promo_icon.png" class="" alt="promo icon">
                Promotions
            </h2>
            <div id="promos_container">
                <script id="promos_template" type="x-tmpl-mustache/text">
                    <div class="row promo_item cats_row" data-cat="{{cat_list}}">
                        <div class="col-md-5">
                            <img class="promo_store_image" src="{{image_url}}" alt="{{name}}" />
                        </div>
                        <div class="col-md-7">
                            <h2 class="promo_list_name">{{name}}</h2>
                            <p>
                                <span class="promo_dates">{{dates}}</span>
                            </p>
                            <div class="promo_list_desc">{{description_short}}</div>
                            <a class="read_more" href="/promotions/{{slug}}">Read More...</a>
                        </div>
                    </div>
                </script>
            </div>
        </div>
        <div class="col-md-8 promo_item" id="jobs_main">
            <h2 class="store_details_promo_heading">
                <img src="//codecloud.cdn.speedyrails.net/sites/56c740936e6f642d56000000/image/png/1456507192000/jobs_icon.png" class="" alt="jobs icon">
                Jobs
            </h2>
            <div id="jobs_container">
                <script id="jobs_template" type="x-tmpl-mustache/text">
                    <div class="row promo_item" data-cat="{{cat_list}}">
                        <div class="col-md-12">
                            <h2 class="promo_list_name">{{name}}</h2>
                            <p>
                                <!-- <span class="promo_store">{{store_name}}</span>-->
                                <span class="promo_dates">{{job_type  }}</span> 
                                <span class="promo_store"> - {{ published_on }}</span>
                            </p>
                            <div class="promo_list_desc">{{description_short}}</div>
                            <a class="read_more" href="/jobs/{{slug}}">Read More...</a>
                        </div>
                    </div>
                </script>
            </div>
        </div>
        <div class="col-md-8" id="hours_main">
            <h2 class="store_details_promo_heading">
                <i class="fa fa-hourglass-half hours_icon" aria-hidden="true"></i>
                Hours
            </h2>
            <div id="hours_container">
                <script id="hours_template" type="x-tmpl-mustache/text">
                    <div class="row padding_top_20" data-cat="{{cat_list}}">
                        <div class="col-md-12">
                            <li class="promo_list_desc" style="list-style:none">{{h}}</li>
                        </div>
                    </div>
                </script>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("store-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          title: "MM with Vue.js!",
          description: "An example of integration of Mall Maverick with Vue.js",
          currentStore: null
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
      computed: {
        findStoreBySlug () {
          return this.$store.getters.findStoreBySlug;
        }
      }
    });
  });
</script>
