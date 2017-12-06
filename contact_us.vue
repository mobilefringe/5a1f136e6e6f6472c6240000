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
            <div class="row"> </div>
            
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
