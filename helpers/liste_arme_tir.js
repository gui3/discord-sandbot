
module.exports = ()=> {

  listing = ''
  for (let weapon of Object.keys(process.externalData.dd_tir)) {
    if (weapon !== '_distance') {
      listing += weapon + " : " +
        process.externalData.dd_tir[weapon]['name'] + '\n'
    }
  }
  reponse = "Armes disponibles:\n" + listing
  return reponse

}
