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
    let im=`https://raw.githubusercontent.com/capitale250/rest-api-node/version1/src/public${doc.FeaturedImage}`
    imgc.setAttribute('src', doc.FeaturedImage);

    moreB.setAttribute('href', 'blog.html?id=' + doc._id)
    moreB.setAttribute('data-id', doc._id)
   

    para.textContent = doc.Title;
    discr.textContent = 'More..find';
    // discr.textContent = doc.data().Description;
    const date = new Date(doc.PostDate)
    console.log(date)
    pDate.textContent = date.toLocaleTimeString("en-US", options);

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
// db.collection('blogs').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderBlogCard(doc);
//     });
// })
const controller = new AbortController()

// 5 second timeout:
const timeoutId = setTimeout(() => controller.abort(), 20000)
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
      console.log(data);
      var cost= data.FeaturedImage
      data.forEach(element => {
        renderBlogCard(element )
        var cost= element.FeaturedImage
        console.log( cost + " each");
      });
    //   renderBlogCard(data)
      var i = 0;
      console.log( cost + " each");
      // FeaturedImage
      // data.forEach((donut)=> {
      // var cost= gonut.FeaturedImage

      // console.log(+ cost + " each");
      // i = i + 1;
      //  });
      
    });
  }
)
.catch(function(err) {
  console.log('Fetch Error :', err);
});
