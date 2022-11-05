<script>	
	
import { Card, CardBody, CardHeader, Input, Table, Column, Styles, Button,Label, FormGroup } from 'sveltestrap';
    import {FeedbackStore, LanguageStore} from "../stores"    
    import MdDeleteForever from 'svelte-icons/md/MdDeleteForever.svelte'
  import FaEdit from 'svelte-icons/fa/FaEdit.svelte'
  import FaCheck from 'svelte-icons/fa/FaCheck.svelte'
  import { each } from 'svelte/internal';
	
	let search = undefined;
  let selectedDate = ""
  let filteredDate = undefined
  let transactions = null
  let isEdit = false;
let amount;
let text= '';
let date;
let transactionType;
let min = 3;
  let max = 20;
  let messageEN;
  let messageTR;
  
 
  $: transactions = $FeedbackStore

 $:if(selectedDate === "All desc"){
 
  transactions = $FeedbackStore.sort(function(a, b){return a.date.replaceAll("-","") - b.date.replaceAll("-","")})
  
 }else if(selectedDate === "All asc"){
  transactions = $FeedbackStore.sort(function(a, b){return b.date.replaceAll("-","") - a.date.replaceAll("-","")})
 } else if(selectedDate === "Last Week desc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-76).sort(function(a, b){return a.date.replaceAll("-","") - b.date.replaceAll("-","")})
  
  
 } else if(selectedDate === "Last Week asc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-76).sort(function(a, b){return b.date.replaceAll("-","") - a.date.replaceAll("-","")})
   
 }else if(selectedDate === "Last Month desc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-100).sort(function(a, b){return a.date.replaceAll("-","") - b.date.replaceAll("-","")})
 }else if(selectedDate === "Last Month asc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-100).sort(function(a, b){return b.date.replaceAll("-","") - a.date.replaceAll("-","")})
 
 }else if(selectedDate === "Last 3 Months desc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-300).sort(function(a, b){return a.date.replaceAll("-","") - b.date.replaceAll("-","")})
 }else if(selectedDate === "Last 3 Months asc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-300).sort(function(a, b){return b.date.replaceAll("-","") - a.date.replaceAll("-","")})
 
 }else if(selectedDate === "Last 6 Months desc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-600).sort(function(a, b){return a.date.replaceAll("-","") - b.date.replaceAll("-","")})
 }else if(selectedDate === "Last 6 Months asc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-600).sort(function(a, b){return b.date.replaceAll("-","") - a.date.replaceAll("-","")})
 
 }else if(selectedDate === "Last Year desc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-10000).sort(function(a, b){return a.date.replaceAll("-","") - b.date.replaceAll("-","")})
 }else if(selectedDate === "Last Year asc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-10000).sort(function(a, b){return b.date.replaceAll("-","") - a.date.replaceAll("-","")})
 }
 
 
	//$: transactions = $FeedbackStore.sort(function(a, b){return a.date.replaceAll("-","") - b.date.replaceAll("-","")})
	
  
  
  


	$: visibleTransactions = search ?
		transactions.filter(transaction => {
			return transaction.text.match(`${search.toLocaleLowerCase()}.*`) || transaction.date.match(`${search.toLocaleLowerCase()}.*`)
		}) : transactions;


     const handleDel = (id) => {
		$FeedbackStore = $FeedbackStore.filter((item) => item.id != id)
	 }    

   const updateTransaction = (transaction) => {
  if(text.trim().length > min && text.trim().length < max  ){
      const updatedTransition = {
        id:Date.now(),
        text:text.toLocaleLowerCase(),
        amount: amount,
        transitionType:transaction.transitionType,
        date
      }

      $FeedbackStore = $FeedbackStore.filter((item)=>item.id != transaction.id )      

      $FeedbackStore = [updatedTransition, ...$FeedbackStore]

      isEdit=false
      

      text = ''
      amount = ''
      date=''
       
    }else{
      messageEN=`Text must be between ${min} and ${max} characters. `
      messageTR=`Lütfen ${min} ile ${max} karakter arasında bir değer giriniz. `
    }
}

   
	
</script>
<svelte:head>
    <title>{$LanguageStore === "TR" ? "Tüm İşlemler " : "All Transactions"}</title>
  </svelte:head>



<Card>
	<CardHeader>
		<FormGroup>
			<Input type="search" bind:value={search} class="ms-auto w-auto" placeholder="Search" />
		<Label class="text-blue-900" for="exampleSelect">{$LanguageStore === "TR" ? "Filtrele" : "Filter"}</Label>
    <Input class="w-1/3" type="select" name="select" id="exampleSelect" bind:value={selectedDate}  >
      <option value="All desc" >{$LanguageStore === "TR" ? "Tüm Zamanlar (İlk Tarihe Göre)" : "All Time (By First Date)"}</option>
      <option value="All asc" >{$LanguageStore === "TR" ? "Tüm Zamanlar (Son Tarihe Göre)" : "All Time (By Last Date)"}</option>
      <option value="Last Year desc" >{$LanguageStore === "TR" ? "Son 1 Yıl (İlk Tarihe Göre)" : "Last Year (By First Date)"}</option>
      <option value="Last Year asc" >{$LanguageStore === "TR" ? "Son 1 Yıl (Son Tarihe Göre)" : "Last Year (By Last Date)"}</option>
      <option value="Last 6 Months desc" >{$LanguageStore === "TR" ? "Son 6 Ay (İlk Tarihe Göre)" : "Last 6 Months (By First Date)"}</option>
      <option value="Last 6 Months asc" >{$LanguageStore === "TR" ? "Son 6 Ay (Son Tarihe Göre)" : "Last 6 Months (By Last Date)"}</option>
      <option value="Last 3 Months desc" >{$LanguageStore === "TR" ? "Son 3 Ay (İlk Tarihe Göre)" : "Last 3 Months (By First Date)"}</option>
      <option value="Last 3 Months asc" >{$LanguageStore === "TR" ? "Son 3 Ay (Son Tarihe Göre)" : "Last 3 Months (By Last Date)"}</option>
      <option value="Last Month desc" >{$LanguageStore === "TR" ? "Son 1 Ay (İlk Tarihe Göre)" : "Last Month (By First Date)"}</option>
      <option value="Last Month asc" >{$LanguageStore === "TR" ? "Son 1 Ay (Son Tarihe Göre)" : "Last Month (By Last Date)"}</option>
      <option value="Last Week desc" >{$LanguageStore === "TR" ? "Son 1 Hafta (İlk Tarihe Göre)" : "Last Week (By First Date)"}</option>
      <option value="Last Week asc" >{$LanguageStore === "TR" ? "Son 1 Hafta (Son Tarihe Göre)" : "Last Week (By Last Date)"}</option>
      
    </Input>
		</FormGroup>
		
	</CardHeader>
	<CardBody>
		<Table  responsive  hover class="text-xs sm:text-lg" >
      <thead>
        <tr>
          <th>{$LanguageStore === "TR" ? "İşlem" : "Transaction"} </th>
        <th>{$LanguageStore === "TR" ? "Miktar" : "Amount"} </th>
        <th>{$LanguageStore === "TR" ? "Çeşidi" : "Type"} </th>
        <th>{$LanguageStore === "TR" ? "Tarih" : "Date"}</th>
        </tr>
        
      </thead>
      <tbody>
        {#each visibleTransactions as vT (vT.id) }

        {#if !isEdit}
        <tr>
          <td>{vT.text}</td>
      <td>{vT.amount}</td>
      <td>{vT.transitionType}</td>
      <td>{vT.date}</td>
      <td><Button on:click={()=> isEdit = !isEdit}  class="hover:bg-red-700 w-8 sm:w-12" ><FaEdit/></Button></td>
      <td><Button on:click={()=>handleDel(vT.id)}  class="hover:bg-red-700 w-8 sm:w-12" ><MdDeleteForever/></Button></td>
        </tr>
          {:else}
          <tr>
            <td>
              <input type="number" bind:value={text}   />              
            </td>
            
            <td>
              <input type="number" bind:value={amount}   />              
            </td>
            
            <td>
              <input type="number" bind:value={transactionType}   />              
            </td>
            
            <td>
              <input type="number" bind:value={date}   />              
            </td>
            <td><Button  class="hover:green-red-700 w-8 sm:w-12" ><FaCheck/></Button></td>
            <td><Button on:click={()=>handleDel(vT.id)}  class="hover:bg-red-700 w-8 sm:w-12" ><MdDeleteForever/></Button></td>

            
          </tr>
        {/if}
        
      
    {/each}
      </tbody>
    
      
			
				
				
			
      
			
		</Table>
	</CardBody>
</Card>

<style>
  input[type="text"]{
    width: 50%;
  }
  input[type="number"]{
    width: 50%;
  }
</style>