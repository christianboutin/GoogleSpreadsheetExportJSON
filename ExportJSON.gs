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
  output += "{\""+sheet.getName()+"\" : {\n";
  var header = values[0];
  for (var i = 1; i < numRows; i++) {
    if (i > 1) output += " , \n";
    var row = values[i];
    output += "\""+row[0]+"\" : {";
    for (var a = 1;a<numCols;a++){
      if (a > 1) output += " , ";
         output += "\""+header[a]+"\" : \""+row[a]+"\"";
    }
    output += "}";
    //Logger.log(row);
  }
  output += "\n}}";
  Logger.log(output);
  
  DriveApp.createFile(sheet.getName()+".json", output, MimeType.PLAIN_TEXT);
  
};


function exportJSONArray() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var numCols = rows.getNumColumns();
  var values = rows.getValues();
  
  var output = "";
  output += "{\""+sheet.getName()+"\" : [\n";
  var header = values[0];
  for (var i = 1; i < numRows; i++) {
    if (i > 1) output += " , \n";
    output += "{";
    var row = values[i];
    for (var a = 0;a<numCols;a++){
      if (a > 0) output += " , ";
         output += "\""+header[a]+"\" : \""+row[a]+"\"";
    }
    output += "}";
    //Logger.log(row);
  }
  output += "\n]}";
  Logger.log(output);
  
  DriveApp.createFile(sheet.getName()+".json", output, MimeType.PLAIN_TEXT);
  
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
  },{
    name : "Export JSON Array",
    functionName : "exportJSONArray"
  }];
  spreadsheet.addMenu("Export", entries);
};
