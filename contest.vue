<template>
    <div class=" main_container" id="events_container"><!-- for some reason if you do not put an outer container div this component template will not render -->
        <h3 class="promotion_heading" v-if="property"> Exclusive Events at {{property.name}}</h3>
        <p class="exclusive_deals sub_title">Join us to celebrate and enjoy!</p>
        <div class="row">
            <div class="col-md-4" v-for="promo in events">
                <hr class="show_phone">
                <div class="promo_list_container text_center">
                    <p class="top_promo_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
                    <div class="promo_list_img_container">
                        <!--<a :href="promo.image_url" target="_blank">-->
                        <img :src="promo.image_url" class="promo_list_img">
                            
                        <!--</a>-->
                    </div>
                    <p class="description_text">{{ promo.name }}</p>
                    <router-link :to="{ name: 'eventDetails', params: { id: promo.slug }}" class="animated_btn text_center">Read More</router-link>
                </div>
            </div>
        </div>
        <div id="events_empty_section" v-show="currentContest">
            <p>Check back later for exciting contest details!</p>
        </div>
    </div>
    
</template>

<style>
    .event-image{
        text-align:center;
        position:relative;
        width:100%;
        height:500px;
    }
    .event-image img {
         max-height: 100%;  
        max-width: 100%; 
        width: auto;
        height: auto;
        position: absolute;  
        top: 0;  
        bottom: 0;  
        left: 0;  
        right: 0;  
        margin: auto;
    }
    .store_header_btns{
        margin:0px;
    }
    @media(max-width: 768px){
        .event-image{
            height:300px;
        }
       
    }
</style>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("contest-component", {
                  template: template, // the variable template will be injected,
      data: function() {
        return {
          currentContest: null,
          success_subscribe : false,
          storePromos : null
        }
      },
    //   beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //       // access to component instance via `vm`
    //       vm.currentEvent = vm.findEventBySlug(to.params.id);
    //       if (vm.currentEvent === null || vm.currentEvent === undefined){
    //         vm.$router.replace({ name: '404'});
    //       }
    //     })
    //   },
    //   beforeRouteUpdate (to, from, next) {
    //     this.currentEvent = this.findEventBySlug(to.params.id);
    //     if (this.currentEvent === null || this.currentEvent === undefined){
    //       this.$router.replace({ name: '404'});
    //     }
    //   },
      watch : {
        currentContest : function (){
            // var vm = this;
            // var temp_promo = [];
            // var current_id =_.toNumber(this.currentEvent.id);
            // console.log(current_id);
            // _.forEach(this.allEvents, function(value, key) {
            //     console.log(value)
            //     if(_.toNumber(value.id) != current_id){
            //         var current_promo = vm.findEventById(value.id);
            //         current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
            //         temp_promo.push(current_promo);
            //     }
            // });
            // this.storePromos = temp_promo;
            var currentContest = .findContestBySlug('canyoncrest-test-contest');
            console.log("promos",this.storePromos);
        }  
      },
      computed: {
        findContestBySlug () {
          return this.$store.getters.findContestBySlug;
        },
        findContestById () {
          return this.$store.getters.findContestById;
        },
        allEvents () {
             return this.$store.getters.processedEvents;
        },
        timezone() {
          return this.$store.getters.getTimezone;
        },
        property (){
            return this.$store.getters.getProperty;
        }
      },
      methods: {
                truncate(val_body){
                    var truncate = _.truncate(val_body, { 'length': 99, 'separator': ' ' });
                    return truncate;
                },
                shareURL(slug){
                    // console.log(window.location.host, "\n http://"+ window.location.host);
                    var share_url = "http://www.shopcanyoncrest.com/events/" + slug;
                    return share_url;
                }
            }
    });
  });
</script>
      