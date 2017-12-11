require.config({
  paths: {
    'Vue': 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.1/vue',
    'vue_router': 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.7.0/vue-router.min',
    'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.1/axios.min',
    'jquery': 'https://code.jquery.com/jquery-3.2.1.min',
    'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min',
    'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min',
    'moment-timezone': 'https://momentjs.com/downloads/moment-timezone-with-data-2012-2022.min',
    'vue2-filters': 'https://cdn.jsdelivr.net/vue2-filters/0.1.8/vue2-filters.min',
    'vue': 'https://mmvue.codecloudapp.com/require-vuejs.min',
    'vuex': 'https://cdnjs.cloudflare.com/ajax/libs/vuex/2.3.1/vuex.min',
    'vue-i18n': 'https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/6.1.1/vue-i18n.min',
    'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
    'json': 'https://unpkg.com/requirejs-plugins-current@1.0.3/src/json',
    'js-cookie': 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.4/js.cookie.min',
    'vue-meta': 'https://unpkg.com/vue-meta@1.0.4/lib/vue-meta.min',
    'Fuse': 'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.0.4/fuse.min',
    'store': 'https://preview-mmvue.codecloudapp.com/store',
    'vue-moment': 'https://mmvue.codecloudapp.com/vue-moment',
    'today_hours': 'https://mmvue.codecloudapp.com/today_hours.vue?noext', //append a dummy query string so requireJS doesn't auto-append .js to the end of the url
    'search-component': 'https://mmvue.codecloudapp.com/search-component.vue?noext',
    'slick' : 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min',
    'vue-slick' : 'https://mmvue.codecloudapp.com/slick.vue?noext',
    'vue-select' : 'https://cdn.jsdelivr.net/npm/vue-select@2.3.0/dist/vue-select.min',
    'Raphael': 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min', //'http://mallmaverick.com/javascripts/mapsvg/raphael',
    'mousewheel': 'https://mallmaverick.com/javascripts/mapsvg/jquery.mousewheel',
    'mapsvg': 'https://mallmaverick.com/javascripts/mapsvg/mapsvg',
    'mm_mapsvg': 'https://mmvue.codecloudapp.com/mallmaverick_svgmap',
    'svg-map': 'https://5a1f136e6e6f6472c6240000.codecloudapp.com/svg_map.vue?noext',
    'vue-social-sharing': 'https://cdn.jsdelivr.net/npm/vue-social-sharing@2.3.1/dist/vue-social-sharing.min',
    'vee-validate' : 'https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate',
    'vue-datepicker-local' : 'https://cdn.jsdelivr.net/npm/vue-datepicker-local@1.0.9/dist/vue-datepicker-local'
  }
});

require(['Vue', 'vue2-filters', 'vue_router', 'routes', 'store', 'vue-i18n', 'locales', 'moment', "vue-meta", "moment-timezone", "vue-moment",'vue-social-sharing','vue-select', "vue!search-component", 'vue-datepicker-local'], function (Vue, Vue2Filters, VueRouter, appRoutes, store, VueI18n, messages, moment, Meta, tz, VueMoment,SocialSharing, VueSelect, SearchComponent, DatepickerLocal) {
  Vue.use(Meta);
  Vue.use(VueRouter);
  Vue.use(Vue2Filters);
  Vue.use(VueI18n);
Vue.use(SocialSharing);
  /* initialize router */
  const router = new VueRouter({
    mode: 'history',
    routes: appRoutes
  });

  /* initialize i18n */
  const i18n = new VueI18n({
    locale: 'en-ca',
    fallbackLocale: 'en-ca',
    messages,
  });

Vue.component('v-select', VueSelect.VueSelect);
// Vue.component('vue-datepicker-local', DatepickerLocal);

  /* bootstrap app */
  const vm = new Vue({
    el: '#app',
    data: function () {
      return {
        dataLoaded: false,
        show_mobile_menu : false,
        show_subscrption : false,
        show_map: false,
        is_searching : false,
        show_mobile_search : false,
        mobile_search : null,
        desktop_search : null,
        suggestionAttribute: 'name',
        menu_items: [
            // {
            //     name: "Home",
            //     id: "home_link",
            //     href: "/",
            //     parent_id: "home"
            // },
            {
                name: "Store Directory",
                id: "stores_link",
                href: "/stores"
            },
            {
                name: "Sales & Promos",
                id: "sales_link",
                href: "/promotions"
            },
            {
                name: "Events",
                id: "events_link",
                href: "/events",
            },
            {
                name: "Careers",
                id: "jobs_link",
                href: "/jobs",
            },
            {
                name: "Store Hours",
                id: "hours_link",
                href: "/hours",
            }
        ]
      }
    },
    created() {
      // make an async call to the data store to initialize the locale (i.e. it will check if there is a locale value saved in cookie, otherwise it will default to EN)
      this.$store.dispatch('INITIALIZE_LOCALE');
      
      this.$store.dispatch('LOAD_META_DATA');

      // make an async call to load mall data
      this.$store.dispatch('LOAD_MALL_DATA', {url:"https://www.mallmaverick.com/api/v4/canyoncrest/all.json"}).then(response => {
        this.dataLoaded = true;
      }, error => {
        console.error("Could not retrieve data from server. Please check internet connection and try again.");
      });
    },
    watch: {
        // watcher to update vue-i18n when the locale has been changed by the user
        locale: function (val, oldVal) {
            this.$i18n.locale = val;
            moment.locale(val);
        },
        $route : function () {
            
            if(this.$route.path == "/" || this.$route.path == "/stores") {
                this.show_subscrption = false;
            }
            else {
                this.show_subscrption = true;
                
            }
            if(this.$route.path == "/hours" ) {
                this.show_map = true;
            }
            else {
                this.show_map = false;
            }
            console.log("Changed to route:",this.$route.path, "subscription is", this.show_subscrption);
            this.show_mobile_menu = false; //close menu when navigating to new page
        },
        mobile_search : function () {
            console.log(this.mobile_search);
        }
    },
    computed: {
        // computed property for locale which returns locale value from data store and also updates the data store with new locale information
        locale: {
            get () {
                return this.$store.state.locale
            },
            set (value) {
                this.$store.commit('SET_LOCALE', { lang: value })
            }
        },
        getBanners () {
            console.log(this.$store.state.results.banners);
            return this.$store.state.results.banners;
        },
        copyright_year() {
            return moment().year();
        },
        property(){
            return this.$store.getters.getProperty;
        },
        hours(){
            var hours = _.filter(this.$store.state.results.hours, function(o) { return o.store_ids==null && o.is_holiday==0 })
            console.log(hours);
            return hours;
        },
        todays_hours () {
            return this.$store.getters.getTodayHours;
        },
        timezone () {
            return this.$store.getters.getTimezone;
        },
        allStores() {
            return this.$store.getters.processedStores;
        }
    },
    methods: {
      // utility method to allow user to change locale value
        changeLocale: function(val) {
            this.locale = val; // this will update the data store, which in turn will trigger the watcher to update the locale in the system
        },
        onOptionSelect(option) {
            console.log('Selected option:', option);
        
            this.$router.push("/stores/"+option.slug);
            this.show_mobile_search = false;
            // $(".bannerSearch .options-list").hide();
            this.mobile_search = "";
            this.desktop_search = "";
        },
    },
    router: router,
    store,
    i18n
  });
});
