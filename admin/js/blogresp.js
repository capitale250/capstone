const blogCard = document.querySelector('.othersb');

function renderBmorelogCard(doc){
    // let blogCardItem = document.createElement('div');


    let divcontainer = document.createElement('div')
    let imgc=document.createElement('img')
    let titledate=document.createElement('div')
    // let link=document.createElement('a')
    let pDate=document.createElement('h5');
    let para=document.createElement('h3')
    let discr=document.createElement('p')
    let moreB = document.createElement('a');

    // blogCardItem.setAttribute('class', 'b-card-item');
   
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
        renderBlogCard(doc);
    });
})
