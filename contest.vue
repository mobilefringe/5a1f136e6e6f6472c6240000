<template>
    <div class=" main_container" id="contest_container"><!-- for some reason if you do not put an outer container div this component template will not render -->
        <!--<h3 class="promotion_heading" v-if="property"> Exclusive Events at {{property.name}}</h3>-->
        <!--<p class="exclusive_deals sub_title">Join us to celebrate and enjoy!</p>-->
        <div class="row" v-if="currentContest">
            <div class="promo-details">
                <div class="event-image">
                    <img class="contest banner" :src="currentContest.image_url">
                </div>
                <br>
                <div class="event-description" v-html="currentContest.rich_description">
                </div>
                <br>
            </div> 
            <form class="form-horizontal" action="form-submit" @submit.prevent="validateBeforeSubmit">
                <div class="form-group ">
                    <div class="col-sm-4 col-xs-12" :class="{'has-error': errors.has('first_name')}">
                        <label class="label" for="first_name">First Name</label>
                        <input v-model="contest.first_name" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="1000">
                        <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
                    </div>
                    <div class="col-sm-4 col-xs-12" :class="{'has-error': errors.has('last_name')}">
                        <label class="label" for="last_name">Last Name</label>
                        <input v-model="contest.last_name" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="1000">
                        <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
                    </div>
                    <div class="col-sm-4 col-xs-12" :class="{'has-error': errors.has('email')}">
                        <label class="label" for="email">Email</label>
                        <input v-model="contest.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="1000">
                        <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-4 col-xs-12" :class="{'has-error': errors.has('phone')}">
                        <label class="label" for="phone">Phone</label>
                        <input v-model="contest.phone" v-validate="'required|alpha_dash'" class="form-control" :class="{'input': true}" name="phone" type="phone" placeholder="Phone" data-vv-delay="1000">
                        <span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
                    </div>
                    <div class="col-sm-4 col-xs-12" :class="{'has-error': errors.has('postal_code')}">
                        <label class="label" for="postal_code">Postal Code</label>
                        <input v-model="contest.postal_code" v-validate="'required|alpha_dash'" class="form-control" :class="{'input': true}" name="postal_code" type="text" placeholder="postal_code" data-vv-delay="1000">
                        <span v-show="errors.has('postal_code')" class="form-control-feedback">{{ errors.first('postal_code') }}</span>
                    </div>
                    <div class="col-sm-4 col-xs-12" :class="{'has-error': errors.has('city')}">
                        <label class="label" for="city">City</label>
                        <input v-model="contest.city" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true}" name="city" type="text" placeholder="city" data-vv-delay="1000">
                        <span v-show="errors.has('city')" class="form-control-feedback">{{ errors.first('city') }}</span>
                    </div>
                </div>
                <div class="form-group account-btn text-left m-t-10">
                    <div class="col-xs-12">
                        <button class="animated_btn" type="submit" :disabled="formSuccess">Submit</button>
                    </div>
                </div>
            </form>
            <div id="send_contact_success" class="alert alert-success" role="alert" v-show="formSuccess">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                <span class="sr-only">Success</span>
                Thank you for contacting us. A member from our team will contact you shortly.
            </div>
            <div id="send_contact_error" class="alert alert-danger" role="alert" v-show="formError">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span class="sr-only">Error:</span>
                There was an error when trying to submit your request. Please try again later.
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
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta",'vee-validate'], function(Vue, moment, tz, VueMoment, Meta, VeeValidate) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("contest-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentContest: null,
                    success_subscribe : false,
                    storePromos : null,
                    contest : {},
                    formSuccess : false,
                    formError: false
                }
            },
            mounted () {
                this.currentContest = this.findContestBySlug('canyoncrest-test-contest');
                console.log(this.currentContest);
            },
            // watch : {
            //     currentContest : function (){
            //         // var vm = this;
            //         // var temp_promo = [];
            //         // var current_id =_.toNumber(this.currentEvent.id);
            //         // console.log(current_id);
            //         // _.forEach(this.allEvents, function(value, key) {
            //         //     console.log(value)
            //         //     if(_.toNumber(value.id) != current_id){
            //         //         var current_promo = vm.findEventById(value.id);
            //         //         current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
            //         //         temp_promo.push(current_promo);
            //         //     }
            //         // });
            //         // this.storePromos = temp_promo;
            //         var currentContest = .findContestBySlug('canyoncrest-test-contest');
            //         console.log("promos",this.storePromos);
            //     }  
            // },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'contests',
                    'findContestBySlug',
                    'findContestById'
                ]),
                findContestBySlug () {
                  return this.$store.getters.findContestBySlug;
                },
                findContestById () {
                  return this.$store.getters.findContestById;
                },
                // allEvents () {
                //      return this.$store.getters.processedEvents;
                // },
                // timezone() {
                //   return this.$store.getters.getTimezone;
                // },
                // property (){
                //     return this.$store.getters.getProperty;
                // }
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
                },
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            console.log("sending form data", this.contest);
                            send_data = {};
                            send_data.url = this.property.mm_host + '/newsletter_no_captcha';
                            send_data.form_data = JSON.stringify(this.contest);
                            this.$store.dispatch("POST_TO_MM", send_data).then(res => {
                                // this.$router.replace({
                                //     name: 'home'
                                // })
                                this.formSuccess = true;
                            }).catch(error => {
                                try {
                                    if (error.response.status == 401) {
                                        console.log("Data load error: " + error.message);
                                        this.formError = true;
                                    } 
                                    else {
                                        console.log("Data load error: " + error.message);
                                        this.formError = true;
                                    }
                                } 
                                catch (e) {
                                    console.log("Data load error: " + error.message);
                                    this.formError = true;
                                }
                            })
                        }
                    })
                },
                serializeObject (obj) {
                    console.log(obj);
                    var newObj = [];
                    // var counter = 0;
                    _.forEach(obj, function(value, key) {
                        var tempVal = {};
                        tempVal.name = key;
                        tempVal.value = value;
                        // console.log(key);
                        // counter ++;
                        newObj.push(tempVal);
                    });
                    return newObj;
                }
            }
        });
    });
</script>