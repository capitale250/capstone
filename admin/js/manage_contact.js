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
    name.textContent= doc.data().name;
    email.textContent = doc.data().email;
    message.textContent = doc.data().message;
    pDate.textContent = doc.data().ContactDate.toDate().toLocaleTimeString("en-US", options);;
    counter.textContent = count;
    
    deleteIcon.setAttribute('src', '../images/qual.png');
    deleteIcon.setAttribute('alt', 'Delete');
    deleteIcon.setAttribute('data_id', doc.id)

    container.appendChild(counter);
    container.appendChild(name);
    container.appendChild(email);
    container.appendChild(message);
    container.appendChild(pDate);
    container.appendChild(deleteIcon)

    return deleteIcon;
}
db.collection('contacts').orderBy('ContactDate').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        count += 1;
        deleteIcon =  renderContacts(doc, count);
        deleteIcon.addEventListener('click', (e) =>{
            Did = doc.id;
            email = doc.data().email;
            if(confirm('Delete ' + email + '?')){
                e.preventDefault();
                db.collection('contacts').doc(Did).delete();
            }
            
        });
    });
})
