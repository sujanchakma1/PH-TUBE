// [
//   {
//       "category_id": "1001",
//       "category": "Music"
//   },
//   {
//       "category_id": "1003",
//       "category": "Comedy"
//   },
//   {
//       "category_id": "1005",
//       "category": "Drawing"
//   }
// ]
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
    <button id="btn-${cate.category_id}" onclick="categoryVideo(${cate.category_id})" class="btn bg-[#25252520] hover:bg-[#FF1F3D]  hover:text-white">${cate.category}</button>
    `
    categoriesContainer.append(div);
  }
}
loadcategories()

// videos
// {
//   "category_id": "1001",
//   "video_id": "aaaa",
//   "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//   "title": "Shape of You",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//       }
//   ],
//   "others": {
//       "views": "100K",
//       "posted_date": "16278"
//   },
//   "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }
const categoryVideo =(id)=>{
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


const loadVideos =()=>{
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
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
          <h2 class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name}<img class="w-5 h-5" src="./assets/verified.png" alt=""></h2>
          <h2 class="text-sm text-gray-400">${video.others.views} Views</h2>
        </div>

       </div>
      </div>
    
    `
    videosContainer.append(div)
  });

}
