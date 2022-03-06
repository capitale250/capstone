const loginForm = document.querySelector('.login1');



loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = loginForm['email'].value;
    
    const password = loginForm['password'].value;
    
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredintial) =>{
        if(userCredintial.user){
             location.replace('admin/index.html');
            // console.log('ho')
            // window.alert('Invalid Credentials');
            
        }else{
            window.alert('Invalid Credentials');
            
        }
    })
})