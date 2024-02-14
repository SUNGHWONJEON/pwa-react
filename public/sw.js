self.addEventListener('push', (e) => {

    const options = {
        body: '바디',
        icon: '',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore', title: 'Explore new world', icon: ''
            },
            {
                action: 'close', title: 'Close', icon: ''
            }
        ]
    };
    e.waitUntill(
        seif.registration.showNotification('>>???????>>', options)
    )
    
})