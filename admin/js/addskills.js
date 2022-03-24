const form = document.querySelector('.skills-form');

const ref = firebase.storage().ref();
let params = new URLSearchParams(location.search);
let id = params.get('id');
if(id){
    db.collection('skills').doc(id).get().then((snapshot) => {
        form.title.value = snapshot.data().Title;
    })
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        update();
    })
    
}else{
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        upload();
    })
}
function upload(){
     const file = document.querySelector('.skill-image').files[0];
     const name = file.name;
     const title = form.title.value;
    
    // if(title == ''){
    //     alert('Title cannot be empty.');
    //     return
    // }
    // const metadata = { contentType:file.type}
    // const task = ref.child(name).put(file, metadata);
    // task
    // .then((snapshort) => {snapshort.ref.getDownloadURL()
    //     .then(url =>{
    //         db.collection('skills').add({
    //             Title:title,
    //             Skill_image:url,

    //         });
            
    //         form.title.value='';
    //         form.pr_image.value='';
    //     })
    // })
    // .then((url) => {
    //     alert("Skills | Image uploaded successfully");
    // });
    const controller = new AbortController()


const timeoutId = setTimeout(() => controller.abort(), 20000)
const cat = localStorage.getItem('token');
const formData = new FormData();

formData.append('skill_image', file);

formData.append('title', title);
fetch(`https://rest-api-ca.herokuapp.com/api/skills/add/`
 ,{
   signal: controller.signal ,
   method: 'post',
   headers: {
       
       'authorization':`Bearer ${cat}`
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
   body:formData
 
})
 .then(
    function(response) {
       if (response.status !== 200) {
   console.log('Looks like there was a problem. Status Code: ' +response.status);
         return;
      }

 // Examine the text in the response
     response.json().then(function(data) {
      console.log(data);

      form.title.value='';
      alert("uploaded")
      location.reload()
      //form.ft_image.value='';
 

  
   });
}
)
.catch(function(err) {
console.log('Fetch Error :', err);
});
}