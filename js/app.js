require.config({
    baseUrl: 'js',
    
    paths: {
        "firebase": "http://cdn.firebase.com/js/client/2.2.2/firebase",
        "jquery": "http://code.jquery.com/jquery-1.11.1.min",
        "jqueryMobile": "http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min"
    }
});

requirejs(["jquery"]);
requirejs(["jqueryMobile"]);

require(['modules/uiConnect', 'modules/backEnd', 'modules/control', 'modules/ui', 'modules/list'], function(uiConnect, backEnd, control, ui, list) {
    
    uiConnect.init();
    list.init();
    ui.init();
    ui.setUpdateByUiCallback(list.updateByUi);
    
    control.init();
    control.setUiValueCallback(ui.updateValueByControl);
    control.setUiValueCallback2(list.updateValueByControl);
    control.setUiListCallback(list.updateListByControl);
    
    backEnd.init();
    backEnd.setUpdateValueCallback(control.updateValueByBackEnd);
    backEnd.setUpdateListCallback(control.updateListByBackEnd);
    
    control.set();
});