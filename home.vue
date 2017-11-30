<template>
  <div class="row main_container">
        <slick ref="slick" :options="slickOptions">
            <div class="" v-for="banner in banners">
                <img :src="banner.image_url" class="" alt="">
                <div class="banner_text" v-if="banner.description">
                    <p class="banner-description">{{banner.description}}</p>
                    <router-link :to="banner.url">
                        <div class="banner_see_more">  See All <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></div>
                    </router-link>
                </div>
            </div>
        </slick>
    <!--<div class="large-6 columns">-->
    <!--  <div>-->
    <!--    <h1>{{title}}</h1>-->
    <!--    <p>{{description}}</p>-->
    <!--    <hr/>-->
    <!--    <h5>Translated text example:</h5>-->
    <!--    <p>{{ $t("message.hello") }}</p>-->
    <!--    <p>{{property.name}}</p>-->
    <!--    <hr/>-->
    <!--    <today-hours></today-hours>-->
    <!--    <search-component v-model="search" :list="processedStores" :suggestion-attribute="suggestionAttribute" @select="onOptionSelect">-->
    <!--      <template slot="item" scope="option">-->
    <!--        <article class="media">-->
              <!--<figure class="media-left">
                <p class="image is-64x64">
                  <img :src="option.data.store_front_url_abs">
                </p>
              </figure>-->
    <!--          <p>-->
    <!--            <strong>{{ option.data.name }}</strong>-->
    <!--          </p>-->
    <!--        </article>-->
    <!--      </template>-->
    <!--    </search-component>-->
    <!--  </div>-->
    <!--</div>-->
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
