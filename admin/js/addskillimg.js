const imgform = document.querySelector('.skills-imgform');



let params = new URLSearchParams(location.search);
let id = params.get('id');
const ref = firebase.storage().ref();
console.log(id)



imgform.addEventListener('submit', (e) => {
    e.preventDefault();
    const disc=imgform.discript.value;
    console.log(disc)
    const file = document.querySelector('.skill-imageadd').files[0];
    const name = file.name;
    console.log(name)
    const metadata = { contentType:file.type}
    const task = ref.child(name).put(file, metadata);
    task
    .then((snapshort) => {snapshort.ref.getDownloadURL()
        .then(url =>{
            db.collection('skills').doc(id).collection('imgs').add({
    
                Skill_image_project:url,
                shortdiscr:disc,

            });
            imgform.discript.value=''
            imgform.pr_image.value=''

        })
    })
    .then((url) => {
        alert("Skills | Image uploaded successfully");
    });
});
