const contin=document.querySelector('.projects')
function renderImgs(doc){


    const container=document.createElement('div')
    const img=document.createElement('img')
    const para=document.createElement('p')

    img.setAttribute('src', doc.ProjectImage);

    para.textContent = doc.Description;

    container.appendChild(img)
    container.appendChild(para)

    contin.appendChild(container)
    


    
}

// function myFunctiondisp(id){
    
//     console.log(id)
//     db.collection('skills').doc(id).collection('imgs').get().then((snapshot) => {
//         snapshot.docs.forEach(doc => {
//             renderImgs(doc);
//         });
//     })
 
    
// }
fetch(`https://rest-api-ca.herokuapp.com/api/projects/view/`)
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }


    response.json().then(function(data) {

         data.forEach(doc=>{
        
          renderImgs(doc);

           
                  })
                })

      
    })
.catch(function(err) {
        console.log('Fetch Error :', err);
      });
