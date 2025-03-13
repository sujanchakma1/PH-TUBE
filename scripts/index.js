// [
//   {
//       "category_id": "1001",
//       "category": "Music"
//   },
const showLoader = () =>{
  document.getElementById('show-loader').classList.remove('hidden')
  document.getElementById('videos-container').classList.add('hidden')
}

const hideLoader = () =>{
  document.getElementById('show-loader').classList.add('hidden')
  document.getElementById('videos-container').classList.remove('hidden')
}

function removeActiveClass (){
  const activeClass = document.getElementsByClassName('active');
  for(let btn of activeClass){
    btn.classList.remove("active");
  }
}

const loadcategories=()=>{
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res=>res.json())
  .then(data=>displayCategories(data.categories))
};

const displayCategories=(category)=>{
  // console.log(category)
  const categoriesContainer = document.getElementById('categories-container');
  for(let cate of category){
    // console.log(category)
    const div = document.createElement('div');
    div.innerHTML =`
    <button id="btn-${cate.category_id}" onclick="categoryVideo(${cate.category_id})" class="btn bg-[#25252520]">${cate.category}</button>
    `
    categoriesContainer.append(div);
  }
}
loadcategories()

const categoryVideo =(id)=>{
  showLoader()
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  console.log(url)
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    removeActiveClass()
    const clickButton = document.getElementById(`btn-${id}`)
    clickButton.classList.add('active')
    console.log(clickButton)

    displayVideos(data.category)});


}


const loadVideos =(searchText = "")=>{
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then(res=>res.json())
  .then(data=>{
    document.getElementById('btn-all').classList.add('active')
    displayVideos(data.videos)});
}

const displayVideos =(videos)=>{
  // console.log(videos)
  const videosContainer = document.getElementById('videos-container');
  videosContainer.innerHTML="";
  if(videos.length==0){
    videosContainer.innerHTML=`
    <div class="col-span-full flex flex-col items-center text-center justify-center py-20">
        <img src="./assets/Icon.png" alt=""></img>
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
      </div>
    `
    hideLoader()
    return;
  }
  videos.forEach(video => {
    console.log(video)
    const div = document.createElement('div');
    div.innerHTML=`
      <div class=" bg-base-100 space-y-5">
        <figure class="relative">
          <img
            class="w-full h-[150px] object-cover rounded" 
            src="${video.thumbnail}"
            alt="Shoes" />
            <span class="absolute right-1 bottom-2 bg-black text-white text-sm p-1 rounded">3hrs 56 min ago</span>
        </figure>
       <div class="flex gap-3">
        <div class="profile">
          <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-5 h-5 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div>
        </div>
        <div class="intro space-y-1">
          <h2 class="card-title">${video.title}</h2>
          <h2 class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name}
          ${video.authors[0].verified== true ? `<img class="w-5 h-5" src="./assets/verified.png" alt=""></img>` : ``}
          </h2>
          <h2 class="text-sm text-gray-400">${video.others.views} Views</h2>
        </div>

       </div>
      </div>
      <button onclick= loadVideoDetails('${video.video_id}') class="btn btn-wide mt-3">Show Details</button>
    
    `
    videosContainer.append(div)
  });
  hideLoader();
}


const loadVideoDetails=(videoId)=>{
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  fetch(url)
  .then(res=>res.json())
  .then(data=> displayVideoDetails(data.video));
}

const displayVideoDetails = (videos)=>{
  document.getElementById('video_details').showModal()
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `
  <div class="card image-full ">
  <figure>
    <img
      src="${videos.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${videos.title}</h2>
    <p>${videos.description}</p>
  </div>
</div>
  `
}

document.getElementById('search-video').addEventListener('keyup', (e)=>{
  const input = e.target.value;
  loadVideos(input);
})