<template>
    <div class="row main_container" v-if="currentPromo">
        <div class="row mobile_padding" id="promo_details_container">
            <div class="col-md-12">
                <img src="{{image_url}}" style="{{promo_image_show}}" alt="Store Logo" class="details_image" />
                <h2 class="promo_list_name">{{name}}</h2>
              
                <p class="show_phone"><a href="/stores/{{store_slug}}" style="{{store_show}}" class="read_more">View Store Details</a></p>
                <div class="store_details_desc">{{{rich_description}}}</div>
            </div>
        </div>
    </div>
</template>

<script>
  define(["Vue", "moment", "moment-timezone", "vue-moment"], function(Vue, moment, tz, VueMoment) {
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
