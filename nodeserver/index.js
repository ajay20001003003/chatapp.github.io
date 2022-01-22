//const io =require('socket.io')(4000)
//io.set('origins', '*:*');
const io = require('socket.io')(3000, {
    cors: {
      origin: "https://ajay20001003003.github.io",
      credentials: true
    }
  });

const users={};
io.on('connection',socket=>{
    socket.on('new-users-joined',name1=>{
      
        users[socket.id]=name1;
        socket.broadcast.emit('users-joined',name1)
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{name1:users[socket.id],message:message});
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]
    });
    
})