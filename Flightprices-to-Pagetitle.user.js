// ==UserScript==
// @name        Flightprices-to-Pagetitle
// @namespace   *
// @description Scrapes flightprices of otas and pushes lowest price to page title
// @include     http*://*.skyscanner.*/transport/*
// @include     http*://*.kayak.*/flights/*
// @include     http*://*.jetcost.*/results.php*
// @include     http*://*.momondo.*/flightsearch/*
// @include     http*://*.expedia.*/Flight-SearchResults*
// @include     http*://*.ebookers.*/shop/home*type=air*
// @include     http*://*.orbitz.*/shop/home*type=air*
// @include     http*://*.cheaptickets.com/shop/home*type=air*
// @include     http*://*.lastminute.com/trips/flightlist/listInternal*
// @include     http*://*.lastminute.ie/trips/flightlist/listInternal*
// @include     http*://*.opodo.*/opodo/flights/multistopFlightsSearch*
// @include     http*://*.opodo.*/opodo/buchen/flug/gabelFlug/ergebnis-ueberblick*
// @include     http*://*.flugladen.*/checkout/flightresults*
// @include     http*://*.budgetair.*/checkout/flightresults*
// @include     http*://*.vliegwinkel.*/checkout/flightresults*
// @include     http*://*.vayama.ie/checkout/flightresults*
// @include     http*://*.bravofly.*/vg1/search/results.action*
// @include     http*://*.rumbo.*/vg1/search/results.action*
// @include     http*://*.viajar.com/vg1/search/results.action*
// @include     http*://*.bravoavia.*/vg1/search/results.action*
// @include     http*://*.volagratis.com/vg1/search/results.action*
// @include     http*://*.edreams.*/engine/ItinerarySearch/search*
// @include     http*://*.edreams.it/travel/*
// @include     http*://*.supersaver.*/*
// @include     http*://*.flybillet.dk/*
// @include     http*://*.gotogate.*/*
// @include     http*://*.supersavertravel.se/*
// @include     http*://*.tripsta.*/*/*?*arr*
// @include     http*://*.volilowcost.*/Flights/flySearch.aspx?*
// @version     0.1
// @grant       none
// ==/UserScript==

if (window.addEventListener){
window.addEventListener('load', startcript, false);
} else if (window.attachEvent)
window.attachEvent("onload", startcript);
else {
window.onload = startcript;
}

function startcript(){
    if (document.domain.indexOf("skyscanner")>0){
     setTimeout(function(){skyscanner();}, 1000); 
    } else if (document.domain.indexOf("kayak")>0){
     setTimeout(function(){kayak();}, 1000); 
    } else if (document.domain.indexOf("jetcost")>0){
     setTimeout(function(){jetcost();}, 1000); 
    } else if (document.domain.indexOf("momondo")>0){
     setTimeout(function(){momondo();}, 1000); 
    } else if (document.domain.indexOf("expedia")>0){
     setTimeout(function(){expedia();}, 1000); 
    } else if (document.domain.indexOf("ebookers")>0||document.domain.indexOf("orbitz")>0||document.domain.indexOf("cheaptickets.com")>0){
     setTimeout(function(){ebookers();}, 1000); 
    } else if (document.domain.indexOf("lastminute.com")>0||document.domain.indexOf("lastminute.ie")>0){
     setTimeout(function(){lastminute();}, 1000); 
    } else if (document.domain.indexOf("opodo")>0){
     setTimeout(function(){opodo();}, 1000); 
    } else if (document.domain.indexOf("flugladen")>0||document.domain.indexOf("budgetair")>0||document.domain.indexOf("vliegwinkel")>0||document.domain.indexOf("vayama.ie")>0){
     setTimeout(function(){budgetair();}, 1000); 
    } else if (document.domain.indexOf("bravofly")>0||document.domain.indexOf("bravoavia")>0||document.domain.indexOf("volagratis.com")>0||document.domain.indexOf("rumbo")>0||document.domain.indexOf("viajar.com")>0){
     setTimeout(function(){bravofly();}, 1000); 
    } else if (document.domain.indexOf("edreams.it")>0){
     setTimeout(function(){edreamsit();}, 1000); 
    } else if (document.domain.indexOf("edreams")>0){
     setTimeout(function(){edreams();}, 1000); 
    } else if (document.domain.indexOf("supersaver")>0||document.domain.indexOf("flybillet.dk")>0||document.domain.indexOf("gotogate")>0||document.domain.indexOf("supersavertravel.se")>0){
     setTimeout(function(){gotogate();}, 1000); 
    } else if (document.domain.indexOf("tripsta")>0){
     setTimeout(function(){tripsta();}, 1000); 
    } else if (document.domain.indexOf("volilowcost")>0){
     setTimeout(function(){volilowcost();}, 1000); 
    }
}

function skyscanner(){
  target = findtarget("results_price",1);
  if (target == null || target== undefined) {
    target = findtarget("mainquote-price",1);
    if (target == null || target== undefined) {
      setTimeout(function(){skyscanner();}, 1000);  
      return false;
    }
  }
  target = target.innerHTML;
  document.title=target+"|"+document.domain.replace(".skyscanner.","").replace("www","")+"...";
  target=findtarget('day-progress-bar',1).parentNode;
  if (hasClass(target,'hidden')){
  console.log("done");
  document.title=document.title.replace("...","");
  return false;
  } else {
  setTimeout(function(){skyscanner();}, 1000); 
  } 
}
function kayak(){
  target = findtarget("results_price",1);
  if (target == null || target== undefined) {
    setTimeout(function(){kayak();}, 1000);  
    return false;
  } else {
    target = target.innerHTML;
  }   
  document.title=target.replace("&nbsp;"," ")+"|"+document.domain.replace(".kayak.","").replace("www","")+"...";
  target=document.getElementById("progressDiv");
  if (target.innerHTML=="" || target.style.display=="none"){
    console.log("done");
    document.title=document.title.replace("...","");
  return false;
  } else {
  setTimeout(function(){kayak();}, 1000); 
  } 
} 

function jetcost(){
  target = findtarget("price",1).innerHTML; 
  document.title=target.replace("<!--STAR-->","")+"|"+document.domain.replace(".jetcost.","").replace("www","")+"...";
  target=document.getElementById("state").style.display;
  if (target=="none"){
  console.log("done");
  document.title=document.title.replace("...","");
  return false;
  } else {
  setTimeout(function(){jetcost();}, 1000); 
  } 
} 

function momondo(){
  target = findtarget("prices",1);
  if (target == null || target== undefined) {
    setTimeout(function(){momondo();}, 1000);  
    return false;
  } else {
    target = target.childNodes[1].firstChild.childNodes[0].innerHTML + " " + target.childNodes[1].firstChild.childNodes[2].innerHTML;
  }   
  document.title=target+"|"+document.domain.replace(".momondo.","").replace("www","")+"..."; 
  target=document.getElementById("flight-results");
  if (target == null || target== undefined) {
    setTimeout(function(){kayak();}, 1000);  
    return false;
  }  
  if (hasClass(target,"search-completed")){
    console.log("done");
    document.title=document.title.replace("...","");
  return false;
  } else {
  setTimeout(function(){momondo();}, 1000); 
  } 
}
function volilowcost(){  
  if (findtarget("priceBig",2) != null && findtarget("priceBig",2) != undefined){
    if (Number(findtarget("priceBig",1).innerHTML)>Number(findtarget("priceBig",2).innerHTML)){
    target=findtarget("priceBig",2).innerHTML;
    } else {
      target=findtarget("priceBig",1).innerHTML;
    }
    document.title=target+"|"+document.domain.replace(".volilowcost.","").replace("www","")+"..."; 
  }
  target=document.getElementById("RefineSearch");
  if (target == null || target== undefined) {
    setTimeout(function(){volilowcost();}, 1000);  
    return false;
  }  
  if (target.style.display!="none"){
    console.log("done");
    document.title=document.title.replace("...","");
    return false;
  } else {
    setTimeout(function(){volilowcost();}, 1000); 
  }  
}

function expedia(){
  target = findtarget("priceDisplayingVariationOff",1);
  if (target == null || target== undefined) {
    setTimeout(function(){expedia();}, 1000);  
    return false;
  } else {
    target = target.innerHTML;
  }  
  document.title=target+"|"+document.domain.replace(".expedia.","").replace("www",""); 
  console.log("done");
}
function ebookers(){
  target = findtarget("money",1);
  if (target == null || target== undefined) {
    setTimeout(function(){ebookers();}, 1000);  
    return false;
  } else {
    target = target.innerHTML.replace(/<[^>]+>/g,"");
  }  
  document.title=target+"|"+document.domain.replace(".ebookers.","").replace(".orbitz.","").replace(".cheaptickets.","").replace("www",""); 
  console.log("done");
}
function lastminute(){
  target = findtarget("product-price",1);
  if (target == null || target== undefined) {
    setTimeout(function(){lastminute();}, 1000);  
    return false;
  } else {
    target = target.childNodes[1].childNodes[3].childNodes[1].innerHTML;
  }  
  document.title=target+"|"+document.domain.replace(".lastminute.","").replace("www",""); 
  console.log("done");
}
function opodo(){
  target = findtarget("price",1);
  if (target == null || target== undefined) {
    setTimeout(function(){opodo();}, 1000);  
    return false;
  } else {
    target = target.innerHTML.replace(/[\s]{2,100}/g,"");
  }  
  document.title=target+"|"+document.domain.replace(".opodo.","").replace("www",""); 
  console.log("done");
}

function budgetair(){
  target = findtarget("frame-loading",1);
  if (target == null || target== undefined) {
    setTimeout(function(){budgetair();}, 1000);  
    return false;
  } else {
      if (target.style.display=="block") {
      setTimeout(function(){budgetair();}, 1000);  
      return false;    
    } else {
      target = findtarget("total_price_container",1);
      target = target.innerHTML.replace(/[\s]{2,100}/g,"").replace(/<[^>]+>/g,"");
    }
  }  
  document.title=target+"|"+document.domain.replace(".flugladen.","").replace(".budgetair.","").replace(".vayama.","").replace(".vliegwinkel.","").replace("www",""); 
  console.log("done");
}

function bravofly(){
  target = findtarget("price",1);
  if (target == null || target== undefined) {
    setTimeout(function(){bravofly();}, 1000);  
    return false;
  } else {
    target = target.innerHTML.replace("&nbsp;","");
  }  
  document.title=target+"|"+document.domain.replace(".bravofly.","").replace(".bravoavia.","").replace(".volagratis.","").replace(".rumbo.","").replace(".viajar.","").replace("www","").replace("flug","").replace("flights","").replace("voli","").replace("vuelos","").replace("vol",""); 
  console.log("done");
}

function edreams(){
  target = findtarget("singleItinerayPrice",1);
  if (target == null || target== undefined) {
    setTimeout(function(){edreams();}, 1000);  
    return false;
  } else {
    target = target.innerHTML.replace(/<[^>]+>/g,"").replace(" *","");
  }  
  document.title=target+"|"+document.domain.replace(".edreams.","").replace("www",""); 
  console.log("done");
}
function edreamsit(){
  target = findtarget("od-resultpage-price-text-coin",1);
  if (target == null || target== undefined) {
    setTimeout(function(){edreamsit();}, 1000);  
    return false;
  } else {
    target = target.innerHTML.replace(/<[^>]+>/g,"").replace(" *","");
  }  
  document.title=target+"|"+document.domain.replace(".edreams.","").replace("www",""); 
  console.log("done");
}

function gotogate(){
  target = findtarget("tripItemPricePerPersonValue",1);
  if (target == null || target== undefined) {
    setTimeout(function(){gotogate();}, 1000);  
    return false;
  } else {
    target = target.innerHTML.replace(/\s+/g,"").replace("&nbsp;","");
  }  
  document.title=target+"|"+document.domain.replace(".gotogate.","").replace(".supersavertravel.","").replace(".flybillet.","").replace(".supersaver.","").replace("www",""); 
  console.log("done");
}
function tripsta(){
  target = findtarget("amount",1);
  if (target == null || target== undefined) {
    setTimeout(function(){tripsta();}, 1000);  
    return false;
  } else {
    target =target.innerHTML.replace(/&nbsp;/g,"").replace(/<[^>]+>/g,"");
  }  
  document.title=target+"|"+document.domain.replace(".tripsta.","").replace("www",""); 
  console.log("done");
}

function findtarget(tclass,nth){
  var elems = document.getElementsByTagName('*'), i;
  j=0;
  for (i in elems) {
       if((' ' + elems[i].className + ' ').indexOf(' '+tclass+' ') > -1) {
        j++;
        if (j==nth){
         return elems[i];
         break;
        }
       }
   }
}
function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
