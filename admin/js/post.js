const form = document.querySelector('.post-form');

const ref = firebase.storage().ref();
//console.log('Referance:' + ref);
let params = new URLSearchParams(location.search);
let id = params.get('id');
console.log(id)
if(id){
    // db.collection('blogs').doc(id).get().then((snapshot) => {
    //     form.title.value = snapshot.data().Title;
    //     //ftImage = snapshot.data().Featured_image;
    //     form.description.textContent = snapshot.data().Description;
    // })
    const controller = new AbortController()

// 5 second timeout:
    const timeoutId = setTimeout(() => controller.abort(), 20000)
    fetch(`https://rest-api-ca.herokuapp.com/api/articles/view/?id=${id}`,{signal: controller.signal })
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the responseid=622dc3e93a2e566099f24aa6
        response.json().then(function(data) {
          console.log(data);
          var cost= data.FeaturedImage
         
          form.title.value = data.Title;
          ftImage = data.FeaturedImage;
          form.description.textContent = data.Description;
          // FeaturedImage
          // data.forEach((donut)=> {
          // var cost= gonut.FeaturedImage
  
          // console.log(+ cost + " each");
          // i = i + 1;
          //  });
          
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :', err);
    });
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        update();
    })
    
}else{
    console.log('Nulllllll')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        upload();
    })
}
 // saving data
function upload(){
    const file = document.querySelector('.ft_image').files[0];
    console.log(file)
    const name = file.name;
    const title = form.title.value
    const description = form.description.value
    if(title == '' || description == ''){
        alert('Title and Description cannot be empty.');
        return
    }
    // const metadata = { contentType:file.type}
    // const task = ref.child(name).put(file, metadata);
    // task
    // .then((snapshort) => {snapshort.ref.getDownloadURL()
    //     .then(url =>{
    //         //console.log('Url: ' + url);
    //         db.collection('blogs').add({
    //             Title:title,
    //             Featured_image:url,
    //             Description:description,
    //             time: new Date()
    //         });
            
    //         form.title.value='';
    //         form.ft_image.value='';
    //         form.description.value = '';
    //     })
    // })
    // .then((url) => {
    //     alert("Image uploaded successfully");
    // });
    const opts={
        title:title,
        description:description,
        article_image:name
    }
    const controller = new AbortController()


         const timeoutId = setTimeout(() => controller.abort(), 20000)
         const cat = localStorage.getItem('token');
         const formData = new FormData();

         formData.append('article_image', file);
         formData.append('description', description);
         formData.append('title', title);
        fetch(`https://rest-api-ca.herokuapp.com/api/articles/add/`
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
               form.description.value = '';

           
            });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :', err);
      });
            
          
   
}

// Update function
 function update(){
    const file = document.querySelector('.ft_image').files[0];
    try{
        const name = file.name;
        const title = form.title.value
        const description = form.description.value
        if(title == '' || description == ''){
            alert('Title and Description cannot be empty.');
            return
        }
       
        const controller = new AbortController()


        const timeoutId = setTimeout(() => controller.abort(), 20000)
        const cat = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('article_image', file);
        formData.append('description', description);
        formData.append('title', title);
        formData.append('id', id);
       fetch(`https://rest-api-ca.herokuapp.com/api/articles/update/`
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
              form.description.value = '';

          
           });
       }
     )
     .catch(function(err) {
       console.log('Fetch Error :', err);
     });
    }catch(err){
        const title = form.title.value
        const description = form.description.value
        console.log('++++++++')
        // db.collection('blogs').doc(id).update({
        //     Title:title,
        //     Description:description
        // }).then(res =>{
        //     alert('Updated successfully');
        // })
        const timeoutId = setTimeout(() => controller.abort(), 20000)
        const cat = localStorage.getItem('token');
        const formData = new FormData();

        
        formData.append('description', description);
        formData.append('title', title);
        formData.append('id', id);
       fetch(`https://rest-api-ca.herokuapp.com/api/articles/update/`
         ,{
           //signal: controller.signal ,
           method: 'post',
           headers: {
               
               'authorization':`Bearer ${cat}`,
              //'Content-Type': 'application/json',
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
              form.description.value = '';

          
           });
       }
     )
     .catch(function(err) {
       console.log('Fetch Error :', err);
     });
    }
    
 }

