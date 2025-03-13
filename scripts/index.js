const categories=()=>{
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res=>res.json())
  .then(data=>btnCategories(data.categories))
};
const btnCategories=(category)=>{
  // console.log(category)
  const categoriesContainer = document.getElementById('categories-container');
  for(let cate of category){
    const div = document.createElement('div');
    div.innerHTML =`
    <button class="btn bg-[#25252520] hover:bg-[#FF1F3D]  hover:text-white">${cate.category}</button>
    `
    categoriesContainer.append(div);
  }
}
categories()