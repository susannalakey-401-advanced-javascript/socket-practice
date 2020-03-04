$(function () {
  const socket = io('http://localhost:3000')
  $('#input').submit(function (e) {
    e.preventDefault()
    socket.emit('chat-message', $('#message').val())
    $('#message').val('')
    return
  })
  socket.on('chat-message', function (data) {
    console.log('received chat message:', data)
    $('#messages').append($('<li>').text(data))
  })

  socket.on('broadcast', function (data) {
    console.log('received chat message:', data)
    $('#messages').append($('<li>').text(data))
  })

  // socket.on('disconnect', function (data) {
  //   console.log('received chat message:', data)
  //   $('#messages').append($('<li>').text(data))
  // })

})
