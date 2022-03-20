const software = document.querySelector('.project-logo');


function renderSoftware(doc) {
    const container = document.createElement('div');

    const image = document.createElement('img');
    const link = document.createElement('a');

    link.setAttribute('href', 'javascript:void(0);');
    link.setAttribute('onclick', 'myFunctiondisp(this.id)');
    link.setAttribute('id',doc.id)
    link.setAttribute('style','border-bottom: 7px solid #53e2e7,height:10px')
    // link.textContent='bbb'
    image.setAttribute('src', doc.SkillImage);
    

    

    link.appendChild(image);
    container.appendChild(link);
    software.appendChild(container)

}
// db.collection('skills').get().then((snapshot) =>{
//     snapshot.docs.forEach(doc => {

//     renderSoftware(doc);
// });
// })
fetch(`https://rest-api-ca.herokuapp.com/api/skills/view/`)
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }


    response.json().then(function(data) {

         data.forEach(doc=>{
        
        deleteIcon = renderSoftware(doc);

           
                  })
                })

      
    })
.catch(function(err) {
        console.log('Fetch Error :', err);
      });




