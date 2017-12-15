<template>
    <div class=" main_container" id="events_container"><!-- for some reason if you do not put an outer container div this component template will not render -->
        <!--<h3 class="promotion_heading" v-if="property"> Exclusive Events at {{property.name}}</h3>-->
        <!--<p class="exclusive_deals sub_title">Join us to celebrate and enjoy!</p>-->
        <div class="row">
            <div class="promo-details">
                <div class="event-image">
                    <img class="contest banner" src="{{alt_photo_url}}">
                </div>
                <br>
                <div class="event-description">
                    {{{ rich_description }}}
                </div>
                <br>
            </div> 
            <form id="contest_form">
                <input id="property_id" name="contest[property_id]" type="hidden" value="{{property_id}}"/>
                <input id="contest_id" name="contest[contest_id]" type="hidden"  value="{{id}}" />
                <input type="hidden" name="cm-name" id="cm-name" />
                <div class="row ">
                    <div class="col-md-4 margin_30">
                        <label for="first_name">First Name</label>  
                        <input class="form-control" id="first_name" name="contest[first_name]" type="text" required data-validation="required" tabindex="1"/>
                    </div>
                    <div class="col-md-4 margin_30">
                        <label for="last_name">Last Name</label>  
                        <input class="form-control" id="last_name" name="contest[last_name]" type="text" required data-validation="required" tabindex="2"/>
                    </div>
                    <div class="col-md-4 margin_30">
                        <label for="phone">Phone Number</label>  
                        <input class="form-control" id="phone" name="contest[phone]" type="text" required data-validation="required" tabindex="3"/>    
                    </div>
                </div>
                <br class="hidden_phone">
                <div class="row">
                    <div class="col-md-4">
                        <label for="postal_code">Postal Code</label>  
                        <input class="form-control" id="postal_code" name="contest[postal_code]" type="text" required data-validation="required" tabindex="4"/>
                    </div>
                    <div class="col-md-4">
                        <label for="city">City</label>  
                        <input class="form-control" id="city" name="contest[city]" type="text" required data-validation="required" tabindex="5"/>    
                    </div>
                    <div class="col-md-4">
                        <label for="email">Email</label> 
                        <input class="form-control" id="email" name="contest[email]" type="email" required data-validation-regexp="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" data-validation-error-msg="Please enter a valid email address" data-validation="custom" tabindex="6"/>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-12">
                        <label class="agree">
                            <input id="newsletter_signup" type="checkbox" name="contest[newsletter]" tabindex="7"/> 
                            Yes, I would like to receive information about events and promotions from Yuba Sutter Mall.
                        </label>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <a class="contest_link" href="/pages/yubasutter-rules-regulations" target="_blank" tabindex="8">Click here</a> to view the rules and regulations.
                        <br/><br/>
                        <button class=" store_header_btns" tabindex="9">Submit</button>
                        <br/><br/>
                    </div>
                    <div id="success_subscribe_popup" class="hidden_now">
                        <div class="alert alert-success fade in" style="margin-top:18px;">
                            <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>
                            <strong>Success!</strong> Thank you, your entry has been received.
                        </div>
                    </div>
                    <div id="error_subscribe_popup" class="hidden_now">
                        <div class="alert alert-error fade in" style="margin-top:12px;">
                            <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>
                            <strong>Sorry!</strong> There was a problem submiting your request. Please try again later!
                        </div>
                    </div>
                    <br/><br/>
                </div>
            </form>
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
      