
$(function () {
  const socket = io('http://172.16.14.214:3000')
  $('#input').submit(function (e) {
    e.preventDefault()
    const message = '<username> ' + $('#message').val()
    socket.emit('chat-message', message)
    $('#message').val('')
    return
  })
  //on key press user is typing
  $('#messages').keypress(function (e) {
    e.preventDefault()
    socket.emit('typing', socket.id)
  })
  socket.on('chat-message', function (data) {
    console.log('received chat message:', data)
    $('#messages').append($('<li>').text(data))
  })
  socket.on('broadcast', function (data) {
    console.log('received broadcast:', data)
    $('#messages').append($('<li>').text(data))
  })

  socket.on('show-users', function (data) {
    console.log('received broadcast:', data)
    $('#messages').append($('<li>').text(data))
  })

})