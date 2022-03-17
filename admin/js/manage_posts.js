const container = document.querySelector('.posts-container');


function renderPosts(doc){
    const title = document.createElement('p');
    const pTools = document.createElement('div');
    const deleteIconLink = document.createElement('a');
    const deleteIcon = document.createElement('img');
    const editIconLink = document.createElement('a');
    const editIcon = document.createElement('img');
    const dicon=document.createAttribute('i')
    const eddicon=document.createAttribute('i')

    title.textContent= doc.Title;
    pTools.setAttribute('class', 'p-tools');
    editIconLink.setAttribute('href', 'post.html?id=' + doc._id);
    editIcon.setAttribute('src', '../images/pencil.png');
    editIcon.setAttribute('alt', 'Edit');
    deleteIconLink.setAttribute('class', "deletebutton");
    deleteIcon.setAttribute('src', '../images/qual.png');
    deleteIcon.setAttribute('alt', 'Delete');

    deleteIconLink.setAttribute('data_id', doc._id)

    editIconLink.appendChild(editIcon);
    // editIconLink.appendChild(dicon)
    deleteIconLink.appendChild(deleteIcon);
    pTools.appendChild(editIconLink);
    pTools.appendChild(deleteIconLink); 
    container.appendChild(title);
    container.appendChild(pTools);

    return deleteIconLink;
    
}
// db.collection('blogs').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         deleteIconLink =  renderPosts(doc);
//         deleteIconLink.addEventListener('click', (e) =>{
//             Did = doc.id;
//             if(confirm('Delete This Article? id=' + Did)){
//                 e.preventDefault();
//                 db.collection('blogs').doc(Did).delete();
//             }
            
//         });
//     });
// })
const controller = new AbortController()
// const cat = localStorage.getItem('token');

    // 5 second timeout:
         const timeoutId = setTimeout(() => controller.abort(), 20000)
fetch(`https://rest-api-ca.herokuapp.com/api/articles/view/`
,{
  signal: controller.signal ,
 
  headers: {
     
      'authorization':`Bearer ${cat}`
     
    },


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
    data.forEach(doc => {
        deleteIconLink =  renderPosts(doc);
        deleteIconLink.addEventListener('click', (e) =>{
                        Did = doc._id;
                        if(confirm('Delete This Article? id=' + Did)){
                            e.preventDefault();
                            const opts={
                                id:Did
                            }
                            fetch(`https://rest-api-ca.herokuapp.com/api/articles/delete/`
                         ,{
                              signal: controller.signal ,
                              method: 'post',
                         headers: {
                            
                            'authorization':`Bearer ${cat}`,
                            'Content-Type': 'application/json',
     
                        },
                        body:JSON.stringify(opts)


                       })
                    .then(
                    function(response) {
                       if (response.status !== 200) {
                         console.log('Looks like there was a problem. Status Code: ' +response.status);
                         return;
                      }
                      response.json().then(function(data) {
                        console.log(data);
                     });
                     })
                    .catch(function(err) {
                        console.log('Fetch Error :', err);
                     });

 
        }});
 }
)});
})
.catch(function(err) {
    console.log('Fetch Error :', err);
  });

  