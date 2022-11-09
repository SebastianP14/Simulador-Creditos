

import { Customer } from './models.js';
import { get } from './service/customerService.js';
import { get as getCreditsAjax} from './service/creditService.js';
const tbodyCustomerList = document.getElementById("tbodyCustomerList");
const sectionCreditList = document.getElementById("creditList");
const sectionCustomerList = document.getElementById("customerList");




const  getCustomerList = async () => {
   sectionCustomerList.style.display=""
   sectionCreditList.style.display="none"
   let aux = document.getElementById("tbodyCustomerList");
   if (aux != null)
      aux.innerHTML=""
   const customers = await get()
   customers.forEach(element => {
      let creditList = document.createElement("tr")
      creditList.id = `tr${element.id}`;
      creditList.innerHTML = `
      <th scope="row">${element.dni}</th>
      <td>${element.name}</td>
      <td>${element.cantCredits}</td>
      <td><button id="btn${element.id}" value="${element.id}" class="btn btn-dark">Creditos</button></td>`
      document.getElementById("tbodyCustomerList").appendChild(creditList)

   });

}

const getCredits = async (idCustomer)=>{
   sectionCreditList.style.display=""
   sectionCustomerList.style.display="none"
   const creditList = await getCreditsAjax(idCustomer)
   let aux = document.getElementById("crediList");
   if (aux != null)
      aux.innerHTML=""
   creditList.forEach(element => {

      let creditList = document.createElement("div")
      creditList.id = "cardCredit";
      creditList.className = "card col-sm-4 col-md-4 col-lg-3 col-xl-2  m-2 p-3 "

      creditList.innerHTML = '    <h5 class="card-title">$'+element.totalToPay+'</h5>'
         + '    <h6 class="card-subtitle mb-2 text-muted">Total a pagar</h6>'
         + '    <p class="card-text mb-0">Monto desembolsado: $'+element.requestedValue+' </p>'
         + '    <p class="card-text mb-0">N° cuotas: '+element.installments+'</p>'
         + '    <p class="card-text mb-0">Valor cuota: $'+element.valueInstallments+'</p>'
         + '    <p class="card-text mb-0">Interes: '+element.interest+'% </p>'
      
         document.getElementById("crediList").appendChild(creditList)
   });

   const buttonBack = document.getElementById("buttonBack")
   buttonBack.addEventListener("click",getCustomerList)
}
getCustomerList()





tbodyCustomerList.addEventListener("click", (e) => getCredits(e.target.value));