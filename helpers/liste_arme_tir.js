
module.exports = ()=> {

  listing = ''
  for (let weapon of Object.keys(process.externalData.dd_tir)) {
    if (weapon !== 'code_arme') {
      listing += weapon + " : " +
        process.externalData.dd_tir[weapon]['name'] + '\n'
    }
  }
  reponse = "Armes disponibles:\n" + listing
  return reponse

}
