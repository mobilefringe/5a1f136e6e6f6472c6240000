<template>
    <div class=" main_container" id="promotions_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin_25_across padding_top_40">
            <div class="row">
                <div class="col-md-5">
                    <div class="col-md-12" v-if="currentPage">
                        <div class="description_text text_left" v-html="currentPage.body"></div>
                    </div>
                </div>
                <div class="col-md-7 hidden_phone">
                    <img style="margin-bottom:20px;" src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512580269422/placeholder_contact_image.png" alt="plaza">
                </div> 
            </div>
            <hr/> hi
            <div class="col-md-12 contact_contents">
            
                <form name="contact_form" id="contact_form" method="post">
                    <div class="row "  style="margin-left:0px;margin-right:0px">
                        <h5 class="promo_list_desc">We value your feedback. Send us your comments or questions by completing the contact form below.</h5>
                    </div>
                    <div class="row padding_top_20" >
                        <div class="col-sm-6 col-md-6 ">
                            <label for="name">Name</label>
                            <input name="name" id="name" class="form-control" type="text" value="" required>
                        </div>
                        <div class="col-sm-6 col-md-6">
                            <label for="email" >E-mail</label>
                            <input name="email" id="email" class="form-control" type="text" value="" required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <label for="subject">Subject</label>
                            <input name="subject" id="subject" class="form-control" type="text" required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <label for="message">Message</label>
                            <textarea name="message" id="message" rows="8" class="form-control" required></textarea>
                        </div>
                        <div class="col-sm-12 col-md-12">
                        <br>
                            <label for="enterVerify">Enter the following number below to proceed: <div id="verifyNum">{{rannumber}}</div></label><br>
                            <input type="hidden" :value="rannumber" id="verifyNumHidden" name="verifyNumHidden" />
                            <input type="text" id="enterVerify" name="enterVerify" />
                        </div>
                    </div>
                    
                    <div class="row">
                            <div class="col-sm-12 col-md-12"><br/>
                            <button id="submit" class="animated_btn" type="submit">Submit</button>
                        </div>
                    </div>
                    
                    
                    
                </form>
                <div id="send_contact_success" class="alert alert-success" role="alert" style="display:none">
                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                    <span class="sr-only">Success</span>
                    Thank you for contacting us. A member from our team will contact you shortly. 
                      
                </div>
                <div id="send_contact_error" class="alert alert-danger" role="alert" style="display:none">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span class="sr-only">Error:</span>
                    There was an error when trying to submit your request. Please ensure you have entered a valid email address and subject and please try again.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, moment, tz, VueMoment, Meta) {
        Vue.use(Meta);
        return Vue.component("contact-us-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dayOfTheWeek : [
                        "Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                    ],
                    currentPage: null
                }
            },
            beforeRouteEnter (to, from, next) {
                next(vm => {
                  // access to component instance via `vm`
                    vm.$store.dispatch('LOAD_PAGE_DATA', {url:vm.property.mm_host + "/pages/canyoncrest-contact.json"}).then(response => {
                        
                        vm.currentPage = response.data;
                        console.log(vm.currentPage);
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        vm.$router.replace({ name: '404'});
                    });
                })
            },
            beforeRouteUpdate (to, from, next) {
                this.$store.dispatch('LOAD_PAGE_DATA', {url:this.property.mm_host + "/pages/canyoncrest-contact.json"}).then(response => {
                    // this.dataLoaded = true;
                    this.currentPage = response.data;
                    console.log(this.currentPage);
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ name: '404'});
                });
            },
            mounted () {
              console.log(this.hours);
              console.log(this.holidayHours);
            },
            computed: {
                timezone () {
                  return this.$store.getters.getTimezone;
                },
                property (){
                    return this.$store.getters.getProperty;
                },
                hours () {
                    return this.$store.getters.getPropertyHours;
                },
                holidayHours () {
                    return this.$store.getters.getPropertyHolidayHours;
                },
                reducedHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.filter(holidayHours, function(o) { return !o.is_closed; });
                },
                closeHolidays () {
                    var holidayHours = this.holidayHours;
                    return _.filter(holidayHours, function(o) { return o.is_closed; });
                },
                rannumber () {
                    var rannumber='';
                    for(ranNum=1; ranNum<=6; ranNum++){
                      rannumber+=Math.floor(Math.random()*10).toString();
                    }
                    return rannumber;
                }
            }
        });
    });
</script>
