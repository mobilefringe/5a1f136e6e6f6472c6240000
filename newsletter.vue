<template>
    <div class=" main_container" id="promotions_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin_25_across padding_top_40">
            <div class="row">
                <div id="send_contact_success" class="alert alert-success" role="alert" v-show="formSuccess">
                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                    <span class="sr-only">Success</span>
                    Thank you for subscribing to our newsletter.
                </div>
                <div id="send_contact_error" class="alert alert-danger" role="alert" v-show="formError">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span class="sr-only">Error:</span>
                    There was an error when trying to submit your request. Please try again later.
                </div>
                <div class="col-sm-5 contact_contents padding_top_20">
                    <form class="form-horizontal" action="form-submit" @submit.prevent="validateBeforeSubmit">
                        <div class="form-group ">
                            <div class="col-sm-12 col-xs-12" :class="{'has-error': errors.has('name')}">
                                <label class="label" for="name">Name</label>
                                <input v-model="form_data.name" v-validate="'required'" class="form-control" :class="{'input': true}" name="name" type="text" placeholder="Name" data-vv-delay="1000">
                                <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('name') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12 col-xs-12" :class="{'has-error': errors.has('email')}">
                                <label class="label" for="email">Email</label>
                                <input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="1000">
                                <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
                            </div>
                        </div>
                        <div class="form-group account-btn text-left m-t-10">
                            <div class="col-xs-12">
                                <button class="animated_btn" type="submit" :disabled="formSuccess">Subscribe</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-sm-7 text-center">
                    <img style="max-width:100%;" src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512580269422/placeholder_contact_image.png" alt="plaza">
                </div> 
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate', 'campaignMonitor'], function(Vue, Vuex, moment, tz, VueMoment, Meta, VeeValidate, campaignMonitor) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dayOfTheWeek : [
                        "Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                    ],
                    currentPage: null,
                    form_data : {},
                    loginPending: null,
                    formSuccess : false,
                    formError: false
                }
            },
            mounted () {
                if(this.$route.query.success == 'success') {
                    this.formSuccess = true;
                    console.log('this.$router' ,this.$router);
                    this.$router.replace('/newsletter');
                }
            },
            watch : {
                $route () {
                    if(this.$route.query.success == 'success') {
                        this.formSuccess = true;
                        console.log('this.$router' ,this.$router);
                        this.$router.replace('/newsletter');
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                ])
            },
            methods: {
                validateBeforeSubmit(form) {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            
                            if(errors.length > 0) {
                                console.log("Error");
                                this.formError = true;
                            }
                            else {
                                form.preventDefault();
                                console.log("No Error", form);
                                var vm = this;
                                $.getJSON(
                                    form.target.action ,
                                    $(form.target).serialize(),
                                    function (data) {
                                    if (data.Status === 400) {
                                      vm.formError = true;
                                        console.log("ERROR");
                                    } else { // 200
                                        vm.formSuccess = true;
                                        console.log("SUCCESS");
                                    }
                                });
                                form.preventDefault();
                            }
                        }
                    })
                }
            }
        });
    });
</script>
