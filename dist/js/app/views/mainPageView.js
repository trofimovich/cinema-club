define(["jquery","underscore","backbone","app/collections/movieCollection","app/templates/cinemaClubTmpls","app/views/movieListView"],function(e,t,n,r,i,s){var o=n.View.extend({template:t.template(i.mainPage),initialize:function(){this.render();var t=new s({el:e(".on-screens-content"),collection:new r({}),url:"https://api.themoviedb.org/3/movie/now_playing?api_key=5905778f9ef16e30fdd2407c34a27b03&page=1"}),n=new s({el:e(".popular-content"),collection:new r({}),url:"https://api.themoviedb.org/3/movie/popular?api_key=5905778f9ef16e30fdd2407c34a27b03&page=1"}),i=new s({el:e(".top-rated-content"),collection:new r({}),url:"https://api.themoviedb.org/3/movie/top_rated?api_key=5905778f9ef16e30fdd2407c34a27b03&page=1"});t.on("reset",t.render),n.on("reset",n.render),i.on("reset",i.render);var o=this;i.on("reset",function(){o.trigger("rendered")})},render:function(){var e=this.template({});this.$el.html(e)}});return o});