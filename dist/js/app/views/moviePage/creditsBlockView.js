define(["jquery","underscore","backbone","bootstrap","app/collections/creditsCollection","app/templates/cinemaClubTmpls"],function(e,t,n,r,i,s){var o=n.View.extend({template:t.template(s.creditsBlock),creditItemTemplate:t.template(s.creditItem),initialize:function(e){this.params=e,this.el=e.el},events:{"click .spoiler-btn":"expandSpoiler"},render:function(){var e=this,t="",n="";this.isRendered=!1,this.collection=new i({api_key:this.params.url.api_key,movieId:this.params.url.movieId}),this.collection.fetch({reset:!0,ajaxSync:!0}),this.collection.on("reset",function(){this.each(function(r,i){i<6?t+=e.creditItemTemplate(r.toJSON()):n+=e.creditItemTemplate(r.toJSON())}),e.$el.append(e.template({creditsVisible:t,creditsUnderSpoiler:n})),e.isRendered=!0,e.trigger("rendered")})},expandSpoiler:function(t){t.preventDefault(),e(t.target).parent().children(".spoiler-body").collapse("toggle")}});return o});