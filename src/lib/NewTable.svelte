<script>	
	
import { Card, CardBody, CardHeader, Input, Table, Column, Styles, Button,Label, FormGroup } from 'sveltestrap';
    import {FeedbackStore, LanguageStore} from "../stores"    
	
	let search = undefined;
  let selectedDate = ""
  let filteredDate = undefined
  let transactions = null
 
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
		<Table  rows={visibleTransactions} let:row={transaction} responsive  hover class="text-xs sm:text-lg" >
			<Column header={$LanguageStore === "TR" ? "İşlem" : "Transaction"}  >
				{transaction.text}
			</Column>
			<Column header={$LanguageStore === "TR" ? "Miktar" : "Amount"}>
				{transaction.amount}
			</Column>
			<Column header={$LanguageStore === "TR" ? "Çeşidi" : "Type"}>
				{transaction.transitionType}
			</Column>
			<Column header={$LanguageStore === "TR" ? "Tarih" : "Date"}>
				{transaction.date}
			</Column>
			<Column >
				<Button on:click={()=>handleDel(transaction.id)} size="sm" class="hover:bg-red-700" >X</Button>
			</Column>
		</Table>
	</CardBody>
</Card>