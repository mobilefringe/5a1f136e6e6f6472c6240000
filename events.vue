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
        <div class="row">
            <full-calendar :events="fcEvents" locale="en"></full-calendar>
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
  .top_promo_date{
      margin-top:10px;
  }
</style>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
    Vue.use(Meta);
    return Vue.component("events-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
            success_subscribe : false,
            fcEvents : [
            	{
                  title : 'Sunny Out of Office',
                  start : '2017-12-25',
                  end : '2017-12-27'
                }
            ]
        }
      },
      mounted () : {
          
      },
      computed: {
        events() {
            // var promos = this.$store.getters.processedEvents;
            // console.log(this.$store);
            // _.forEach(promos, function (val) {
            //     if(val.description.length >50) {
            //       val.description = _.truncate(val.description, {'length':50,'separator': ' '})
            //     }
            // });
          return this.$store.getters.processedEvents;
        },
        timezone () {
          return this.$store.getters.getTimezone;
        },
        property (){
            return this.$store.getters.getProperty;
        },
      }
    });
  });
</script>
