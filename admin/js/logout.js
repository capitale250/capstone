const logout = document.querySelector('.logout');

// check user status
// auth.onAuthStateChanged(user =>{
//     if(!user){
//         location.replace('../login.html');
//     }else{
//         console.log("you are logged in");
//     }
// })
const cat = localStorage.getItem('token');
// console.log(cat+'>>>>>')
if(!cat){
    location.replace('../login.html');
}else{
            console.log("you are logged in");
    }
logout.addEventListener('click', (e) =>{
    e.preventDefault(),
    console.log("you are logged out");
    // auth.signOut().then( () =>{
        localStorage.clear();
    location.replace('../login.html');
    // })
})