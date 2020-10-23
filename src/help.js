function help(msg){
  if(msg.includes('-adj')){
    return 'Wrong format, Use: -adj [answer] [keyword] [..keyword] to create new dialog joke.';
  } else if(msg.includes("-a")){
    return 'Wrong format, Use: -a [answer] [question] [keyword] to create new normal joke'
  }
  return 'You just type something wrong, try again.'
}

module.exports= { help }