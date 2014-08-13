
//this is the most important line in this code.
//if I do exitOnClose:true, I stop receiving notifications every 5 seconds when pressing the back button (not good!, I want to keep getting notifications)
//if I do exitOnClose:false, I go back to a blank, "powered by titanium" window, when pressing the back button (not good!, I want the app to go to the background)
var win = Ti.UI.createWindow({exitOnClose:true});


//not part of the question
var label = Ti.UI.createLabel({text:"0"});
win.add(label);
win.open();
var notifications = [];

//listen for notifications (not part of the question)
listenForNotifications(function(notification){

    //handle the notification
    notifications.push(notification);
    
    //update window
    label.text = "Notification Count: "+notifications.length;

    //display notification in title bar
    displayNotificationInTitleBar(notification);
})

//this function is just dummy code to simulate listening for notifications in background using the gcm module
//it simulates a new notification every 5 seconds with an always increasing id
//it actually does not matter what module I use for notifications, Just take it as given that there runs code in the background,
//that I don't want to stop, after the user taps the backbutton
function listenForNotifications(cb){
    var i = 0;
    setInterval(function(){
        cb({id:i++});
    },5000);
}

//This function is actually not part of the question, it's just a sample
function displayNotificationInTitleBar(notification){
    var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_MAIN,
        packageName:"com.company.backgroundnotificationstest",
        className:"com.company.backgroundnotificationstest.BackgroundnotificationstestActivity",
        flags:Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED  | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
    });
    intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
    intent.putExtra("notificationid",notification.id);

    Titanium.Android.NotificationManager.notify(notification.id, Titanium.Android.createNotification({
        contentTitle: "New Notification",
        contentText : "ID: "+notification.id,
        contentIntent: Ti.Android.createPendingIntent({
            intent:intent,
            type : Ti.Android.PENDING_INTENT_FOR_ACTIVITY
        }),
        flags : Titanium.Android.ACTION_DEFAULT | Titanium.Android.FLAG_AUTO_CANCEL | Titanium.Android.FLAG_SHOW_LIGHTS
    }));
}
