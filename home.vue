<template>
    <div class="row">
        <slick ref="slick" :options="slickOptions">
            <div v-for="banner in banners" v-if="banners">
                <div style="background-image:url(http://placehold.it/1920x500)" class="banner_image_div">
                    <router-link :to="banner.url" class="banner_image_li"></router-link>
                </div>
                <!--<img :src="banner.image_url" class="" alt="">-->
            </div>
        </slick>
        <div class="content_container main_container  position_relative">
            <div class="feature_row" id="feature_container_2">
                <div class="feature_item_container" v-for="item in feature_items">
                    <div class="feature_item wow animated flipInX animated teamy-team">
                        <article class="teamy teamy_style2 teamy_mask-circle teamy_zoom-photo">
                            <div class="teamy__layout">
                                <router-link :to="item.url" >
                                    <div class="teamy__preview">
                                        <img :src="item.image_url" class="teamy__avatar" alt="The demo photo">
                                    </div>
                                    <div class="teamy__back"></div>
                                    <p class="feature_text">{{item.name}}</p>
                                </router-link>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
            <div class="promotions" id="feature_promotions" v-if="promotions">
                <h3 class="promotion_heading">Up Coming Events & Promotions!</h3>
                <p class="exclusive_deals sub_title">Don’t miss our exclusive deals & events</p>
                
                <div class="home_promotions feature_row" id="promos_container">
                    <div class="promotion_item wow animated flipInX animated teamy-team text_center" v-for="promo in promotions">
                        <p class="promotion_dates">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
                        <article class="teamy teamy_style2 teamy_mask-circle teamy_zoom-photo">
                            <div class="teamy__layout">
                                <router-link :to="'/promotions/'+promo.slug">
                                    <div class="teamy__preview">
                                        <img :src="promo.image_url" class="teamy__avatar featured_promo_img" alt="The demo photo">
                                    </div>
                                    <div class="teamy__back">
                                        <div class="teamy__back-inner">
                                            <div class="teamy__content">
                                                <h3 class="teamy__name">View Details</h3>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </article>
                        <h3 class="promotion_header home_promos">{{promo.name}}</h3>
                        <router-link :to="'/promotions/'+promo.slug" class="newsletter_btn animated_btn text_center">Read More</router-link>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        
        <div class="content_container  hidden_phone  position_relative" style="padding:0">
            <div class="main_container">
                <div class="newsletter_container text-center">
                        <h2 class="heading">SIGN UP TO RECEIVE OUR UPDATES</h2>
                        <p class="newsletter_desc sub_title">Special Offers <br class="show_phone" /><span>•</span> New Store Openings <br class="show_phone" /><span>•</span> Exclusive Events</p>
                        <router-link to="/newsletter" class="animated_btn newsletter_btn">Subscribe</router-link>
                    </div>
                 <hr/>
            </div>
            <!--<h2 class="promotion_heading text-center visit_us_header">Visit Us!</h2>-->
            <iframe  class="grayscale visit_us_iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2198.58586155242!2d-117.33154422162433!3d33.95621236060249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcafb3e8e622a7%3A0x9e4673950258330a!2s5225+Canyon+Crest+Dr%2C+Riverside%2C+CA+92507%2C+USA!5e0!3m2!1sen!2sca!4v1511989451889"  width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
            <hr/>
        </div>
        <div class="content_container position_relative main_container show_phone ">
           <h2 class="promotion_heading text-center visit_us_header">VISIT US!</h2>
            <iframe  class="grayscale visit_us_iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2198.58586155242!2d-117.33154422162433!3d33.95621236060249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcafb3e8e622a7%3A0x9e4673950258330a!2s5225+Canyon+Crest+Dr%2C+Riverside%2C+CA+92507%2C+USA!5e0!3m2!1sen!2sca!4v1511989451889"  width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vue!today_hours", "vue!search-component", "vue!vue-slick","moment", "moment-timezone", "vue-moment", "vue-meta"], function(Vue, TodayHoursComponent, SearchComponent, slick ,moment, tz, VueMoment, Meta) {
        return Vue.component("home-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    title: "MM with Vue.js!",
                    description: "An example of integration of Mall Maverick with Vue.js",
                    suggestionAttribute: 'name',
                    search: '',
                    slickOptions: {
                        slidesToShow: 1,
                        dots : true,
                        arrows:true,
                        prevArrow: '.prev',
                        nextArrow: '.next',
                        autoplay: false
                        // Any other options that can be got from plugin documentation
                    }
                }
            },
            computed: {
                property(){
                  return this.$store.getters.getProperty;
                },
                timezone () {
                    return this.$store.getters.getTimezone;
                },
                processedStores() {
                  return this.$store.getters.processedStores;
                },
                banners () {
                    console.log(_.orderBy(this.$store.state.results.banners, ['position'], ['asc']));
                    return _.orderBy(this.$store.state.results.banners, ['position'], ['asc']);
                },
                feature_items () {
                    console.log(this.$store.state.results.feature_items);
                    return  _.slice(this.$store.state.results.feature_items, 0, 3);
                },
                promotions () {
                    console.log(this.$store.getters.processedPromos);
                    return this.$store.getters.processedPromos;
                }
            },
            methods: {
                onOptionSelect(option) {
                  console.log('Selected option:', option)
                }
            }
        })
    })
</script>
