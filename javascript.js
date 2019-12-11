// DOM loaded

document.addEventListener("DOMContentLoaded", getJSON);
let blog;
let blogTemplate = document.querySelector("#blog-template");
let blogContainer = document.querySelector(".container");

// Hent json
async function getJSON() {
    let jsonData = await fetch("http://digcon.dk/N24/wp-json/wp/v2/blog" + "?per_page=100");
    blog = await jsonData.json();
    console.log(blog);
    visBlog();
}

// Viser og kloner
function visBlog() {
    blog.forEach(bloggen => {

        let klon = blogTemplate.cloneNode(true).content;

        klon.querySelector(".data-titel").textContent = bloggen.title.rendered;
        klon.querySelector(".data-skribent").textContent = "Skribent: " + bloggen.acf.skribent;
        klon.querySelector(".data-underrubrik").textContent = bloggen.acf.underubrik;
        klon.querySelector("img").src = bloggen.acf.splash_billede;
        klon.querySelector(".blog-article").addEventListener("click", () => {
            window.location.href = "singleview.html?id=" + bloggen.id;
        });
        blogContainer.appendChild(klon);
    });
};

