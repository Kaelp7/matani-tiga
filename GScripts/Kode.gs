//  Cara meng-update kode, hal ini perlu dilakukan jika ingin mengubah url spreadsheet atau nama sheet
//  (Deploy -> New Deployment:)
//  1. isi nama deployment (nama apa saja)
//  2. copy webAppUrl (klik atau ctrl+c)
//  3. paste ke var webAppUrl
//  4. tekan ctrl+s untuk menyimpan kode
//  5. hover mouse disebelah kanan Debug (select function to run)
//  6. klik, lalu dalam dropdown cari dan klik setWebhook
//  7. klik run disebelah kiri debug
//  8. Jika ada pesan log "webhook was set" berarti deployment baru sudah berhasil
//  9. Lakukan seperti pada nomor 6 untuk fungsi createTimeDrivenTrigger

var token = "7052789937:AAGgXSq-gBP4THilqgPyGhRiERn3sBPBebo"; // Isi token bot telegram
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/AKfycbztiBLACJgRPAPWfbKQ-F2J6_jPTgnXGhFUDR_pRSwJwZZQsq4tX2j8SfIo3qzl1ORB/exec"; // Isi webAppURL yang diberikan setelah melakukan deployment baru
var folderLink = '1jj13cdSVgFyt7AOW5VcrHpXrDnt8Uk7u'; // Replace with the actual ID from your link
//https://docs.google.com/spreadsheets/d/1We2Qlyk3uHCGWeibF1_fN60hytn1RoKGcH4SemxZidE/edit?gid=0#gid=0
var ssId = "1We2Qlyk3uHCGWeibF1_fN60hytn1RoKGcH4SemxZidE"; //

//Isi ID Spreadsheet, mis. dalam link https://docs.google.com/spreadsheets/d/1xPO3oabC8n5w4s1eD6yK3S53N-cyATX8VZtKa6Q-eQE/edit?gid=0#gid=0 yang diambil 1xPO3oabC8n5w4s1eD6yK3S53N-cyATX8VZtKa6Q-eQE


var sheetName = "Data Token"; //Nama sheet yang perlu dikerjakan, note add fungsionalitas pilih sheet
var historySheetName = "History";
var startingRow = 1; //baris awal dalam spreadsheet (biasanya baris teratas dipakai sebagai header/nama kolom)
var startingColumn = 1;  // kolom awal
// startingRow dan startingColumn sebagai referensi bagi kode untuk menentukan untuk mulai melakukan operasi 
// startingRow dan startingColumn merupakan cell untuk elemen pertama dari kolom pertama (cell A2)


// Posisi kolom, misalnya kolom ID adalah kolom pertama oleh karena itu memiliki value startingColumn (kolom awal)
var colName = startingColumn;
//var colOlt = startingColumn + 1;
var colSto = startingColumn + 1;
var colDatel = startingColumn + 2;
var colId = startingColumn + 3;
var colTokenNumber = startingColumn + 4;
var colMeterType = startingColumn + 5;
var colTokens = startingColumn + 6;
var colCurrentTokens = startingColumn + 7;
var colDate = startingColumn + 8;
var colDailyUsage = startingColumn + 9;
var colStatus = startingColumn + 10;
var colRiskLevel = startingColumn + 11;
var colTokenImage = startingColumn + 12;
var colNewTokenImage = startingColumn + 13;
var colTokenURL = startingColumn + 14;
var colNewTokenURL = startingColumn + 15;


function doGet(e) {
  return HtmlService.createHtmlOutput("Bot Telegram sedang berjalan.");
}
function doPost(e) {
  try {
    if (e.postData) {
      var data = JSON.parse(e.postData.contents);
      var chatId, text;
      var state;  // Initialize the state variable

      if (data.message) {
        chatId = data.message.chat.id;
        text = data.message.text;

        // Initialize chatStates
        var scriptProperties = PropertiesService.getScriptProperties();
        var chatStates = JSON.parse(scriptProperties.getProperty('chatStates') || '{}');

        // Ensure the chat state exists for the current chatId
        if (!chatStates[chatId]) {
          chatStates[chatId] = { step: 0, device: {}, currentToken: null, expectingImage: false, fileId: null }; // Initialize state
        }
        state = chatStates[chatId]; // Now link state to the current chatId

        // Check for photo or document and store fileId
        if (data.message.photo) {
          var photoArray = data.message.photo;
          var fileId = photoArray[photoArray.length - 1].file_id; // Get the highest resolution photo
          state.fileId = fileId; // Store fileId in state
        } else if (data.message.document) {
          var fileId = data.message.document.file_id; // Get the document file_id
          state.fileId = fileId; // Store fileId in state
        }

      } else if (data.callback_query) {
        chatId = data.callback_query.message.chat.id;
        text = data.callback_query.data; // Get the data from the button click

        // Initialize chatStates
        var scriptProperties = PropertiesService.getScriptProperties();
        var chatStates = JSON.parse(scriptProperties.getProperty('chatStates') || '{}');

        // Ensure the chat state exists for the current chatId
        if (!chatStates[chatId]) {
          chatStates[chatId] = { step: 0, device: {}, currentToken: null, expectingImage: false, fileId: null }; // Initialize state
        }
        state = chatStates[chatId]; // Now link state to the current chatId
      }

      // Call the function to handle user input
      handleUserInput(chatId, text, chatStates, scriptProperties);

      // Save the updated chatStates back to script properties
      scriptProperties.setProperty('chatStates', JSON.stringify(chatStates));
      var hasUsedBot = false;
     
    }
  } catch (error) {
    // Handle errors and send a message to the user
    sendText(chatId, "Kesalahan dalam memproses permintaan: " + error.toString() + " Mohon ketik atau klik /start untuk memulai lagi.");
  }
}

var DEBOUNCE_TIME = 400;

function handleUserInput(chatId, text, chatStates, scriptProperties) {
  var state = chatStates[chatId];



  // Handle /start and menu commands
  if (text && (text.toLowerCase() === "/start" || text.toLowerCase() === "menu")) {
    chatStates[chatId] = { step: 1, device: {}, currentToken: null, expectingImage: false, fileId: null };
    sendInitialMenu(chatId); // Optionally send the initial menu
    updateChatIdList(chatId, scriptProperties); // Ensure chat ID is updated
    return; // Exit the function early to avoid further processing
  }

 
  // Handle other inputs based on current chat state...
  // Further logic for handling device selection, token input, etc.

  var now = new Date().getTime();
  if (state.lastProcessedTimestamp && (now - state.lastProcessedTimestamp) < DEBOUNCE_TIME) {
    return;
  }
  state.lastProcessedTimestamp = now;

  if (!state.step) {
    state.step = 0;
  }

switch (state.step) {
  
case 0:
    var menuSent = scriptProperties.getProperty('menuSent'); // Check if the menu has already been sent

    if (menuSent) {  // If menu has been sent        
        state.step = 1;  // Move to device selection        
    } else {
        sendInitialMenu(chatId);
        scriptProperties.setProperty('menuSent', 'true'); // Mark menu as sent
        state.step = 1; // Move to device selection
    }
    break;

  case 1:
    var searchQuery = text.toLowerCase();
    var devices = getDeviceData();  // Get the full list of devices
    

    if (Array.isArray(devices) && devices.length > 0) {
      var matchingDevices = devices.filter(device => 
        fuzzyMatch(searchQuery, device.name.toLowerCase()) || 
        fuzzyMatch(searchQuery, String(device.tokenNumber).toLowerCase())
      );

      if (matchingDevices.length > 0) {
         var firstDevice = matchingDevices[0].name;
         var deviceList = "Ditemukan " + matchingDevices.length + " device. Silakan pilih dengan mengetikkan nomor (mis. '1' untuk " + firstDevice + "), atau mulai lagi dengan perintah /start:\n";
        matchingDevices.forEach((device, index) => {
          deviceList += (index + 1) + ". " + device.name + " (No. token: " + device.tokenNumber + ")\n";
        });

        sendText(chatId, deviceList);
        state.matchingDevices = matchingDevices;
        state.step = 2;  // Awaiting device selection
      } else {
        sendText(chatId, "Tidak ada device yang cocok ditemukan. Silahkan coba lagi atau mulai ulang dengan perintah /start.");
      }
    } else {
      sendText(chatId, "Kesalahan dalam memuat data device. Silahkan coba lagi atau mulai ulang dengan perintah /start.");
    }
    break;

  case 2:
    var selectedDeviceIndex = parseInt(text) - 1;
    var matchingDevices = state.matchingDevices;

    if (selectedDeviceIndex >= 0 && selectedDeviceIndex < (matchingDevices.length)) {
      state.device = matchingDevices[selectedDeviceIndex];

      const deviceInfo = `Nama: ${state.device.name}\nNo. token: ${state.device.tokenNumber}\nStatus: ${state.device.status}\nPenggunaan harian: ${state.device.dailyUsage}\nJumlah token awal : ${state.device.tokens}\nPerkiraan jumlah token terkini : ${state.device.currentTokens}\n`;
      sendText(chatId, "Anda telah memilih device berikut:\n" + deviceInfo + "Silakan masukkan token yang ada pada device saat ini:");

      state.step = 3;  // Move to token input
    } else {
      sendText(chatId, "Pilihan tidak valid. Silahkan coba lagi atau mulai ulang dengan perintah /start.");
    }
    break;
case 3: // Expecting current token
    // Validate the token input
    if (isValidTokenAmount(text)) {
        state.currentToken = text;  // Store valid current token from user
        sendText(chatId, "Silahkan mengisi foto token device yang ada sekarang:");
        state.step = 4;  // Move to image input for current token
    } else {
        sendText(chatId, "Token tidak valid. Silakan masukkan token yang benar.");
    }
    break;

case 4: // Expecting image for current token
    if (state.fileId) {
        var fileId = state.fileId; // Retrieve fileId from the state

        if (fileId) {
            sendText(chatId, "Gambar sedang diproses, Mohon menunggu..."); 
            var url = "https://api.telegram.org/bot" + token + "/getFile?file_id=" + fileId;

            // Fetch the file here using the URL
            var fileInfo = getFileInfo(fileId);

            if (fileInfo && validateImage(fileInfo)) {
                // Store image info in state instead of saving immediately
                state.imageInfo = {
                    fileInfo: fileInfo,
                    currentToken: state.currentToken,
                    deviceNumber: state.device.tokenNumber,
                    deviceName: state.device.name
                };

                sendText(chatId, "Informasi device telah diproses. Silakan masukkan token baru untuk device:");
                state.step = 5;  // Move to new token input
            } else {
                sendText(chatId, "Foto tidak valid. Mohon dicoba lagi.");
            }
        } else {
            sendText(chatId, "Foto tidak didapatkan. Mohon dicoba lagi.");
        }
    } else {
        sendText(chatId, "Foto tidak didapatkan. Mohon dicoba lagi.");
    }
    break;

case 5: // Expecting new token
    // Validate the new token input
    if (isValidTokenAmount(text)) {
        state.device.newToken = text; // Store valid new token from user
        sendText(chatId, "Silahkan mengisi foto token device baru yang ada sekarang:");
        state.step = 6;  // Move to image input for new token
    } else {
        sendText(chatId, "Token baru tidak valid. Silakan masukkan token yang benar.");
    }
    break;

    

case 6: // Expecting image for new token
    if (state.fileId) {
        var fileId = state.fileId; // Retrieve fileId from the state

        if (fileId) {
            sendText(chatId, "Gambar sedang diproses, Mohon menunggu..."); 
            var url = "https://api.telegram.org/bot" + token + "/getFile?file_id=" + fileId;

            // Fetch the file here using the URL
            var fileInfo = getFileInfo(fileId);

            if (fileInfo && validateImage(fileInfo)) {
                // Store image info in state instead of saving immediately
                state.imageInfoNewToken = {
                    fileInfo: fileInfo,
                    newToken: state.device.newToken,
                    deviceNumber: state.device.tokenNumber,
                    deviceName: state.device.name
                };

                var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
                var data = sheet.getDataRange().getValues();
                var notFound =  99999999;
                var deviceRow = notFound; // Default value if not found
  

                for (var i = startingRow; i < data.length; i++) {
                    if (data[i][colTokenNumber - 1] == state.device.tokenNumber) { // Match deviceNumber in the correct column
                        deviceRow = i; // Set deviceRow to the current index
                        scriptProperties.setProperty('deviceRow', deviceRow);
                        break; // Exit loop once found
                    }
                }

                if (deviceRow == notFound) {
                    sendText(chatId, "deviceRow tidak ditemukan, mohon dilaporkan.")
                }

                   

                    // Calculate remaining time
                    var jumlahTokenterkini = parseInt(state.device.newToken, 10); // New token as current amount
                    var perkiraanPemakaian = parseFloat(data[deviceRow][colDailyUsage - 1]) || 0; // Daily usage from the relevant column

                    // Calculate the remaining time
                    var totalSeconds = calculateInitialTime(jumlahTokenterkini, perkiraanPemakaian);
                    var formattedTime = formatTime(totalSeconds);
                    
                    // Send the result to the user
                    sendText(chatId, `\nPerkiraan waktu habis: ${formattedTime}`);


                sendText(chatId, "Foto token baru telah diproses. Silakan masukkan status untuk device, '0' jika device Mati atau '1' jika device Hidup.");
                state.step = 7;  // Move to status input
            } else {
                sendText(chatId, "Foto tidak valid. Mohon dicoba lagi.");
            }
        } else {
            sendText(chatId, "Foto tidak didapatkan. Mohon dicoba lagi.");
        }
    } else {
        sendText(chatId, "Foto tidak didapatkan. Mohon dicoba lagi.");
    }
    break;


case 7: // Expecting new device status

    // Validate the status input
    if (text == '1') {
        state.device.status = 'Hidup'; // Update device status to "Hidup"
    } else if (text == '0') {
        state.device.status = 'Mati'; // Update device status to "Mati"
    } else {
        sendText(chatId, "Input tidak valid. Silakan ketik '1' untuk hidup atau '0' untuk mati.");
        break; // Exit this case and wait for valid input
    }
    
  
    var deviceRow = scriptProperties.getProperty('deviceRow');

      if (deviceRow) {
        deviceRow = parseInt(deviceRow, 10); // Convert to integer if necessary
        // Update the status in the spreadsheet
        var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
        
        sheet.getRange(deviceRow + startingRow, colStatus).setValue(state.device.status);
        
        // Clear the property after using it
        scriptProperties.deleteProperty('deviceRow');
    } else {
        sendText(chatId, "Device tidak ditemukan, silahkan coba lagi, atau mulai ulang dengan perintah /start.");
    }
    

          var tokenImageURLHistory;
          var tokenNewImageURLHistory;

       if (state.imageInfo) {
            saveImageToSpreadsheet(state.imageInfo.fileInfo, state.imageInfo.currentToken, state.imageInfo.deviceNumber,state.imageInfo.deviceName,chatId, false);
            tokenImageURLHistory = state.imageInfo.fileInfo.fileUrl;
            
            state.imageInfo = null; // Clear the image info to avoid stale data
        }
        else {
             sendText(chatId, "Informasi device lama tidak dapat ditemukan, mohon dilaporkan atau coba lagi.")
            state.currentToken = null;  
            state.device.newToken = null;  
            state.fileId = null; 
            state.step = 0; // Move back to step 0 to show the initial menu
            scriptProperties.deleteProperty('menuSent'); // Reset the menuSent indicator
            sendInitialMenu(chatId); // Show the initial menu
            break;
        }

        if (state.imageInfoNewToken) {
            saveImageToSpreadsheet(state.imageInfoNewToken.fileInfo, state.imageInfoNewToken.newToken, state.imageInfoNewToken.deviceNumber,  state.imageInfoNewToken.deviceName, chatId, true);
            tokenNewImageURLHistory = state.imageInfoNewToken.fileInfo.fileUrl;
            state.imageInfoNewToken = null; // Clear the image info to avoid stale data
        }
            else {
                sendText(chatId, "Informasi device baru tidak dapat ditemukan, mohon dilaporkan atau coba lagi.")
            
            state.currentToken = null;  
            state.device.newToken = null;  
            state.fileId = null; 
            state.step = 0; // Move back to step 0 to show the initial menu
            scriptProperties.deleteProperty('menuSent'); // Reset the menuSent indicator
            sendInitialMenu(chatId); // Show the initial menu
            break;
        }
        


    
    const deviceInfo = `Nama: ${state.device.name}\nNo. token: ${state.device.tokenNumber}\nStatus: ${state.device.status}\nPenggunaan harian: ${state.device.dailyUsage}\nJumlah token: ${state.device.newToken}\n`;

    sendText(chatId, `Informasi device telah disubmit: \n${deviceInfo}`);

    // Prepare to log the current data to the history sheet
    
    var historySheet = SpreadsheetApp.openById(ssId).getSheetByName(historySheetName);
    var today = `${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}`;


    





    // Retrieve current device data for history logging
    var currentData = [
        state.device.name,
        state.device.sto,            // Replace with actual data if applicable
        state.device.datel,          // Replace with actual data if applicable
        state.device.tokenNumber,             // Replace with actual data if applicable
        state.device.meterType,      // Replace with actual data if applicable
        state.device.tokens,         // Initial tokens
        state.device.currentTokens,  // Current tokens
        state.device.date,           // Last check date
        state.device.dailyUsage,
        today,                        // Change date
        tokenImageURLHistory,
        tokenNewImageURLHistory
    ];

     // Append the current data to the history sheet
     historySheet.appendRow(currentData);
     

    
    
    // Optionally, update the status in the spreadsheet
    //updateDeviceStatusInSpreadsheet(state.device.tokenNumber, state.device.status);

    // Reset state for next operation
    state.currentToken = null;  
    state.device.newToken = null;  
    state.fileId = null; 
    state.step = 0; // Move back to step 0 to show the initial menu
    scriptProperties.deleteProperty('menuSent'); // Reset the menuSent indicator
    sendInitialMenu(chatId); // Show the initial menu
    break;

  default:
    // Default case for handling unexpected inputs or errors
    sendText(chatId, "Perintah tidak dikenali. Silahkan coba lagi atau mulai ulang dengan perintah /start.");
    state.step = 0; // Reset to the initial state
    break;
}

  // Save the updated state back to chatStates
  chatStates[chatId] = state;
  //scriptProperties.setProperty('chatStates', JSON.stringify(chatStates));
}


function calculateInitialTime (jumlahTokenterkini, perkiraanPemakaian) {
    var dailyUsage = parseFloat(perkiraanPemakaian) || 0;
    return (dailyUsage === 0 || jumlahTokenterkini <= 0) ? null : (jumlahTokenterkini / dailyUsage) * 24 * 3600;
};

function formatTime(seconds) {
    if (seconds === null) {return "Habis";} // Return "Habis" if the time calculation failed

    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = Math.round(seconds % 60);

    return `${days} Hari ${hours} Jam ${minutes} Menit ${secs} Detik`;
};







function getFileInfo(fileId) {
  try {
    var url = "https://api.telegram.org/bot" + token + "/getFile?file_id=" + fileId;
    var response = UrlFetchApp.fetch(url);
    var fileData = JSON.parse(response.getContentText());
    
    if (fileData.ok) {
      var filePath = fileData.result.file_path;
      var fileUrl = "https://api.telegram.org/file/bot" + token + "/" + filePath;
      
      var fileBlob = UrlFetchApp.fetch(fileUrl).getBlob();
      return {
        fileUrl: fileUrl, // Return the full URL to the image
        name: filePath.split('/').pop(),
        size: fileBlob.getBytes().length
      };
    }
    return null;
  } catch (error) {
    Logger.log('Error fetching file info: ' + error);
    return { error: error.message };
  }
}

function validateImage(fileInfo) {
  var maxSizeInBytes = 5 * 1024 * 1024; // Example: 5 MB
  return fileInfo.size <= maxSizeInBytes;
}
function saveImageToSpreadsheet(fileInfo, tokenNumber, deviceNumber, deviceName, chatId, isNewToken) {
    // Check integrity of fileInfo
    if (!fileInfo || !fileInfo.fileUrl) {
        sendText(chatId, "Informasi file tidak valid. Gagal menyimpan foto token.");
        return;
    }

    var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
    var data = sheet.getDataRange().getValues(); // Get all data in the sheet
    var dataUpdated = false; // Flag to track if the data was updated

    // Loop through the sheet to find the correct row based on deviceNumber and deviceName
    for (var i = startingRow; i < data.length; i++) {
        // Check if both deviceNumber and deviceName match
        if (data[i][colTokenNumber - 1] == deviceNumber && data[i][colName - 1] == deviceName) { // Match deviceNumber and deviceName in the correct columns
            
            if (isNewToken) {
                // If it's a new token/image, save in the new columns
                var newImageFormula = `=IMAGE("${fileInfo.fileUrl}"; 2)`; // Use IMAGE() function
                sheet.getRange(i + startingRow, colNewTokenImage).setFormula(newImageFormula); // Store in the new image column
                sheet.getRange(i + startingRow, colNewTokenURL).setValue(fileInfo.fileUrl); // URL gambar
                sheet.getRange(i + startingRow, colCurrentTokens).setValue(tokenNumber); // Store new token
                sheet.getRange(i + startingRow, colTokens).setValue(tokenNumber);
                sendText(chatId, "Data token dan foto token baru telah berhasil disimpan.");
            } else {
                // If it's the old token/image
                var imageFormula = `=IMAGE("${fileInfo.fileUrl}"; 2)`; 
                sheet.getRange(i + startingRow, colTokenImage).setFormula(imageFormula); // Store the old image formula
                sheet.getRange(i + startingRow, colTokenURL).setValue(fileInfo.fileUrl); // URL gambar
                sheet.getRange(i + startingRow, colTokens).setValue(tokenNumber); // Store old token
                sendText(chatId, "Data token dan foto token lama telah berhasil disimpan.");
            }
            
            var moddedDate = `${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}`;
            sheet.getRange(i + startingRow, colDate).setValue(moddedDate); // Set current date
            dataUpdated = true; // Set flag to true indicating successful update
            break; // Exit loop after updating
        }
    }

    // Check if data was updated, and if not, send a message
    if (!dataUpdated) {
        sendText(chatId, "Gagal menyimpan foto token ke spreadsheet. Mohon coba lagi.");
    } 
}


function sendInitialMenu(chatId) {
  var version = getVersion();
  sendText(chatId, "Selamat datang di bot " + version + "! Silahkan menuliskan nama atau nomor token device yang ingin diubah :");
}

function sendRestartOnlyKeyboard(chatId) {

  var keyboard = {
    keyboard: [
      [{ text: "/start" }]
    ],
    resize_keyboard: true,
    one_time_keyboard: true
  };
}


function sendText(chatId, text, options) {
  var maxLength = 1000; // Maximum length of message to avoid exceeding URL limit
  var url = telegramUrl + "/sendMessage?chat_id=" + chatId;

  // Default to /start button if no options are provided
  if (!options) {
    options = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "/start" }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      })
    };
  }

  // Split the text into chunks
  var textChunks = splitMessage(text, maxLength);

  // Send each chunk sequentially
  textChunks.forEach(function(chunk) {
    var messageUrl = url + "&text=" + encodeURIComponent(chunk);
    if (options.reply_markup) {
      messageUrl += "&reply_markup=" + encodeURIComponent(options.reply_markup);
    }
    UrlFetchApp.fetch(messageUrl, {
      method: "post",
      contentType: "application/json"
    });
  });
}


function splitMessage(message, maxLength) {
  var result = [];
  var lines = message.split('\n'); // Split the message by lines
  var chunk = '';

  lines.forEach(function(line) {
    // Check if adding this line would exceed the maxLength
    if (chunk.length + line.length + 1 > maxLength) {
      result.push(chunk.trim()); // Push the current chunk (trim to remove extra space)
      chunk = ''; // Reset chunk
    }
    chunk += line + '\n'; // Add the line to the chunk
  });

  if (chunk) {
    result.push(chunk.trim()); // Push the last chunk (trim to remove extra space)
  }

  return result;
}


function updateChatIdList(chatId, scriptProperties) {
  var chatIdList = scriptProperties.getProperty('chatIdList');

  if (!chatIdList) {
    chatIdList = [];
  } else {
    chatIdList = JSON.parse(chatIdList);
  }

  // Add chatId to the list if it's not already included
  if (!chatIdList.includes(chatId)) {
    chatIdList.push(chatId);
    scriptProperties.setProperty('chatIdList', JSON.stringify(chatIdList));
  }
}

function sendTextToAll(text) {
  var maxLength = 1000; // Set the maximum length for each message
  var scriptProperties = PropertiesService.getScriptProperties();
  var chatIdList = JSON.parse(scriptProperties.getProperty('chatIdList') || '[]');

  // Split the text into manageable chunks
  var textChunks = splitMessage(text, maxLength);

  // Send each chunk to every chatId
  chatIdList.forEach(function(chatId) {
    textChunks.forEach(function(chunk) {
      var url = telegramUrl + "/sendMessage?chat_id=" + chatId + "&text=" + encodeURIComponent(chunk);
      UrlFetchApp.fetch(url);
    });
  });
}


function getDeviceData() {
 var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
  var data = sheet.getRange(startingRow, startingColumn, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  var devices = [];
  
  for (var i = 0; i < data.length; i++) {
    devices.push({
       // Adjusting for 0-based index
      name: data[i][colName - 1],
     // olt: data[i][colOlt - 1],
      sto: data[i][colSto - 1],
      datel: data[i][colDatel - 1],
      tokenNumber: data[i][colTokenNumber - 1],
      meterType: data[i][colMeterType - 1],
      tokens: data[i][colTokens - 1],
      currentTokens: data[i][colCurrentTokens - 1],
      date: data[i][colDate - 1],
      dailyUsage: data[i][colDailyUsage - 1],
      status: data[i][colStatus - 1],
      //powerAmount: data[i][colPowerAmount - 1],
      rowIndex: i + startingRow // Adjusting rowIndex to start from startingRow
    });
  }
  
  return devices;
}



function isValidName(name) {
  return name && name.length > 0;
}

function isValidId(id) {
  return id && id.length > 0 && /^[0-9]+$/.test(id);
}

function isValidTokenAmount(amount) {
    // Check if the amount is undefined, null, or not a string
    if (amount === undefined || amount === null) {
        return false; // Return false immediately for invalid input types
    }

    // Ensure amount is a string and trim whitespace
    amount = amount.trim();

    // Replace commas with dots for compatibility
    amount = amount.replace(',', '.');

    // Check if the amount is a valid number and is non-negative
    const parsedAmount = parseFloat(amount);

    // Check if the input is a valid number and does not contain invalid characters
    // Use regex to ensure the string is a valid number (including decimals)
    const isValidFormat = /^-?\d+(\.\d+)?$/.test(amount);

    return isValidFormat && !isNaN(parsedAmount) && parsedAmount >= 0;
}

function isValidImage(fileInfo) {
  // Check if fileInfo exists and has a valid URL
  if (fileInfo === undefined || fileInfo === null) {
    return false; // Return false immediately for invalid input types
}
  return fileInfo && fileInfo.fileUrl && (fileInfo.fileUrl.endsWith('.jpg') || fileInfo.fileUrl.endsWith('.png') || fileInfo.fileUrl.endsWith('.jpeg') || fileInfo.fileUrl.endsWith('.webp'));
}
/*
function isValidPowerAmount(text) {
  return !isNaN(parseFloat(text)) && parseFloat(text) >= 0;
}
*/
function isValidDailyUsage(text) {
  // No need to refer to a 'device' object here
  return !isNaN(parseFloat(text)) && parseFloat(text) >= 0;
}

function isValidMeterType(text) {
  // Implement validation logic here if needed
  return text && text.length > 0;
}

function isValidDatel(text) {
  return true;
}


function isValidSto(text) {
  return true;
}



function setWebhook() {
  // Set the webhook for the Telegram bot
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());

  // Manually set version information

  var versionInfo = "Version " + new Date().toLocaleString();
  
  PropertiesService.getScriptProperties().setProperty('versionInfo', versionInfo);
  Logger.log("Version info updated: " + versionInfo);
}


function removeWebhook() {
  // Remove the webhook for the Telegram bot
  var url = telegramUrl + "/deleteWebhook";
  var response = UrlFetchApp.fetch(url);
  
  // Log the response from the Telegram API
  Logger.log("Remove Webhook Response: " + response.getContentText());

  // Optionally log the timestamp of the operation
  var removalInfo = "Webhook removed at " + new Date().toLocaleString();
  Logger.log(removalInfo);
}


function getVersion() {
  // Retrieve the stored version information from script properties
  return PropertiesService.getScriptProperties().getProperty('versionInfo');
}


function fuzzyMatch(query, string) {
  // Normalize input by removing special characters and converting to lowercase
  function normalize(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  var normalizedQuery = normalize(query);
  var normalizedString = normalize(string);

  var queryLen = normalizedQuery.length;
  var stringLen = normalizedString.length;

  if (queryLen > stringLen) return false;

  var matchCount = 0;

  for (var i = 0, j = 0; i < queryLen && j < stringLen; j++) {
    if (normalizedQuery[i] === normalizedString[j]) {
      matchCount++;
      i++;
    }
  }

  // Calculate dynamic threshold based on query length
  var threshold = Math.max(0.625, 1 - (queryLen / stringLen) * 0.25);

  return matchCount / queryLen >= threshold;
}



function rumusToken() {
 var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
  
  // Define your column indices (adjust these to match your actual columns)


  // Get all values in the necessary columns
  var currentTokenValues = sheet.getRange(2, colCurrentTokens, sheet.getLastRow() - 1).getValues();
  var dailyUsageValues = sheet.getRange(2, colDailyUsage, sheet.getLastRow() - 1).getValues();
  var statusValues = sheet.getRange(2, colStatus, sheet.getLastRow() - 1).getValues();
  
  // Iterate through each row to update the current token amount
  for (var i = 0; i < currentTokenValues.length; i++) {
    var currentToken = currentTokenValues[i][0];
    var dailyUsage = dailyUsageValues[i][0];
    var status = statusValues[i][0];
    
    if (currentToken > 0 && status !== "Mati") {
      var minutesPerDay = 1440;
      var decreaseAmount = dailyUsage / minutesPerDay; // Adjust as per your logic, 1440 = amount of minutes per day
      var newTokenValue = Math.max(0, currentToken - decreaseAmount);
      sheet.getRange(i + 2, colCurrentTokens).setValue(newTokenValue);
    }
  }
}


function calculateRiskLevel() {
 var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var riskLevelColumn = colRiskLevel - 1; // Adjusting for 0-based index
  var tokenColumn = colCurrentTokens - 1; // Adjusting for 0-based index
  var usageColumn = colDailyUsage - 1; // Adjusting for 0-based index

  for (var i = 1; i < data.length; i++) { // Start at 1 to skip header
    var currentToken = parseFloat(data[i][tokenColumn]);
    var dailyUsage = parseFloat(data[i][usageColumn]);
    
    if (!isNaN(currentToken) && !isNaN(dailyUsage) && dailyUsage > 0) {
      var daysRemaining = currentToken / dailyUsage;

      var riskLevel = "Critical";
      if (daysRemaining < 4) {
        riskLevel = "Critical";
      } else if (daysRemaining < 10) {
        riskLevel = "Moderate";
      }
      else if (daysRemaining >= 10) {
        riskLevel = "Low";
      }

      sheet.getRange(i + startingRow, colRiskLevel).setValue(riskLevel); // Using 1-based index for setValue
    }
  }
}



function checkCritical() {
 var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var riskLevelColumn = colRiskLevel - 1; // Adjusting for 0-based index
  var tokenNumberColumn = colTokenNumber - 1; // Adjusting for 0-based index
  var nameColumn = colName - 1; // Adjusting for 0-based index
  var dailyUsageColumn = colDailyUsage - 1;
  var currentTokenColumn = colCurrentTokens - 1;
  var notifiedDevices = PropertiesService.getScriptProperties().getProperty('notifiedDevices');
  notifiedDevices = notifiedDevices ? JSON.parse(notifiedDevices) : {};

  var criticalDevices = [];

  for (var i = 1; i < data.length; i++) { // Start at 1 to skip header
    var deviceNumber = data[i][tokenNumberColumn];
    var deviceName = data[i][nameColumn];
    var riskLevel = data[i][riskLevelColumn];
    

    if (riskLevel == "Critical" && !notifiedDevices[deviceNumber]) {
      var dailyUsage = data[i][dailyUsageColumn];
      var currentTokens = data[i][currentTokenColumn];
      criticalDevices.push({ 
        deviceNumber: deviceNumber, 
        deviceName: deviceName, 
        dailyUsage: dailyUsage, 
        currentTokens: currentTokens
         });
      notifiedDevices[deviceNumber] = true;
    } else if (riskLevel != "Critical" && notifiedDevices[deviceNumber]) {
      delete notifiedDevices[deviceNumber]; // Reset notification state
    }
  }

  if (criticalDevices.length > 0) {
    notifyUsers(criticalDevices);
  }

  PropertiesService.getScriptProperties().setProperty('notifiedDevices', JSON.stringify(notifiedDevices));
}

function notifyUsers(criticalDevices) {
  var message = "Device berikut telah memasuki kondisi Critical, Mohon diperiksa:\n\n";
  
  criticalDevices.forEach(function(device) {
    var totalSeconds = calculateInitialTime(device.currentTokens, device.dailyUsage);
    var formattedTime = formatTime(totalSeconds);
    
    message += "Device: " + device.deviceName + " (No. token: " + device.deviceNumber + ")\n";
    message += "Perkiraan waktu habis: " + formattedTime + "\n\n"; // Use calculated formatted time
  });
  
  sendTextToAll(message);
}

function createTimeDrivenTrigger() {   //Order of trigger is important

deleteAllTriggers();
  ScriptApp.newTrigger('rumusToken')
    .timeBased()
    .everyMinutes(1)
    .create();

    ScriptApp.newTrigger('calculateRiskLevel')
    .timeBased()
    .everyMinutes(1)
    .create();

  ScriptApp.newTrigger('checkCritical')
    .timeBased()
    .everyMinutes(10)
    .create();

  
}

function manuallyExecuteTrigger() {
  rumusToken();
  calculateRiskLevel();
  checkCritical();
}


function deleteAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);   

  }
}


