const commentForm = document.querySelector('.comment-input-form');
const blogBody1 = document.querySelector('.blog');
const comBody = document.querySelector('.comm');

const blogCard = document.querySelector('.othersb');
let params = new URLSearchParams(location.search);
let id = params.get('id');
console.log(id)

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('blogs').doc(id).collection('comments').add({
                name:commentForm.name.value,
                email:commentForm.email.value,
                commentDate: new Date(),
                comment:commentForm.comment.value
    });
    commentForm.name.value = ' ';
    commentForm.email.value = '';
    commentForm.comment.value = '';
})

function renderBlogCard(doc){
    let title = document.createElement('h3');
    let titleb = document.createElement('div');
    let titleb1 = document.createElement('div');
    let titleb2 = document.createElement('div');
    let dateh = document.createElement('h5');
    let pi =document.createElement('p');
    let pii =document.createElement('i')
    let imgpi =document.createElement('img')
    let pdiscr =document.createElement('p')


    imgpi.setAttribute('src', doc.data().Featured_image);

    titleb.setAttribute('class','times')
    pii.setAttribute('class','fa fa-twitter')

    title.textContent = doc.data().Title;
    dateh.textContent = 'Posted: 19.08.2020 16:42';
    // photCortesy.textContent = 'Photo Cortesy:';
    pdiscr.textContent = doc.data().Description;

    pi.appendChild(pii)
    titleb1.appendChild(dateh)
    titleb2.appendChild(pi)
    titleb.appendChild(titleb1)
    titleb.appendChild(titleb2)
    blogBody1.appendChild(titleb)
    blogBody1.appendChild(title)
    blogBody1.appendChild(imgpi)
    blogBody1.appendChild(pdiscr)

    


    
}
function renderComments(doc){
 
    let divcard = document.createElement('div');
    let divimg = document.createElement('div');
    let divimga = document.createElement('a');
    let divimgai = document.createElement('i');
    let divincomm = document.createElement('div');
    let divincommh3=document.createElement('h3')
    let divincommh5 = document.createElement('h5');
    let divincommp = document.createElement('p');

    divcard.setAttribute('class', 'card');
    divimg.setAttribute('class', 'img');
    divimgai.setAttribute('class', 'fa fa-solid fa-user')
    divincomm.setAttribute('class', 'incomment');
   
    var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour12: false }

    divincommh3.textContent = doc.data().name;
    var date = doc.data().commentDate.toDate().toLocaleTimeString("en-US", options);
    divincommh5.textContent =  moment(date).fromNow()
        
      
    divincommp.textContent = doc.data().comment;

  
    divimga.appendChild(divimgai);
    divimg.appendChild(divimga);
    divincomm.appendChild(divincommh3);
    divincomm.appendChild(divincommh5);
    divincomm.appendChild(divincommp);
    divcard.appendChild(divimg)
    divcard.appendChild(divincomm)
    comBody.appendChild(divcard)
}

db.collection('blogs').doc(id).get().then((snapshot) => {
    renderBlogCard(snapshot);
})
db.collection('blogs').doc(id).collection('comments').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderComments(doc);
    });
})

function renderBmorelogCard(doc){



    let divcontainer = document.createElement('div')
    let imgc=document.createElement('img')
    let titledate=document.createElement('div')

    let pDate=document.createElement('h5');
    let para=document.createElement('h3')
    let discr=document.createElement('p')
    let moreB = document.createElement('a');


    divcontainer.setAttribute('class','b');
    titledate.setAttribute('class','vl')
    imgc.setAttribute('src', doc.data().Featured_image);

    moreB.setAttribute('href', 'blog.html?id=' + doc.id)
    moreB.setAttribute('data-id', doc.id)
   

    para.textContent = doc.data().Title;
    
    discr.textContent = doc.data().Description;
    pDate.textContent = '10 march 2022';
    discr.textContent='More..find'

    moreB.appendChild(discr)
    titledate.appendChild(para)
    titledate.appendChild(pDate)
    
    divcontainer.appendChild(titledate)
    divcontainer.appendChild(moreB)


 

     blogCard.appendChild(divcontainer);
}


// getting data
db.collection('blogs').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderBmorelogCard(doc);
    });
})
db.collection('blogs').doc(id).collection('comments').onSnapshot((snapshot) =>{
    let changes = snapshot.docChanges()
    changes.forEach(change =>{
        renderComments(change.doc)
    })
})
