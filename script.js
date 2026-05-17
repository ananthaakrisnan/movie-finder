const btn =
document.getElementById(
"searchBtn"
);

const input =
document.getElementById(
"searchInput"
);

const container =
document.getElementById(
"movieContainer"
);

const status =
document.getElementById(
"status"
);



/* BUTTON CLICK */

btn.addEventListener(
"click",
searchMovie
);



/* ENTER KEY */

input.addEventListener(
"keydown",
function(e){

if(e.key==="Enter"){

searchMovie();

}

}
);



/* SEARCH FUNCTION */

async function searchMovie(){

let movie =
input.value.trim();

container.innerHTML = "";


/* EMPTY INPUT */

if(movie===""){

status.innerHTML="";

container.innerHTML=`

<div class="empty-box">

<div class="empty-icon">

🍿

</div>

<h2>

Movie Name Required

</h2>

<p>

Please enter a movie or TV show name before searching.

</p>

<div class="retry">

<span onclick="quickSearch('Batman')">

Batman

</span>

<span onclick="quickSearch('Avengers')">

Avengers

</span>

<span onclick="quickSearch('Wednesday')">

Wednesday

</span>

</div>

</div>

`;

return;

}



/* LOADING */

btn.disabled=true;

status.innerHTML=`

<div class="loader"></div>

<p>

Searching movie...

</p>

`;



try{

let response =
await fetch(
`https://api.tvmaze.com/search/shows?q=${movie}`
);


let data =
await response.json();



/* NO RESULT */

if(data.length===0){

status.innerHTML="";

container.innerHTML=`

<div class="not-found">

<div class="not-found-icon">

🎭

</div>

<h2>

Movie Not Found

</h2>

<p>

No movie or TV series found.

Try another keyword.

</p>

</div>

`;

btn.disabled=false;

return;

}



/* SUCCESS */

status.innerHTML=
`🎬 Found ${data.length} Results`;



data.forEach(item=>{

let show =
item.show;


/* CLEAN SUMMARY */

let summary =
show.summary
?
show.summary
.replace(/(<([^>]+)>)/ig,'')
.substring(0,120)+"..."
:
"No description available";


container.innerHTML += `

<div class="card">

<img
src="${
show.image
?
show.image.medium
:
'https://dummyimage.com/300x450/1f1f1f/ffffff&text=No+Image'
}"
alt="${show.name}"
>


<div class="movie-title">

${show.name}

</div>


<div class="info">

<span>

📅 ${
show.premiered
?
show.premiered.substring(0,4)
:
'N/A'
}

</span>


<span>

⭐ ${
show.rating.average
?
show.rating.average
:
'No Rating'
}

</span>

</div>


<div class="genre">

${
show.genres[0]
?
show.genres[0]
:
'Unknown'
}

</div>


<div class="summary">

${summary}

</div>

</div>

`;

});

}
catch(error){

console.log(error);

status.innerHTML=`
❌ Failed to connect API
`;

}
finally{

btn.disabled=false;

}

}



/* QUICK SEARCH */

function quickSearch(name){

input.value=name;

searchMovie();

}