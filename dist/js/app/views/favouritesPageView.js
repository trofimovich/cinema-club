define(["jquery","underscore","backbone","app/collections/favouritesCollection","app/templates/cinemaClubTmpls"],function(e,t,n,r,i){var s=n.View.extend({template:t.template(i.listPage),initialize:function(e){this.params=e,this.render()},render:function(){var e=new r({modelType:this.params.section}),n="";switch(this.params.section){case"movies":this.listItemTemplate=t.template(i.movieListItem);break;case"persons":this.listItemTemplate=t.template(i.personListItem)}e.fetch({reset:!0}),console.log(e);var s=this;e.each(function(e,t){n+=s.listItemTemplate(e.toJSON())}),this.$el.html(this.template({listItems:n}))}});return s});