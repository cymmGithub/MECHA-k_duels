import { alertMsgNegative } from "./utils/alert.js";

const duelLink = document.querySelector('.duel_link');

duelLink.addEventListener('click', async ()=>{

    const res = await fetch('/duel')
    

    if(res.status === 400) {
        const data = await res.json();
        alertMsgNegative(data)
        return;
    }
    window.location.href = '/duel';



})