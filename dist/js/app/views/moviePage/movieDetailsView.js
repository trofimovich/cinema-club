define(["jquery","underscore","backbone","app/models/movieModel","app/templates/cinemaClubTmpls"],function(e,t,n,r,i){var s=n.View.extend({template:t.template(i.movieDetails),events:{"click .fa-heart,.fa-heart-o":"toggleFavourites"},initialize:function(e){this.params=e},render:function(){this.isRendered=!1,this.model=new r({api_key:this.params.url.api_key,movieId:this.params.url.movieId});var e=this;this.model.on("change",function(){e.$el.html(e.template(e.model.toJSON())),e.isRendered=!0,e.trigger("rendered")}),this.model.fetch({reset:!0,ajaxSync:!0})},toggleFavourites:function(e){e.preventDefault(),this.model.toggleFavourites()}});return s});