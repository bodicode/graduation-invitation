const SHEET_NAME = 'Sheet1'  // Đổi thành tên sheet thực tế nếu khác

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  // Thử tên tiếng Việt trước, nếu không có thì lấy sheet đầu tiên
  return ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0]
}

function doGet(e) {
  const sheet = getSheet()

  // Nếu có msg param → ghi data
  if (e.parameter.msg) {
    const name = e.parameter.name || 'Ẩn danh'
    const msg  = e.parameter.msg.trim()
    if (msg) {
      sheet.appendRow([
        Date.now(),
        name,
        msg,
        new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }),
      ])
    }
    const cb     = e.parameter.callback
    const result = JSON.stringify({ ok: true })
    return ContentService
      .createTextOutput(cb ? `${cb}(${result})` : result)
      .setMimeType(cb ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON)
  }

  // Không có msg → đọc danh sách
  const rows = sheet.getDataRange().getValues()
  const data = rows.slice(1).map(r => ({
    id:   r[0],
    name: r[1],
    msg:  r[2],
    time: r[3],
  })).reverse()

  const json   = JSON.stringify(data)
  const cb     = e.parameter.callback
  const output = cb ? `${cb}(${json})` : json

  return ContentService
    .createTextOutput(output)
    .setMimeType(cb ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON)
}

function doPost(e) {
  const sheet = getSheet()
  const name  = e.parameter.name || 'Ẩn danh'
  const msg   = e.parameter.msg  || ''
  if (msg.trim()) {
    sheet.appendRow([
      Date.now(),
      name,
      msg,
      new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }),
    ])
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON)
}
