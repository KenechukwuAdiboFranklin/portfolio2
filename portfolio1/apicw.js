// /*document.addEventListener("DOMContentLoaded", () => {
//     const containers = document.querySelectorAll("#product-list");

//     const getAllProducts = async() => {
//         const response = await fetch("https://dummyjson.com/posts?limit=" + containers.length);
//         const data = await response.json();
//         data.posts.forEach((post, index) => {
//             if (containers[index]) {
//                 const cardHTML = `
//             <h3>${post.title}</h3>
//             <button class="toggle-btn">Show Post</button>
//             <div class="instructions" style="display: none;">
//               <p>${post.body}</p>
//             </div>
//           `;

//                 containers[index].innerHTML = cardHTML;

//                 const button = containers[index].querySelector(".toggle-btn");
//                 const instructions = containers[index].querySelector(".instructions");

//                 button.addEventListener("click", () => {
//                     const isVisible = instructions.style.display === "block";
//                     instructions.style.display = isVisible ? "none" : "block";
//                     button.textContent = isVisible ? "Show Post" : "Hide Post";
//                 });
//             }
//         });
//     };
// });*/




// const getAllProducts = async() => {
//     const containers = document.querySelectorAll("#product-list");
//     const response = await fetch("https://newsapi.org/v2/everything?q=apple&from=2025-07-29&to=2025-07-29&sortBy=popularity&apiKey=009860c72acc49a68a5d5024d0b54150")
//const data = await response.json()
//     data.posts.forEach((post, index) => {
//         if (containers[index]) {
//             const cardHTML = `
//                 <h3>${post.title}</h3>
//                 <button class="toggle-btn">Show Post</button>
//                 <div class="instructions" style="display: none;">
//                     <p>${post.body}</p>
//                 </div>
//             `;
//             containers[index].innerHTML = cardHTML;

//             const button = containers[index].querySelector(".toggle-btn");
//             const instructions = containers[index].querySelector(".instructions");

//             button.addEventListener("click", () => {
//                 const isVisible = instructions.style.display === "block";
//                 instructions.style.display = isVisible ? "none" : "block";
//                 button.textContent = isVisible ? "Show Post" : "Hide Post";
//             });
//         }
//     });
// };

// window.addEventListener("DOMContentLoaded", getAllProducts);


/*const getAllBlogs = async() => {
const response = await fetch("https://newsapi.org/v2/everything?q=apple&from=2025-07-29&to=2025-07-29&sortBy=popularity&apiKey=009860c72acc49a68a5d5024d0b54150")
const data = await response.json()

console.log(response, data)
}

getAllBlogs()*/
const getAllProducts = async() => {
    const containers = document.querySelectorAll("#product-list");
    const response = await fetch("https://newsapi.org/v2/everything?q=apple&from=2025-07-29&to=2025-07-29&sortBy=popularity&apiKey=009860c72acc49a68a5d5024d0b54150");
    const data = await response.json();

    data.articles.forEach((post, index) => {
        if (containers[index]) {
            const imageURL = post.urlToImage || "/pics/fallback.jpg";
            const cardHTML = `
                <div class="fade-wrapper" style="opacity: 0;">
                    <img src="${imageURL}" alt="Post image">
                    <h3>${post.title}</h3>
                    <button class="toggle-btn">Show Post</button>
                    <div class="instructions" style="display: none;">
                        <p>${post.content || post.description || "No content available."}</p>
                    </div>
                </div>
            `;
            containers[index].innerHTML = cardHTML;

            const button = containers[index].querySelector(".toggle-btn");
            const instructions = containers[index].querySelector(".instructions");

            button.addEventListener("click", () => {
                const isVisible = instructions.style.display === "block";
                instructions.style.display = isVisible ? "none" : "block";
                button.textContent = isVisible ? "Show Post" : "Hide Post";
            });
        }
    });

    // Wait for all images to load
    const images = document.querySelectorAll("#product-list img");
    let loadedCount = 0;

    images.forEach((img) => {
        img.addEventListener("load", () => {
            loadedCount++;
            if (loadedCount === images.length) {
                const fadeWrappers = document.querySelectorAll(".fade-wrapper");
                fadeWrappers.forEach(wrapper => {
                    wrapper.classList.add("fade-in");
                });
            }
        });
    });
};

window.onload = getAllProducts;