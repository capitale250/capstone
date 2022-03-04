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

    db.collection('contacts').add({
        name:name,
        email:email,
        message:message,
        ContactDate: new Date()
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

    db.collection('newslatter').add({
        Email:email,
        RequestDate: new Date()
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