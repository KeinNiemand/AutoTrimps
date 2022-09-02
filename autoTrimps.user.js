// ==UserScript==
// @name         AutoTrimps-KeinNiemand
// @version      6.0.0.0
// @namespace    https://raw.githack.com/KeinNiemand/AutoTrimpsRay/test/AutoTrimps
// @downloadURL  https://raw.githack.com/KeinNiemand/AutoTrimpsRay/test/autoTrimps.user.js
// @updateURL    https://raw.githack.com/KeinNiemand/AutoTrimpsRay/test/autoTrimps.user.js
// @description  Automate all the trimps!
// @author       zininzinin, spindrjr, Ishkaru, genBTC, Zeker0, Psycho-Ray, livercat, KeinNiemand
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @connect      *Zorn192.github.io/AutoTrimps*
// @connect      *trimps.github.io*
// @connect      self
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var script = document.createElement('script');
script.id = 'AutoTrimps-KeinNiemand';
//This can be edited to point to your own Github Repository URL.
script.src = 'https://raw.githack.com/KeinNiemand/AutoTrimpsRay/test/AutoTrimps2.js';
//script.setAttribute('crossorigin',"use-credentials");
script.setAttribute('crossorigin',"anonymous");
document.head.appendChild(script);
