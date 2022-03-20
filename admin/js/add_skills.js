const form = document.querySelector('.skills-form');

const ref = firebase.storage().ref();

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    console.log('hello');
    upload();
        });
function upload(){
    const file = document.querySelector('.skill-image').files[0];
    console.log(file)
    const name = file.name;
    
    const title = form.title.value;
    const category = form.category.value;
    if(title == ''){
        alert('Title cannot be empty.');
        return
    }
//     const metadata = { contentType:file.type}
//     const task = ref.child(name).put(file, metadata);
//     console.log('bbbbb')
//     task
//     .then((snapshot) => {snapshot.ref.getDownloadURL()
//         .then(url =>{
//             db.collection('trial').add({
//                 Title:title,
//                 Skill_image:url,
//                 Category:category,
//             });
            
//             form.title.value='';
//             form.pr_image.value='';
//         })
//     })
//     .then((url) => {
//         alert("Skills | Image uploaded successfully");
//     });
// }
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
      form.ft_image.value='';
 

  
   });
}
)
.catch(function(err) {
console.log('Fetch Error :', err);
});
   
}
