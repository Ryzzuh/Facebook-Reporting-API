const BASE_ACCOUNTS_URL =
  'https://graph.facebook.com/v7.0/627723218146471/adaccounts?fields=name&access_token='

let getAccounts = (url, data) => {
  const endPoint = 'https://graph.facebook.com/v7.0/me/adaccounts?fields=name&access_token='
  const text_data = url ? getEndPoint(url) : getEndPoint(endPoint + getAccessToken()) 
  const json_result = JSON.parse(text_data)
  const final_data = data ? final_data.push(json_result.data) : json_result.data
  const next_page = json_result.paging.next
  Logger.log(final_data)
  Logger.log("------------------------------------------------------------")
  if(next_page){getAccounts(next_page)}
  let output_data = jsonto2dMatrix(final_data)
  output2dMatrix(output_data, 'Sheet1')
}


let jsonto2dMatrix = (json) => {
  let headers = json.length ? [Object.keys(json[0])]: Object.keys(json)
  let values = json.map((d)=>Object.values(d))
  return headers.concat(values)
}


let getEndPoint = (url) => {
  let req = UrlFetchApp.fetch(url)
  let text_data = req.getContentText()
  return text_data
}


let output2dMatrix = (data, sheetName) => {
  let sheet = SpreadsheetApp.getActive().getSheetByName(sheetName)
  sheet.getRange(sheet.getLastRow()+1, 1, data.length, data[0].length).setValues(data)
}


//////////////////////////////
/////// END POINTS MAP ///////
//////////////////////////////
//let myFunction = () => {
//  let graph_api_url = 'https://graph.facebook.com/v7.0/'
//  let campaign_name = '23843975535050237'
//  let me = '627723218146471'
//  let accounts = me+'/accounts'
//  let access_token = 'EAATE9MNizRcBAK3c43TTf1LaCYZCN5wgqnZBN4zQ2zAc7wuaEc7zf7yzoaojIdZCK2mjsLAu8TZAFB19APC2tstAtA8EijDrDRgyX0BbpvZAJLH67xZAZByqDZBlUbWBq3Aqhoi9aDoQF3W7AkmvcSSWp4CkOmyqQ6IZB92bKpg0BEdZB3Y6PMEHcEKP5BDAgSPANtOZCUOGLWqFwZDZD'
//  let url = "https://graph.facebook.com/v7.0/23843975535050237/insights?fields=ad_name,impressions,clicks&date_preset=lifetime&time_increment=1&access_token=EAATE9MNizRcBAK3c43TTf1LaCYZCN5wgqnZBN4zQ2zAc7wuaEc7zf7yzoaojIdZCK2mjsLAu8TZAFB19APC2tstAtA8EijDrDRgyX0BbpvZAJLH67xZAZByqDZBlUbWBq3Aqhoi9aDoQF3W7AkmvcSSWp4CkOmyqQ6IZB92bKpg0BEdZB3Y6PMEHcEKP5BDAgSPANtOZCUOGLWqFwZDZD"
//  
//}