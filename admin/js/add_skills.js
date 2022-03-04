const form = document.querySelector('.skills-form');

const ref = firebase.storage().ref();

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    console.log('hello');
    upload();
        });
function upload(){
    const file = document.querySelector('.skill-image').files[0];
    console.log(file)
    const name = file.name;
    
    const title = form.title.value;
    const category = form.category.value;
    if(title == ''){
        alert('Title cannot be empty.');
        return
    }
    const metadata = { contentType:file.type}
    const task = ref.child(name).put(file, metadata);
    console.log('bbbbb')
    task
    .then((snapshot) => {snapshot.ref.getDownloadURL()
        .then(url =>{
            db.collection('trial').add({
                Title:title,
                Skill_image:url,
                Category:category,
            });
            
            form.title.value='';
            form.pr_image.value='';
        })
    })
    .then((url) => {
        alert("Skills | Image uploaded successfully");
    });
}


