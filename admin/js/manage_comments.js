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
    name.textContent= doc.data().name;
    email.textContent = doc.data().email;
    comment.textContent = doc.data().comment;
    post.textContent = postDoc.data().Title
    pDate.textContent = doc.data().commentDate.toDate().toLocaleTimeString("en-US", options);;
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

db.collection('blogs').get().then((snapshot) =>{
    snapshot.docs.forEach(postDoc => {

        var id = postDoc.id
        idd = id;
        db.collection('blogs').doc(id).collection('comments').get().then((snapshot) =>{
            snapshot.docs.forEach(doc => {
                count += 1;
                deleteIcon =  renderPosts(postDoc, doc, count);
               
                deleteIcon.addEventListener('click', (e) =>{
                    Did = doc.id;
                    email = doc.data().email;
                    if(confirm('Delete ' + email + '?')){
                        e.preventDefault();
                        db.collection('blogs').doc(id).collection('comments').doc(Did).delete();
                        }
                })
              });
            })
     });
     db.collection('blogs').onSnapshot((snapshot) =>{
        let changes = snapshot.docChanges()
         if(changes){
             console.log(changes)
            //  location.reload()
         }else{
             return
         }
    })
})
