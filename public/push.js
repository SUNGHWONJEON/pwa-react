const push = require('web-push');

//let vapidKeys = push.generateVAPIDKeys();
let vapidKeys = {
    publicKey: 'BG9vtHURc8lCXqh70YQ6QZCgKFQYLaK5kOceXGTatPs1nRkiyf10gY25zZHQQOjZfzSaHi1BBnaYOYmCOAq7_B0',
    privateKey: 'PJxfYehXgl0dzt6NhFC4QAEMz9QtVv1wUEH7ZmnoV_w'
}

push.setVapidDetails('mailto:donkihotex@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

let sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/dQD_z6yf9z0:APA91bG8TPtxy7Qgjf9l5uGoUQsSL2ytVyTUMdxD8DB01yZ2ZLEToFgogG-L_7KEJPL4mlP_J840F3ntuQITTrQCQVjGL3i1r96G9BbnZsmSeyQ7dIkKjtYUbfavqNWqoUJnPM8k8OZ8","expirationTime":null,"keys":{"p256dh":"BN-unHWKUoUvulqEUbDnadeabSI4i9eBSybstGa_l6MqrcKHDNPBytPhC97SIMdCj6DDvvec9HgDs_-kxm-0Nxk","auth":"jao-uIalcbZkDcg6EWGdgw"}}

const notification = {
    title: "Hey, this is a push notification!",
    body: "Subscribe Pill my rhythm",
  };

push.sendNotification(sub, JSON.stringify(notification));

console.log(sub);
//console.log(vapidKeys);