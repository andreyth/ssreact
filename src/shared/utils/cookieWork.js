const cookieWork = () => {
  function setCookie (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 1000 * 60 * 60 * 24))
    var expires = 'expires=' + d.toGMTString()
    window.document.cookie = cname + '=' + cvalue + '; ' + expires
  }

  function getCookie (cname) {
    var name = cname + '='
    var cArr = window.document.cookie.split(';')
    for (var i = 0; i < cArr.length; i++) {
      var c = cArr[i].trim()
      if (c.indexOf(name) === 0) { return c.substring(name.length, c.length) }
    }
    return ''
  }

  function deleteCookie (cname) {
    var d = new Date()
    d.setTime(d.getTime() - (1000 * 60 * 60 * 24))
    var expires = 'expires=' + d.toGMTString()
    window.document.cookie = cname + '=' + '; ' + expires
  }

  return {
    setCookie, getCookie, deleteCookie
  }
}

export default cookieWork()
