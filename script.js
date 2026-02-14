// Stockage utilisateurs
let users = JSON.parse(localStorage.getItem('users')) || [];

// Inscription
function signup() {
  const name = document.getElementById('name').value;
  const country = document.getElementById('country-code').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const referral = document.getElementById('referral').value;

  if(users.find(u => u.email === email)) { alert('Email déjà utilisé'); return; }

  const user = {
    name, country, phone, email, password,
    balance: 1500,
    referral,
    referrals: [],
    invested: 0
  };

  if(referral) {
    let parrain = users.find(u => u.email === referral);
    if(parrain) {
      parrain.balance += 0.4 * 1500;
      parrain.referrals.push(email);
      alert(`Bonus de parrainage 40% ajouté à ${parrain.email}`);
    }
  }

  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Compte créé ! Bonus 1500 FCFA ajouté.');

  loginAfterSignup(email, password);
}

// Connexion
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const user = users.find(u => u.email === email && u.password === password);
  if(!user) { alert('Email ou mot de passe incorrect'); return; }

  localStorage.setItem('currentUser', email);
  showDashboard(user);
}

// Après inscription
function loginAfterSignup(email, password) {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'none';

  const user = users.find(u => u.email === email && u.password === password);
  localStorage.setItem('currentUser', email);
  showDashboard(user);
}

// Dashboard
function showDashboard(user) {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('balance').innerText = user.balance;
}

// Déconnexion
function logout() {
  localStorage.removeItem('currentUser');
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

// Investir
function invest() {
  const email = localStorage.getItem('currentUser');
  let user = users.find(u => u.email === email);

  let amount = prompt("Montant à investir (minimum 1500 FCFA)");
  amount = parseFloat(amount);
  if(isNaN(amount) || amount < 1500) { alert("Investissement minimum 1500 FCFA"); return; }

  user.invested += amount;
  localStorage.setItem('users', JSON.stringify(users));
  alert(`Vous avez investi ${amount} FCFA`);
}

// Retrait
function withdraw() {
  const now = new Date();
  const hour = now.getHours();
  if(hour < 8 || hour >= 17) { alert("Retraits disponibles seulement de 8h à 17h"); return; }

  const email = localStorage.getItem('currentUser');
  let user = users.find(u => u.email === email);

  let amount = prompt("Montant à retirer (minimum 1500 FCFA)");
  amount = parseFloat(amount);
  if(isNaN(amount) || amount < 1500) { alert("Retrait minimum 1500 FCFA"); return; }
  if(amount > user.balance) { alert("Solde insuffisant"); return; }

  const tax = amount * 0.13;
  const net = amount - tax;
  user.balance -= amount;
  localStorage.setItem('users', JSON.stringify(users));
  alert(`Retrait effectué : ${net} FCFA après 13% d'impôt`);
  showDashboard(user);
}