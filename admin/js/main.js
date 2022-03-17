const loginForm = document.querySelector('.login1');



loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = loginForm['email'].value;
    
    const password = loginForm['password'].value;
    console.log(email)
    const opts={
        email:loginForm['email'].value,
        password:loginForm['password'].value,
    }
    console.log(JSON.stringify(opts))
    // auth.signInWithEmailAndPassword(email, password)
    // .then((userCredintial) =>{
    //     if(userCredintial.user){
    //          location.replace('admin/index.html');
    //         // console.log('ho')
    //         // window.alert('Invalid Credentials');
            
    //     }else{
    //         window.alert('Invalid Credentials');
            
    //     }
    // })
    const controller = new AbortController()

// 5 second timeout:
     const timeoutId = setTimeout(() => controller.abort(), 20000)
    fetch('https://rest-api-ca.herokuapp.com/api/auth/login/'
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
           console.log(data.token);
     
           localStorage.setItem('token',data.token );
           location.replace('admin/index.html');

            //console.log(donut + " donuts cost $" + cost + " each");
       
        });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :', err);
  });
        
      
    

 
})