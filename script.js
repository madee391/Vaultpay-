// Your Deriv App ID
const app_id = 93522;
const websocket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

// Currency conversion rates (KSH values are approximate)
const usd_to_ksh = 128; 
const gbp_to_ksh = 164; 

// Elements
const balanceUSD = document.getElementById('balance-usd');
const balanceGBP = document.getElementById('balance-gbp');
const balanceKSH = document.getElementById('balance-ksh');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const whatsappBtn = document.getElementById('whatsapp-btn');

// Connect to Deriv and get balance
function getBalance() {
    websocket.send(JSON.stringify({
        "authorize": "YOUR_API_TOKEN" // Replace with real Deriv API token
    }));

    websocket.onmessage = function(msg) {
        const data = JSON.parse(msg.data);

        if (data.msg_type === "authorize") {
            websocket.send(JSON.stringify({ "balance": 1 }));
        }

        if (data.msg_type === "balance") {
            let usd = data.balance.balance;
            let gbp = (usd * 0.78).toFixed(2); 
            let ksh = (usd * usd_to_ksh).toFixed(2);

            balanceUSD.innerText = `$${usd}`;
            balanceGBP.innerText = `£${gbp}`;
            balanceKSH.innerText = `KSh ${ksh}`;
        }
    };
}

// Deposit function
depositBtn.addEventListener('click', () => {
    alert("Redirecting to deposit page...");
    window.location.href = "https://wa.me/254758419976?text=I%20want%20to%20deposit";
});

// Withdraw function
withdrawBtn.addEventListener('click', () => {
    alert("Redirecting to withdrawal page...");
    window.location.href = "https://wa.me/254758419976?text=I%20want%20to%20withdraw";
});

// WhatsApp contact
whatsappBtn.addEventListener('click', () => {
    window.location.href = "https://wa.me/254758419976";
});

// Run on start
getBalance();
