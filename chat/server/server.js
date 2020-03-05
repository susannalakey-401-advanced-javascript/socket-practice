const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)

let users = [];

io.on('connection', socket => {
  console.log('a user connected')
  socket.broadcast.emit('broadcast', 'user connected');
  let object = {
    id: socket.id,
    user: '<anonymous> ',
  };

  users.push(object);
  let usersString = '';

  console.log('uesrs at top', users)
  for (let i = 0; i < users.length; i++) {
    usersString = usersString + `${users[i].user}, `
  }
  io.to(`${socket.id}`).emit('show-users', `Users currently online: ${usersString}`);
  // console.log('users', users);
  socket.on('chat-message', data => {
    console.log('a user sent a chat message:', data)
    io.emit('chat-message', data)
  })

  socket.on('disconnect', function () {
    socket.broadcast.emit('broadcast', 'user disconnected')
    let removeDisconnectedUser = users.filter(function (el) { return el.id !== socket.id })
    users = removeDisconnectedUser;
    console.log('users after removal', users)

  })

  socket.on('typing', function () {
    io.emit('typing', socket.id)
  })


})

server.listen(3000, () => console.log('socket.io server up on 3000'))
