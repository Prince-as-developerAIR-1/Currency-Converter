const list={
    "USD":"🇺🇸 USD",
    "EUR":"🇪🇺 EUR",
    "INR":"🇮🇳 INR",
    "GBP":"🇬🇧 GBP",
    "JPY":"🇯🇵 JPY",
    "AUD":"🇦🇺 AUD",
    "CAD":"🇨🇦 CAD",
    "CNY":"🇨🇳 CNY",
    "AED":"🇦🇪 AED",
    "SAR":"🇸🇦 SAR",
    "SGD":"🇸🇬 SGD",
    "NZD":"🇳🇿 NZD",
    "PKR":"🇵🇰 PKR",
    "BDT":"🇧🇩 BDT",
    "NPR":"🇳🇵 NPR",
    "RUB":"🇷🇺 RUB",
    "TRY":"🇹🇷 TRY",
    "THB":"🇹🇭 THB",
    "MYR":"🇲🇾 MYR",
    "IDR":"🇮🇩 IDR",
    "PHP":"🇵🇭 PHP",
    "KRW":"🇰🇷 KRW",
    "ZAR":"🇿🇦 ZAR",
    "BRL":"🇧🇷 BRL",
    "CHF":"🇨🇭 CHF",
    "SEK":"🇸🇪 SEK",
    "HKD":"🇭🇰 HKD",
    "MXN":"🇲🇽 MXN"
};

const from=document.getElementById('from'),to=document.getElementById('to'),amt=document.getElementById('amount'),res=document.getElementById('result');
for(let c in list){let o1=document.createElement('option');o1.value=c;o1.textContent=list[c];let o2=o1.cloneNode(true);from.appendChild(o1);to.appendChild(o2);}
from.value="USD";to.value="INR";
async function convert(){
 let v=parseFloat(amt.value);
 if(!v || v<=0){
   res.innerHTML=`<div class="main">Enter valid amount</div><div class="sub">Amount must be > 0</div>`;
   return;
 }

 res.innerHTML=`<div class="main">Converting...</div><div class="sub">Fetching live rates</div>`;
 try{
  let r=await fetch(`https://open.er-api.com/v6/latest/${from.value}`);let d=await r.json();let rate=d.rates[to.value];
  res.innerHTML=`<div class="main">${v} ${from.value} = ${(v*rate).toFixed(2)} ${to.value}</div><div class="sub">1 ${from.value} = ${rate.toFixed(4)} ${to.value}</div>`;
 }catch{res.innerHTML=`<div class="main">Offline</div><div class="sub">Check internet connection</div>`;}
}

document.getElementById('convertBtn').addEventListener('click',convert);
document.getElementById('swapBtn').addEventListener('click',()=>{let t=from.value;from.value=to.value;to.value=t;convert();});

amt.addEventListener('input',convert);
from.addEventListener('change',convert);
to.addEventListener('change',convert);
window.addEventListener('load',convert);