const contactForm = document.querySelector('.contacts');
const newslatter = document.querySelector('.newslatter-form');
const sendButton = document.querySelector('.c-button')
const signUpButton = document.querySelector('.signup')

// Contact form section
contactForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const name = contactForm['name'].value;
    const email = contactForm['email'].value;
    const message = contactForm['message'].value;

    // db.collection('contacts').add({
    //     name:name,
    //     email:email,
    //     message:message,
    //     ContactDate: new Date()
    // });
    const controller = new AbortController()

    // 5 second timeout:
    const opts={
        name:name,
        email:email,
        message:message
    }
    const cat=localStorage.getItem('token')
    const timeoutId = setTimeout(() => controller.abort(), 80000)
    fetch(`https://rest-api-ca.herokuapp.com/api/contacts/add/`
          ,{
            signal: controller.signal ,
            method: 'post',
            headers: {
                'authorization':`Bearer ${cat}`,
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
    contactForm.name.value = '';
    contactForm.email.value = '';
    contactForm.message.value = '';
    sendButton.value = 'Sent Successfully'
    sendButton.textContent = 'Sent Successfully'
    setTimeout(function(){sendButton.textContent  = 'Send'}, 4000)
    
    
})

// Newslatter section
newslatter.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = newslatter['newslatter'].value;

    // db.collection('newslatter').add({
    //     Email:email,
    //     RequestDate: new Date()
    // });
    const controller = new AbortController()

    // 5 second timeout:
    const opts={
      
        email:email,
       
    }
    const cat=localStorage.getItem('token')
    console.log('helo')
    const timeoutId = setTimeout(() => controller.abort(), 80000)
    fetch(`https://rest-api-ca.herokuapp.com/api/newsletter/add/`
          ,{
            signal: controller.signal ,
            method: 'post',
            headers: {
                'authorization':`Bearer ${cat}`,
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
    newslatter.newslatter.value = '';
    signUpButton.textContent = 'Signed up'
    setTimeout(function(){signUpButton.textContent = 'sign up'}, 4000)
})
function ValidateEmail(email)
{
   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if(email .match(mailformat))
      {
     alert("Valid email address!");
     

      }else{


  alert("You have entered an invalid email address!");

   }
}