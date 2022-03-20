const imgform = document.querySelector('.skills-imgform');



let params = new URLSearchParams(location.search);
let id = params.get('id');
const ref = firebase.storage().ref();
console.log(id)



imgform.addEventListener('submit', (e) => {
    e.preventDefault();
    const disc=imgform.discript.value;
    const title=imgform.title.value;
    console.log(disc)
    const file = document.querySelector('.skill-imageadd').files[0];
    const name = file.name;
    console.log(name)
    // 
    const controller = new AbortController()


const timeoutId = setTimeout(() => controller.abort(), 800000)
const cat = localStorage.getItem('token');
const formData = new FormData();

formData.append('project_image', file);
formData.append('description', disc);
formData.append('title', title);
fetch(`https://rest-api-ca.herokuapp.com/api/projects/add/`
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
      imgform.discript.value='';
      imgform.title.value=''
 

  
   });
}
)
.catch(function(err) {
console.log('Fetch Error :', err);
});
   
})


