const BASE_ACCOUNTS_URL =
  'https://graph.facebook.com/v7.0/627723218146471/adaccounts?fields=name&access_token=' // long integer is 'me' user
const CAMPAIGN_BASE_URL = 
  'https://graph.facebook.com/v7.0/act_153599802245997/campaigns?fields=name' // for get accoutns campaigns

// change this to getEndPointData and remove BASE_ACCOUNTS_URL
// put BASE_ACCOUNTS_URL in to a separate getAccounts() function
const getAccounts = (url, data = []) => {
  let currentPage = (url || BASE_ACCOUNTS_URL) + getAccessToken()
  while (currentPage) {
  const jsonResult = getJsonEndpoint(currentPage)
  data.push(...jsonResult.data)
  currentPage = jsonResult.paging.next
}
output2dMatrix(dataTo2dMatrix(data), 'Sheet4')
}

const getCampaigns = (accountId) => {
  getAccounts(`https://graph.facebook.com/v7.0/${accountId}/campaigns?fields=name&access_token=`)
}

const getCampaignInsights = (campaignId) => {
  getAccounts(`https://graph.facebook.com/v7.0/${campaignId}/insights?fields=impressions&access_token=`)
}

const getCampaignInsightsByDay = (campaignId) => {
  getAccounts(`https://graph.facebook.com/v7.0/${campaignId}/insights?fields=impressions&time_increment=1&access_token=`)
}
/////////////////////////
///////// TESTS /////////
/////////////////////////
const test_getCampaignInsightsByDay = () => {
  getCampaignInsightsByDay('6192607710369')
}  

const test_getCampaignInsights = () => {
  getCampaignInsights('6192607710369')
}

const test_getCampaigns = () => {
  getCampaigns('act_369769893147316')
}

/////////////////////////
///////// UTILS /////////
/////////////////////////
const jsonto2dMatrix = (json) => {
  const headers = json.length ? [Object.keys(json[0])]: Object.keys(json)
  const values = json.map((d)=>Object.values(d))
  return headers.concat(values)
}

const getJsonEndpoint = (url) => {
  const req = UrlFetchApp.fetch(url)
  const text_data = req.getContentText()
  return JSON.parse(text_data)
}

const dataTo2dMatrix = (data) => [Object.keys(data[0]), ...data.map(Object.values)]

const output2dMatrix = (dataMatrix, sheetName) =>
  SpreadsheetApp.getActive()
    .getSheetByName(sheetName)
    .getRange(1, 1, dataMatrix.length, dataMatrix[0].length)
    .setValues(dataMatrix)



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