<template>
    <div class="row main_container" v-if="currentPromo">
        <div class="promo_main_header sub_title">
                {{currentPromo.store.name}}
        </div>
        <div class="row mobile_padding" id="promo_details_container">
            <div class="col-md-4">
                <img :src="currentPromo.image_url"  alt="Store Logo" class="details_image" />
            </div>
            <div class="col-md-8">
                <h2 class="promo_list_name">{{currentPromo.name}}</h2>
                <div class="store_details_desc">{{currentPromo.description}}</div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment", "vue-social-sharing"], function(Vue, moment, tz, VueMoment,SocialSharing) {
    return Vue.component("promo-details-component", {
      template: template, // the variable template will be injected,
      data: function() {
        return {
          currentPromo: null
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // access to component instance via `vm`
          vm.currentPromo = vm.findPromoBySlug(to.params.id);
          if (vm.currentPromo === null || vm.currentPromo === undefined){
            vm.$router.replace({ name: '404'});
          }
        })
      },
      beforeRouteUpdate (to, from, next) {
        this.currentPromo = this.findPromoBySlug(to.params.id);
        if (this.currentPromo === null || this.currentPromo === undefined){
          this.$router.replace({ name: '404'});
        }
      },
      computed: {
        findPromoBySlug () {
          return this.$store.getters.findPromoBySlug;
        },
        timezone() {
          return this.$store.getters.getTimezone;
        }
      }
    });
  });
</script>
