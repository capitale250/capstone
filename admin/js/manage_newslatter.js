const container = document.querySelector('.newslatter-container');
var count = 0;


function renderPosts(doc, count){
    const title = document.createElement('p');
    const pDate = document.createElement('p');
    const deleteIcon = document.createElement('img');
    const counter = document.createElement('p');

    var options = { year: 'numeric', month: 'short', day: 'numeric', hour12: false };
    title.textContent= doc.Email;
    const date=new Date(doc.RequestDate)
    pDate.textContent = date.toLocaleTimeString("en-US", options);;
    counter.textContent = count;
    
    deleteIcon.setAttribute('src', '../images/qual.png');
    deleteIcon.setAttribute('alt', 'Delete');
    deleteIcon.setAttribute('data_id', doc._id)

    container.appendChild(counter);
    container.appendChild(title);
    container.appendChild(pDate);
    container.appendChild(deleteIcon)

    return deleteIcon;
}
// db.collection('newslatter').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         count += 1;
//         deleteIcon =  renderPosts(doc, count);
//         deleteIcon.addEventListener('click', (e) =>{
//             Did = doc.id;
//             email = doc.data().Email;
//             if(confirm('Delete ' + email + '?')){
//                 e.preventDefault();
//                 db.collection('newslatter').doc(Did).delete();
//             }
            
//         });
//     });
// })
fetch(`https://rest-api-ca.herokuapp.com/api/newsletter/view`)
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    // Examine the text in the responseid=622dc3e93a2e566099f24aa6
    response.json().then(function(data) {
    //   console.log(data);
    //   var cost= data.FeaturedImage
    //   data.forEach(element => {
    //     renderBlogCard(element )
         data.forEach(doc=>{
            count += 1;
        deleteIcon =  renderPosts(doc,count)
        // doc.Comments.forEach(commb=>{
        //     count += 1;
            // deleteIcon=renderPosts(doc, commb, count)
            deleteIcon.addEventListener('click', (e) =>{
                 const up ={
                    id:doc._id,
                   
                 }
                 if(confirm('username delete'+doc.Email)){
                    e.preventDefault();
                    fetch(`https://rest-api-ca.herokuapp.com/api/newsletter/delete`,{
                      
                      
                      headers: {
                            
                        'authorization':`Bearer ${cat}`,
                        'Content-Type': 'application/json',
 
                    },
                      method:'post',
                      body:JSON.stringify(up),

                    })
                    .then((res)=>{
                        console.log(res )
                        location.reload()
                        alert('deleted successfully')
                      

                    })
                    .catch((err)=>{
                        console.log('Fetch Error :', err);
                    })
                  }
              })
        //     console.log(commb)
        //   })
        
      })
     
      });
   
      
    })
.catch(function(err) {
        console.log('Fetch Error :', err);
      });



