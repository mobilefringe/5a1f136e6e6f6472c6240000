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
                        <p class="feature_title">{{item.name}}</p>
                        <div class="feature_item wow animated flipInX animated teamy-team">
                            <article class="teamy teamy_style2 teamy_mask-circle teamy_zoom-photo">
                                <div class="teamy__layout">
                                    <a href="{{item.url}}" >
                                        <div class="teamy__preview">
                                            <img :src="item.image_url" class="teamy__avatar" alt="The demo photo">
                                        </div>
                                        <div class="teamy__back">
                                            <div class="teamy__back-inner">
                                                <div class="teamy__content">
                                                    <h3 class="teamy__name">View</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </article>
                        </div>
                </div>
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
                },
                banner_features () {
                   return  _.slice(this.$store.state.results.feature_items, 0, 2);
                },
                feature_items () {
                    console.log(this.$store.state.results.feature_items);
                    return _.slice(this.$store.state.results.feature_items, 2,this.$store.state.results.feature_items.length );
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
