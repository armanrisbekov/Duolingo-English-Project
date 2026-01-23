window.onload = function() {
    setTimeout(function() {
        const notif = document.getElementById('duoNotif');
        if (notif) notif.classList.add('show');
        
        setTimeout(function() {
            if (notif) notif.classList.remove('show');
        }, 6000);
    }, 3000); 
};

function celebrate() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#58cc02', '#ff9600', '#1cb0f6', '#ffffff']
    });
}
