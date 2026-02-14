let users = [];
let currentUser = null;
let balance = 0;

function showLoginForm(){ document.getElementById('signup-form').style.display='none'; document.getElementById('login-form').style.display='block'; }
function showSignupForm(){ document.getElementById('signup-form').style.display='block'; document.getElementById('login-form').style.display='none'; }
function showDashboardSection(section){ 
  document.getElementById('home-section').style.display='none';
  document.getElementById('plan-section').style.display='none';
  document.getElementById('menu-section').style.display='none';
  document.getElementById(section+'-section').style.display='block';
}

function signup(){
  let email=document.getElementById('email').value;
  let password=document.getElementById('password').value;
  if(!email||!password){ alert('Veuillez remplir tous les champs'); return; }
  users.push({email,password,balance:1500}); currentUser=email; balance=1500;
  alert('Compte créé avec succès, bonus 1 500 FCFA ajouté'); showDashboardSection('home'); document.getElementById('balance').innerText=balance;
}

function login(){
  let email=document.getElementById('login-email').value;
  let password=document.getElementById('login-password').value;
  let user=users.find(u=>u.email===email && u.password===password);
  if(!user){ alert('Email ou mot de passe incorrect'); return; }
  currentUser=email; balance=user.balance; showDashboardSection('home'); document.getElementById('balance').innerText=balance;
}

function investPlan(amount){ 
  if(balance<amount){ alert('Votre solde est insuffisant, veuillez recharger'); return; }
  balance-=amount; document.getElementById('balance').innerText=balance; alert('Investissement effectué !'); 
}

function generateRechargeCode(){ 
  let amount=parseInt(document.getElementById('recharge-amount').value);
  if(amount<2000){ alert('Dépôt minimum 2 000 FCFA'); return; }
  document.getElementById('recharge-code-section').style.display='block';
  document.getElementById('recharge-code').innerText=Math.floor(Math.random()*900000+100000);
}

function confirmRecharge(){ 
  let amount=parseInt(document.getElementById('recharge-amount').value);
  balance+=amount; document.getElementById('balance').innerText=balance; alert('Paiement validé ! Solde mis à jour automatiquement');
}

function withdrawFromMenu(){ 
  let amount=parseInt(document.getElementById('withdraw-amount').value);
  if(amount<1500){ alert('Retrait minimum 1 500 FCFA'); return; }
  if(amount>500000){ alert('Retrait maximum 500 000 FCFA'); return; }
  balance-=amount; document.getElementById('balance').innerText=balance; alert('Retrait effectué ! Taxes 15% appliquées. Solde mis à jour automatiquement.');
}