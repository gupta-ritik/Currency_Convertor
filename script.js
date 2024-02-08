const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// ⁡⁢⁢⁢𝙏𝙝𝙞𝙨 𝙞𝙨 𝙘𝙤𝙙𝙚 𝙥𝙧𝙞𝙣𝙩𝙞𝙣𝙜 𝙘𝙤𝙙𝙚 𝙤𝙛 𝙘𝙤𝙪𝙣𝙩𝙧𝙮 𝙬𝙞𝙩𝙝 𝙘𝙪𝙧𝙧𝙚𝙣𝙘𝙮 𝙘𝙤𝙙𝙚 𝙞𝙣 𝙘𝙤𝙣𝙨𝙤𝙡𝙚 𝙤𝙛 𝙩𝙝𝙚 𝙬𝙚𝙗𝙨𝙞𝙩𝙚⁡

for ( code in countryList) {
    console.log(code, countryList[code]);
}

for (let select of dropdowns){ 
    // ⁡⁢⁢⁢𝘼𝙗𝙤𝙫𝙚 𝙛𝙤𝙧 𝙡𝙤𝙤𝙥 𝙞𝙨 𝙪𝙨𝙚𝙙 𝙛𝙤𝙧 𝙙𝙧𝙤𝙥𝙙𝙤𝙬𝙣𝙨 𝙡𝙞𝙨𝙩 𝙬𝙝𝙞𝙘𝙝 𝙞𝙨 𝙘𝙖𝙡𝙡𝙚𝙙 𝙗𝙮 𝙦𝙪𝙚𝙧𝙮𝙎𝙚𝙡𝙚𝙘𝙩𝙤𝙧𝘼𝙡𝙡 ⁡
    for (currCode in countryList) {

        // ⁡⁢⁢⁢𝘽𝙚𝙡𝙤𝙬 𝙡𝙞𝙣𝙚 𝙤𝙛 𝙘𝙤𝙙𝙚 𝙞𝙨 𝙘𝙧𝙚𝙖𝙩𝙚 𝙖 𝙚𝙡𝙚𝙢𝙚𝙣𝙩 𝙡𝙞𝙨𝙩 𝙗𝙮 𝙪𝙨𝙞𝙣𝙜 𝙤𝙥𝙩𝙞𝙤𝙣 𝙏𝙖𝙜 𝙤𝙛 𝙩𝙝𝙚 𝙃𝙩𝙢𝙡 𝙘𝙤𝙙𝙚⁡ ⁡⁢⁢⁢𝗮𝗻𝗱 𝗮𝗽𝗽𝗲𝗻𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗱𝗿𝗼𝗽𝗱𝗼𝘄𝗻 𝗺𝗲𝗻𝘂⁡

        let newOption = document.createElement("option");
        newOption.innerText = currCode ;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });

}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
  
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };
  
  const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };
  
  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
  
  window.addEventListener("load", () => {
    updateExchangeRate();
  });