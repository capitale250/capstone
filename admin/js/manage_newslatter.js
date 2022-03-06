const container = document.querySelector('.newslatter-container');
var count = 0;


function renderPosts(doc, count){
    const title = document.createElement('p');
    const pDate = document.createElement('p');
    const deleteIcon = document.createElement('img');
    const counter = document.createElement('p');

    var options = { year: 'numeric', month: 'short', day: 'numeric', hour12: false };
    title.textContent= doc.data().Email;
    pDate.textContent = doc.data().RequestDate.toDate().toLocaleTimeString("en-US", options);;
    counter.textContent = count;
    
    deleteIcon.setAttribute('src', '../images/qual.png');
    deleteIcon.setAttribute('alt', 'Delete');
    deleteIcon.setAttribute('data_id', doc.id)

    container.appendChild(counter);
    container.appendChild(title);
    container.appendChild(pDate);
    container.appendChild(deleteIcon)

    return deleteIcon;
}
db.collection('newslatter').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        count += 1;
        deleteIcon =  renderPosts(doc, count);
        deleteIcon.addEventListener('click', (e) =>{
            Did = doc.id;
            email = doc.data().Email;
            if(confirm('Delete ' + email + '?')){
                e.preventDefault();
                db.collection('newslatter').doc(Did).delete();
            }
            
        });
    });
})
