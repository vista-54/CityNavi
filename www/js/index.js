/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var i = 0;
var firstStartApp = false;
var store = window.localStorage;
function StartScanBeacons() {
    initapp();
}
//========================MENU======================================
var time = 800;
var easing = 'swing';
function openMenu() {
    $('#slide-menu').stop().show().animate({width: '80%'}, time, easing);
}

function closeMenu() {
    $('#slide-menu').stop().animate({width: '0'}, time, easing, function () {
        $('#slide-menu').hide();
    });
}
window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{

    var urlToOpen = event.data;
    var obj = JSON.parse(event.data);
    for (var i in obj) {
        var action = i;
        var val = obj[i];
        if (action == 'open') {
            openDocument(val);
        }
        if (action == 'swipe') {
            if (val == 'left') {
                openMenu();
            }
            if (val == 'right') {
                closeMenu();
            }
        }
    }

}
function toolAction() {
    if ($('#slide-menu').is(":visible")) {
        closeMenu();
    } else {
        openMenu();
    }


}
//=================================MENU END==============================
//================================FIRST START APP========================
$(document).ready(function () {
    var start = store.getItem("FirstStart");
    if (!start) {
        firstStartApp = true;
        addFirstStartToStrore(firstStartApp);
        setDataID();
    }
});
function addFirstStartToStrore(status) {
    store.setItem('FirstStart', JSON.stringify(status));
}
function setDataID() {
    $.ajax({
        type: "POST",
        url: "ajax.php",
        dataType: 'JSON',
        data: {
            uuid: firstStartApp,
        },
        beforesend: $('.content').html('Загрузка'),
        success: function (data, code) {
            if (code == 200) {
                $('.content').html(data);
            } else {
                $('.content').html(code);
            }

            $('.content').html('Данные которые вернул сервер ' + data.fio[1]); // данные которые вернул сервер!

        },
        error: function (xhr, str) {
            $('.content').html('Критическая ошибка');
        },
        complete: function () {
            // $('#something').hide();
        }

    });
}
//===============================FIRST START APP END=====================
//======================================authentication===================


function getDeviceInfo() {
    var deviceID = window.device.uuid;
//        var element = document.getElementById('deviceProperties');
//        element.innerHTML = 'Device Model: '    + window.device.model    + '<br />' +
//                            'Device Cordova: '  + window.device.cordova  + '<br />' +
//                            'Device Platform: ' + window.device.platform + '<br />' +
//                            'Device UUID: '     + window.device.uuid     + '<br />' +
//                            'Device Version: '  + window.device.version  + '<br />';
    //  console.log(element.innerHTML);
    alert(deviceID);

}
//======================================authentication END===============

$(function () {
    $("#slide-menu").swipe({
        //Generic swipe handler for all directions
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            //$(this).text("You swiped " + direction ); 
            console.log("You swiped " + direction);
            if (direction == "left")
            {
                closeMenu();
            }

        }
    });
});