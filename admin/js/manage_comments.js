const container = document.querySelector('.comments-container');
var count = 0;
let idd=0;


function renderPosts(postDoc, doc, count){
    const name = document.createElement('p');
    const email = document.createElement('p');
    const comment = document.createElement('p');
    const post = document.createElement('p');
    const pDate = document.createElement('p');
    const deleteIcon = document.createElement('img');
    const counter = document.createElement('p');

    var options = { year: 'numeric', month: 'short', day: 'numeric', hour12: false };
    name.textContent= doc.Username;
    email.textContent = doc.Email;
    comment.textContent = doc.Comment;
    post.textContent = postDoc.Title
    const dae= new Date(doc.CommentDate)
    pDate.textContent = dae.toLocaleTimeString("en-US", options);;
    counter.textContent = count;
    
    deleteIcon.setAttribute('src', '../images/qual.png');
    deleteIcon.setAttribute('alt', 'Delete');
    deleteIcon.setAttribute('data_id', doc.id)

    container.appendChild(counter);
    container.appendChild(name);
    container.appendChild(email);
    container.appendChild(comment);
    container.appendChild(post);
    container.appendChild(pDate);
    container.appendChild(deleteIcon)

    return deleteIcon;
}

// db.collection('blogs').get().then((snapshot) =>{
//     snapshot.docs.forEach(postDoc => {

//         var id = postDoc.id
//         idd = id;
//         db.collection('blogs').doc(id).collection('comments').get().then((snapshot) =>{
//             snapshot.docs.forEach(doc => {
//                 count += 1;
//                 deleteIcon =  renderPosts(postDoc, doc, count);
               
//                 deleteIcon.addEventListener('click', (e) =>{
//                     Did = doc.id;
//                     email = doc.data().email;
//                     if(confirm('Delete ' + email + '?')){
//                         e.preventDefault();
//                         db.collection('blogs').doc(id).collection('comments').doc(Did).delete();
//                         }
//                 })
//               });
//             })
//      });
//      db.collection('blogs').onSnapshot((snapshot) =>{
//         let changes = snapshot.docChanges()
//          if(changes){
//              console.log(changes)
//             //  location.reload()
//          }else{
//              return
//          }
//     })
// })
const controller = new AbortController()

// 5 second timeout:
//const cat =localStorage.getItem('token')
const timeoutId = setTimeout(() => controller.abort(), 800000)
fetch(`https://rest-api-ca.herokuapp.com/api/articles/view/`,{signal: controller.signal })
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
        // console.log(doc.Comments)
        doc.Comments.forEach(commb=>{
            count += 1;
            deleteIcon=renderPosts(doc, commb, count)
            deleteIcon.addEventListener('click', (e) =>{
                 const up ={
                    commentDate:commb.CommentDate,
                    email:commb.Email
                 }
                 if(confirm('sername delete'+commb.Username)){
                    e.preventDefault();
                    fetch(`https://rest-api-ca.herokuapp.com/api/comments/delete/?id=${doc._id}`,{
                      signal: controller.signal ,
                      
                      headers: {
                            
                        'authorization':`Bearer ${cat}`,
                        'Content-Type': 'application/json',
 
                    },
                      method:'post',
                      body:JSON.stringify(up),

                    })
                    .then((res)=>{
                        console.log(res )
                        console.log(doc._id)
                        console.log(JSON.stringify(up))
                        console.log(cat)
                        alert("deleted successfully")
                        location.reload()

                    })
                    .catch((err)=>{
                        console.log('Fetch Error :', err);
                    })
                 }
             })
            console.log(commb)
          })
        
      })
     
      });
   
      
    })
.catch(function(err) {
        console.log('Fetch Error :', err);
      });

