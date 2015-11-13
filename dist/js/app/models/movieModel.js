define(["underscore","backbone","backbone-local-storage","app/helpers/helpersFn"],function(e,t,n,r){var i=t.Model.extend({defaults:{id:0,title:"Unknown",type:"movie",backdropPath:"",posterPath:"",voteAverage:0,releaseDate:0,runtime:0,budget:0,revenue:100,overview:"",isInFavourites:!1,character:""},localStorage:new t.LocalStorage("fav-movie"),initialize:function(e){this.params=e},parse:function(e){var t={};return t.id=e.id,t.title=e.title,t.backdropPath=e.backdrop_path||e.backdropPath,t.posterPath=e.poster_path||e.posterPath,t.voteAverage=e.vote_average||e.voteAverage,t.releaseDate=e.releaseDate||r.format(new Date(e.release_date)),t.runtime=r.convertTime(e.runtime),t.budget=e.budget,t.revenue=e.revenue,t.overview=e.overview,t.isInFavourites=this.localStorage.find({id:e.id})?!0:!1,t.character=e.character,t},url:function(){return["https://api.themoviedb.org/3/movie/",this.params.movieId,"?api_key=",this.params.api_key].join("")},toggleFavourites:function(){this.get("isInFavourites")?(this.set("isInFavourites",!1),this.destroy()):(this.set("isInFavourites",!0),this.save())}});return i});