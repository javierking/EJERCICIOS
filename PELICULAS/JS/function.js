const init = () => {
	$('#movie_sheard').on('keyup',(e) => {
		//console.log('escribiendo');
		//console.log(e);
		if(e.keyCode == 13 ) {
			var movie = document.getElementById('movie_sheard').value;
			if(movie.length <= 0) alert('por favor ingrese un nombre de la pelicula')
		else load_movies(movie,'s',1);		
		}
	});
} 

const load_movies = (movie,type,page) => {
	const myKey = '5154afe0';
	$.ajax({
		url:'http://www.omdbapi.com/?apiKey='+ myKey + '&'  + type + '=' + movie + '&page=' + page
		,dateType: 'json'
		,type: 'post'
		,success: (reponse) => {
			//console.log(reponse) any 
			let dict = {
				s: show_movies,
				i: show_single_movie
			};
			let args ={
			s: [reponse.Search,'movies_results']
			,i: [reponse]
			};
			dict[type](...args[type]);						
			movie_paginator(movie,reponse.totalResults,'movies_paginator');
		}
		,error: () =>{
			console.log('me revente')
		}
	});
}

const show_movies = (results,div) => {
	let container = document.getElementById(div);
	container.innerHTML = '';
	let row = document.createElement('div');
	row.className= 'row';
	container.appendChild(row);
	for(let i of results){
		let col = document.createElement('div');
		col.className = 'col-md-4 col-sm-6 col-xs-12';
		row.appendChild(col);
		let t_div = document.createElement('div');
		t_div.className = 'thumbnail custom-thumbnail';
		col.appendChild(t_div);
		let t_img = document.createElement('img');
		t_img.src = i.Poster;
		t_div.appendChild(t_img);
		//
		let t_divCaption = document.createElement('div');
		t_divCaption.className = 'caption';
		t_div.appendChild(t_divCaption);
		let t_h3 = document.createElement('h4');
		t_h3.innerHTML = i.Title;
		t_divCaption.appendChild(t_h3);
		let t_buttons = document.createElement('p');
		t_divCaption.appendChild(t_buttons);
		let t_b_rate = document.createElement('a');
		t_b_rate.className = 'btn btn-primary';
		t_b_rate.innerHTML = 'Calificar';
		t_buttons.appendChild(t_b_rate);
		let t_b_info = document.createElement('a');
		t_b_info.className = 'btn btn-default';
		t_b_info.innerHTML = 'ver mas';
		t_buttons.appendChild(t_b_info);
		$(t_b_info).on('click',() =>{
			load_movies(i.imdbID,'i','none');
		});

	}

}

const show_single_movie = (movie) => {
	console.log(movie);
	$('#movie-modal').modal('show');
	let m_t = document.getElementById('modal-title');
	let m_c = document.getElementById('modal-content');
	m_t.innerHTML = '';
	m_c.innerHTML = '';
	m_t.innerHTML = movie.Title;
	let row = document.createElement('div');
	row.className =  'row';
	m_c.appendChild(row);
	let col1 = document.createElement('div')
	col1.className = 'col-md-6 col-sm-6';
	row.appendChild(col1);
	let col2 = document.createElement('div')
	col2.className = 'col-md-6 col-sm-6';
	row.appendChild(col2);
	let img = document.createElement('img');
	img.src = movie.Poster;
	col1.appendChild(img);

}
const movie_paginator = (movie,result,div) => {
	console.log(result);
	console.log(div);
	console.log(movie);
	let numPages = parseInt(result/10);
	if(result % 10 !=0) numPages++;		
	let p_c = document.getElementById('div');
	p_c.innerHTML = "";
	let ul = document.createElement('ul');
	p_c.appendChild(ul);				
	ul.className = 'pagination';
	for(let i = 1; i <= numPages; i++){
		let li = document.createElement('li');
		ul.appendChild(li);
		let button = document.createElement('a');
		button.innerHTML = i;
		li.appendChild(button);
		$(button).on('click',() =>{
			load_movies(movie,'s',i);
		});
	}
}	
