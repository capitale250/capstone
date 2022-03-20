const container = document.querySelector('.contact-container');
var count = 0;


function renderContacts(doc, count){
    const name = document.createElement('p');
    const email = document.createElement('p');
    const message = document.createElement('p');
    const pDate = document.createElement('p');
    const deleteIcon = document.createElement('img');
    const counter = document.createElement('p');

    var options = { year: 'numeric', month: 'short', day: 'numeric', hour12: false };
    name.textContent= doc.Name;
    email.textContent = doc.Email;
    message.textContent = doc.Message;
    const date= new Date(doc.ContactDate)
    pDate.textContent = date.toLocaleTimeString("en-US", options);;
    counter.textContent = count;
    
    deleteIcon.setAttribute('src', '../images/qual.png');
    deleteIcon.setAttribute('alt', 'Delete');
    deleteIcon.setAttribute('data_id', doc._id)

    container.appendChild(counter);
    container.appendChild(name);
    container.appendChild(email);
    container.appendChild(message);
    container.appendChild(pDate);
    container.appendChild(deleteIcon)

    return deleteIcon;
}
// db.collection('contacts').orderBy('ContactDate').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         count += 1;
//         deleteIcon =  renderContacts(doc, count);
//         deleteIcon.addEventListener('click', (e) =>{
//             Did = doc.id;
//             email = doc.data().email;
//             if(confirm('Delete ' + email + '?')){
//                 e.preventDefault();
//                 db.collection('contacts').doc(Did).delete();
//             }
            
//         });
//     });
// })
fetch(`https://rest-api-ca.herokuapp.com/api/contacts/view`)
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
        deleteIcon =   renderContacts(doc, count);

            deleteIcon.addEventListener('click', (e) =>{
                 const up ={
                    id:doc._id,
                   
                 }
                 if(confirm('username delete '+doc.Email)){
                    e.preventDefault();
                    fetch(`https://rest-api-ca.herokuapp.com/api/contacts/delete`,{
                      
                      
                      headers: {
                            
                        'authorization':`Bearer ${cat}`,
                        'Content-Type': 'application/json',
 
                    },
                      method:'post',
                      body:JSON.stringify(up),

                    })
                    .then((res)=>{
                        console.log(res )
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




