/**
 * Creates a JSON file based on the current sheet.  Header used as attribute key.  File is saved to your google drive because I couldn't get it to download
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 * Created by Christian Boutin @ Exequor Studios (christianboutin.com / exequor.com)
 */
function exportJSON() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var numCols = rows.getNumColumns();
  var values = rows.getValues();
  
  var output = "";
  output += "{";
  var header = values[0];
  for (var i = 1; i < numRows; i++) {
    if (i > 1) output += " , \n";
    output += "\""+sheet.getName()+"\" : {";
    var row = values[i];
    for (var a = 0;a<numCols;a++){
      if (a > 0) output += " , ";
         output += "\""+header[a]+"\" : \""+row[a]+"\"";
    }
    output += "}";
    //Logger.log(row);
  }
  output += "}";
  Logger.log(output);
  
  DriveApp.createFile(sheet.getName()+".json", output);
  
  //ContentService.createTextOutput(output).downloadAsFile(sheet.getName()+".json").setMimeType(ContentService.MimeType.JSON);
  //return ContentService.createTextOutput(output).downloadAsFile(sheet.getName()+".json").setMimeType(ContentService.MimeType.JSON);

};

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Export JSON",
    functionName : "exportJSON"
  }];
  spreadsheet.addMenu("Export", entries);
};
