function showLogin() {
    document.getElementById("login-section").classList.remove("hidden");
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email.length < 5 || password.length < 5){
        document.getElementById("error-message").innerText = "Informations invalides.";
        return;
    }

    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadChart();
});

function loadChart(){
    const ctx = document.getElementById('gainChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'],
            datasets: [{
                label: 'Performance Demo',
                data: [100, 200, 350, 500, 650, 900],
                borderColor: 'gold',
                backgroundColor: 'rgba(255,215,0,0.2)',
                tension: 0.4
            }]
        }
    });
}