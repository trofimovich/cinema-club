define(["jquery","underscore","backbone","app/views/personPage/personDetailsView","app/views/personPage/personMoviesView","app/templates/cinemaClubTmpls"],function(e,t,n,r,i,s){var o=n.View.extend({template:t.template(s.personPage),initialize:function(e){this.params=e,this.$el.html(this.template()),this.render()},render:function(){function o(){t.isRendered&&n.isRendered&&s.trigger("rendered")}var t=new r({el:e(".credit-details"),url:{api_key:this.params.url.api_key,personId:this.params.url.personId}}),n=new i({el:e(".person-movies"),url:{api_key:this.params.url.api_key,personId:this.params.url.personId}});t.render(),n.render(),t.on("rendered",o),n.on("rendered",o);var s=this}});return o});