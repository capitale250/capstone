const blogCard = document.querySelector('.blog');

function renderBlogCard(doc){
    let blogCardItem = document.createElement('div');


    let divcontainer = document.createElement('div')
    let imgc=document.createElement('img')
    let titledate=document.createElement('div')
    let link=document.createElement('a')
    let pDate=document.createElement('h5');
    let para=document.createElement('h1')
    let discr=document.createElement('p')
    let moreB = document.createElement('a');

    var options = { year: 'numeric', month: 'short', day: 'numeric', hour12: false };

    blogCardItem.setAttribute('class', 'b-card-item');
   
    divcontainer.setAttribute('class','b');
    titledate.setAttribute('class','vl')
    imgc.setAttribute('src', doc.data().Featured_image);

    moreB.setAttribute('href', 'blog.html?id=' + doc.id)
    moreB.setAttribute('data-id', doc.id)
   

    para.textContent = doc.data().Title;
    discr.textContent = 'More..find';
    // discr.textContent = doc.data().Description;
    pDate.textContent = doc.data().time.toDate().toLocaleTimeString("en-US", options);

    link.appendChild(para)
    moreB.appendChild(discr)
    titledate.appendChild(link)
    titledate.appendChild(pDate)
    titledate.appendChild(moreB)
    divcontainer.appendChild(imgc)
    divcontainer.appendChild(titledate)
    // divcontainer.appendChild(discr)


 

     blogCard.appendChild(divcontainer);
}


// getting data
db.collection('blogs').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderBlogCard(doc);
    });
})
