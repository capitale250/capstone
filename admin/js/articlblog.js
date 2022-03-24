const commentForm = document.querySelector('.comment-input-form');
const blogBody1 = document.querySelector('.blog');
const comBody = document.querySelector('.comm');

const blogCard = document.querySelector('.othersb');
let params = new URLSearchParams(location.search);
let id = params.get('id');
console.log(id)

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // db.collection('blogs').doc(id).collection('comments').add({
    //             name:commentForm.name.value,
    //             email:commentForm.email.value,
    //             commentDate: new Date(),
    //             comment:commentForm.comment.value
    // });
    const opts={
        username:commentForm.name.value,
        email:commentForm.email.value,
        comment:commentForm.comment.value
    }
    const controller = new AbortController()

    // 5 second timeout:
         const timeoutId = setTimeout(() => controller.abort(), 20000)
    fetch(`https://rest-api-ca.herokuapp.com/api/comments/add/?id=${id}`
          ,{
            signal: controller.signal ,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body:JSON.stringify(opts)
          
        })
          .then(
             function(response) {
                if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +response.status);
                  return;
               }
    
          // Examine the text in the response
              response.json().then(function(data) {
               console.log(data);
         
               
    
           
            });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :', err);
      });
            
          
    commentForm.name.value = ' ';
    commentForm.email.value = '';
    commentForm.comment.value = '';
      alert("added")
      location.reload()
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

      let im=`https://raw.githubusercontent.com/capitale250/rest-api-node/version1/src/public${doc.FeaturedImage}`
    imgpi.setAttribute('src', doc.FeaturedImage);
    console.log(im)

    titleb.setAttribute('class','times')
    pii.setAttribute('class','fa fa-twitter')

    title.textContent = doc.Title;
    dateh.textContent = 'Posted: 19.08.2020 16:42';
    // photCortesy.textContent = 'Photo Cortesy:';
    pdiscr.textContent = doc.Description;

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
    // creating elements section
    let divcard = document.createElement('div');
    let divimg = document.createElement('div');
    let divimga = document.createElement('a');
    let divimgai = document.createElement('i');
    let divincomm = document.createElement('div');
    let divincommh3=document.createElement('h3')
    let divincommh5 = document.createElement('h5');
    let divincommp = document.createElement('p');
    // let commentP = document.createElement('p');
    // setting atributes section
    divcard.setAttribute('class', 'card');
    divimg.setAttribute('class', 'img');
    divimgai.setAttribute('class', 'fa fa-solid fa-user')
    divincomm.setAttribute('class', 'incomment');
    // cDate.setAttribute('class', 'user-comment-date');
    // text content section

    // var options = { year: 'numeric', month: 'short', day: 'numeric', hour12: false };
    var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour12: false }

    divincommh3.textContent = doc.Username;
    // var date = doc.CommentDate.toLocaleTimeString("en-US", options);
    divincommh5.textContent =  moment(doc.CommentDate).fromNow()
        
      
    divincommp.textContent = doc.Comment;

    // appending section
    divimga.appendChild(divimgai);
    divimg.appendChild(divimga);
    divincomm.appendChild(divincommh3);
    divincomm.appendChild(divincommh5);
    divincomm.appendChild(divincommp);
    divcard.appendChild(divimg)
    divcard.appendChild(divincomm)
    comBody.appendChild(divcard)
}

// db.collection('blogs').doc(id).get().then((snapshot) => {
//     renderBlogCard(snapshot);
// })
// db.collection('blogs').doc(id).collection('comments').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderComments(doc);
//     });
// })
// fetch('https://rest-api-ca.herokuapp.com/api/skills/view/',{ mode: 'no-cors'})
//   .then((response) => console.log(response))
//   .then(data => console.log(data));
const controller = new AbortController()

// 5 second timeout:
const timeoutId = setTimeout(() => controller.abort(), 20000)
fetch(`https://rest-api-ca.herokuapp.com/api/articles/view/?id=${id}`,{signal: controller.signal })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        var i = 0;
        
        data.Comments.forEach((donutSummary)=> {
         renderComments(donutSummary);  
        var donut = donutSummary.Username;
        var cost = donutSummary.Email;

        console.log(donut + " donuts cost $" + cost + " each");
        i = i + 1;
         });
        
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :', err);
  });
  fetch(`https://rest-api-ca.herokuapp.com/api/articles/view/?id=${id}`,{signal: controller.signal })
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
        renderBlogCard(data)
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
    let im=`https://raw.githubusercontent.com/capitale250/rest-api-node/version1/src/public${doc.FeaturedImage}`
    imgc.setAttribute('src', doc.FeaturedImage);

    moreB.setAttribute('href', 'blog.html?id=' + doc._id)
    moreB.setAttribute('data-id', doc._id)
   

    para.textContent = doc.Title;
    
    // discr.textContent = doc.data().Description;
    pDate.textContent = '10 march 2022';
    discr.textContent='More..find'

    moreB.appendChild(discr)
    titledate.appendChild(para)
    titledate.appendChild(pDate)
    
    divcontainer.appendChild(titledate)
    divcontainer.appendChild(moreB)
    divcontainer.appendChild(imgc)

 

     blogCard.appendChild(divcontainer);
}


// getting data
// db.collection('blogs').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderBmorelogCard(doc);
//     });
// })
// db.collection('blogs').doc(id).collection('comments').onSnapshot((snapshot) =>{
//     let changes = snapshot.docChanges()
//     changes.forEach(change =>{
//         renderComments(change.doc)
//     })
// })
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
        renderBmorelogCard(element )
        var cost= element.FeaturedImage
        console.log( cost + " each");
      });
    //   renderBlogCard(data)
      var i = 0;
      console.log( cost + " each");
   
    });
  }
)
.catch(function(err) {
  console.log('Fetch Error :', err);
});
