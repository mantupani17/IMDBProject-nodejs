(function($){
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
})(jQuery);

var app = {
    
    // all movies
    getAllMovies:function(data){
        data = data || ''
        return $.ajax({
            url:'/api/movies',
            method:'GET',
            dataType:'json'
        });
    },

    getAllMoviesForOptions:function(data){
        data = data || ''
        return $.ajax({
            url:'/api/movies-options',
            method:'GET',
            dataType:'json'
        });
    },

    addMovie:function(data){
        data = data || '';
        return $.ajax({
            url:'/api/movies',
            method:'POST',
            data:data,
            dataType:'json',
            cache:false
        });
    },
    
    addActorToMovie:function(data){
        data = data || ''
        return $.ajax({
            url:'/api/movies',
            method:'PUT',
            data:data,
            dataType:'json',
            cache:false
        });
    },

    deleteMovie:function(data){
        console.log(data);
        data = data || '';
        return $.ajax({
            url:'/api/movies',
            method:'DELETE',
            data:data,
            dataType:'json',
            cache:false
        });
    },
    // all actors
    getAllActors:function(data){
        data = data || ''
        return $.ajax({
            url:'/api/actors',
            method:'GET',
            dataType:'json'
        });
    },
    
    addActor:function(data){
        data = data || ''
        return $.ajax({
            url:'/api/actors',
            method:'POST',
            data:data,
            dataType:'json',
            cache:false
        });
    },

    getAllActorsByFilter:function(data){
        data = data || ''
        return $.ajax({
            url:'/api/get-actors-select',
            method:'GET',
            dataType:'json'
        });
    },
    // all producers        
    getAllProducers:function(data){
        data = data || ''
        return $.ajax({
            url:'/api/producers',
            method:'GET',
            dataType:'json'
        });
    },

    addProducer:function(data){
        data = data || ''
        return $.ajax({
            url:'/api/producers',
            method:'POST',
            data:data,
            dataType:'json',
            cache:false
        })
    },
}