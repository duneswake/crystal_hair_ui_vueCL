export const ContentService = {
  getContent (params) {
    return fetch('http://192.168.1.180:3000/' + params).then((res) =>
      res.json()
    )
  },
  generateColumns (args) {
    const params = args[0]
    const returnJson = []

    // insert priorities
    for (var x = 1; x < args[1].length; x++) {
      priorityInsert(args[1][x])
    }
    console.log(returnJson)
    for (var i = 0; i < Object.keys(params[0]).length; i++) {
      // raw field title
      const key = Object.keys(params[0])[i]

      // preexisting prioritized entry push check
      var flag = false
      for (var n = 0; n < Object.keys(returnJson).length; n++) {
        if (returnJson[n].field === key) {
          flag = true
        }
      }
      // dynamic push remaining columns
      // excluding api autogen
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && !flag) {
        returnJson.push({ field: key, header: key })
      }
    }

    function priorityInsert (filt) {
      const preKey = Object.keys(params[0])
      if (preKey.indexOf(filt) > -1) {
        const index = preKey.indexOf(filt)
        returnJson.push({
          field: preKey[index],
          header: preKey[index]
        })
      }
    }
    return returnJson
  }
}
