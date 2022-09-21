import profile from '../assets/images/profile.png';


export function arrayUpdation(data = [], value = null) {
  if(!value) return data;

  if(data.indexOf(value) < 0) {
    data.push(value)
  } else {
    const index = data.indexOf(value)
    data.splice(index, 1)
  }
  return data;
}


export function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return profile;  
    }
    if(url.protocol === "http:" || url.protocol === "https:"){
    	return url	
    }
    return profile;
}

export function exportToCsv(filename, rows) {
    var processRow = function (row) {
      var finalVal = '';
      for (var j = 0; j < row.length; j++) {
        var innerValue = row[j] === null ? '' : row[j].toString();
        if (row[j] instanceof Date) {
          innerValue = row[j].toLocaleString();
        };
        var result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0)
          result = '"' + result + '"';
        if (j > 0)
          finalVal += ',';
        finalVal += result;
      }
      return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
      csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // toastr.success("File has been downloaded Successfully.", 'Successfull')
      }
    }
  }