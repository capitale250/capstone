const contin=document.querySelector('.projects')
function renderImgs(doc){


    const container=document.createElement('div')
    const img=document.createElement('img')
    const para=document.createElement('p')

    img.setAttribute('src', doc.data().Skill_image_project);

    para.textContent = doc.data().shortdiscr;

    container.appendChild(img)
    container.appendChild(para)

    contin.appendChild(container)
    


    
}

function myFunctiondisp(id){
    
    console.log(id)
    db.collection('skills').doc(id).collection('imgs').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderImgs(doc);
        });
    })
 
    
}

