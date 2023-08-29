const  loadData = async (searchText='13',IsShowAll) => {
    
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json()
    const phones = data.data
    
    showData(phones,IsShowAll)
    
}




const showData = (data,IsShowAll) => {
    const PhoneContainer = document.getElementById("Phone-container")
    PhoneContainer.textContent = ''
  
    const ShowContainer = document.getElementById("Show-btn-container")
    if(data.length > 12 && !IsShowAll){
      ShowContainer.classList.remove('hidden')
    }else{
      ShowContainer.classList.add('hidden')
    }
    
    if(!IsShowAll){
      data=data.slice(0,12)

    }
   
  data.forEach(phone => {
       const div = document.createElement("div");
       div.classList=`card w-9/12 mx-auto bg-base-100 shadow-xl`
       div.innerHTML= `
       <figure><img src="${phone.image}" /></figure>
       <div class="card-body">
         <h2 class="card-title">${phone.phone_name}</h2>
         <p>If a dog chews shoes whose shoes does he choose?</p>
         <div class="card-actions justify-end">
           <button onclick="ShowDetails('${phone.slug}')"; class="btn btn-primary">Details</button>
         </div>
       </div> 
       `
     PhoneContainer.appendChild(div)
   });
   SipperLoading(false)
}




const forSearch = (IsShowAll) => {
      const input = document.getElementById('input-search');
      const searchName = input.value;
      loadData(searchName,IsShowAll)
      SipperLoading(true)
      
}





const SipperLoading = (IsLoading) =>{
  const Spinner =  document.getElementById("spinner-container")
   if(IsLoading){
    Spinner.classList.remove('hidden')
   }else{
    Spinner.classList.add('hidden')
   }
}


const ShowAllPhone =()=>{
  forSearch(true)
}


const ShowDetails =async (id) =>{
   console.log(id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data =await res.json()
  const details = data.data
  
  ShowPhoneDetails(details)

}

const ShowPhoneDetails = (phone) => {
  my_modal_1.showModal()
  
  const DetailsOfPhone= document.getElementById("details-container");
  const div = document.createElement("div")
  div.innerHTML=`
                 <img src="${phone.image}">
                 <h3 class="font-bold text-lg">${phone.name}</h3>
                 <p>${phone.mainFeatures.storage}<p/>
                 <p>${phone.mainFeatures.memory}<p/>
               
                
  `
  DetailsOfPhone.textContent=''
DetailsOfPhone.appendChild(div)
}
loadData()