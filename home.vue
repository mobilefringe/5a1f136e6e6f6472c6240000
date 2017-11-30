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
        <div class="content_container main_container hidden_phone  position_relative">
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
            <div class="promotions">
                <h3 class="promotion_heading">Up Coming Promotions & Events!</h3>
                <p class="exclusive_deals">don’t miss our exclusive deals</p>
                <hr/>
                <div class="home_promotions feature_row" id="promos_container">
                    <div class="promotion_item wow animated flipInX animated teamy-team">
                        <article class="teamy teamy_style2 teamy_mask-circle teamy_zoom-photo">
                            <div class="teamy__layout">
                                 <a href="/promotions/{{slug}}">
                                    <div class="teamy__preview">
                                        <img src="{{image_url}}" class="teamy__avatar featured_promo_img" alt="The demo photo">
                                    </div>
                                    <div class="teamy__back">
                                        <div class="teamy__back-inner">
                                            <div class="teamy__content">
                                                <h3 class="teamy__name">View Details</h3>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </a>
                            </div>
                        </article>
                        <h3 class="promotion_header home_promos">{{name}}</h3>
                        <p class="promotion_dates">{{dates}}</p>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vue!today_hours", "vue!search-component", 'vue!vue-slick'], function(Vue, TodayHoursComponent, SearchComponent, slick) {
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
                processedStores() {
                  return this.$store.getters.processedStores;
                },
                banners () {
                    console.log(_.orderBy(this.$store.state.results.banners, ['position'], ['asc']));
                    return _.orderBy(this.$store.state.results.banners, ['position'], ['asc']);
                }
                feature_items () {
                    console.log(this.$store.state.results.feature_items);
                    return  _.slice(this.$store.state.results.feature_items, 0, 3);
                },
                promotions() {
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
