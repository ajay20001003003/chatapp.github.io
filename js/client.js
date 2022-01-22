
const socket=io("http://localhost:3000")
const form=document.getElementById('send-container')
const messageinput=document.getElementById('messageinp')
const messagecontainer=document.querySelector('.container')
var audio=new Audio('audiomessage.mp3');

const append=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if(position=='left'){
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageinput.value=" "

})

 const name1=prompt("enter your name to join")
 socket.emit('new-users-joined',name1)
 socket.on('users-joined',name1=>{
     append(`${name1},joined the chat`,'left')

 })
 socket.on('recieve',(data)=>{
     append(`${data.name1}:${data.message}`,'left')

 })
 socket.on('left',name1=>{
     append(`${name1}:left the chat`)

 })