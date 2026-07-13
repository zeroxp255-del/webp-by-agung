const cards = document.getElementById("cards");
const search = document.getElementById("search");
let templates = [];

fetch("data.json")
.then(res => res.json())
.then(data => {
templates = data;
render(data);
});

function render(data){

cards.innerHTML="";

data.forEach(item=>{

cards.innerHTML += `
<div class="card">

<img src="${item.image}" alt="${item.title}">

<div class="info">

<h3>${item.title}</h3>

<p>${item.description}</p>

<button class="create"
onclick="window.open('${item.link}','_blank')">
CREATE
</button>

</div>

</div>
`;

});

}

search.addEventListener("keyup",()=>{

const keyword = search.value.toLowerCase();

const result = templates.filter(item=>

item.title.toLowerCase().includes(keyword) ||

item.category.toLowerCase().includes(keyword)

);

render(result);

});

document.querySelectorAll(".category button").forEach(btn=>{

btn.onclick=()=>{

document.querySelector(".active").classList.remove("active");

btn.classList.add("active");

const filter=btn.dataset.filter;

if(filter==="All"){

render(templates);

}else{

render(

templates.filter(item=>item.category===filter)

);

}

};

});
