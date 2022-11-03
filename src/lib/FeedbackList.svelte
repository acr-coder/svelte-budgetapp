<script>
  
  import { FeedbackStore, LanguageStore } from '../stores';
  import { fly, fade, slide, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate'
  import FeedbackItem from "./FeedbackItem.svelte";
  import { FormGroup,Label, Input} from 'sveltestrap';

   //console.log($FeedbackStore[0].date.replaceAll("-",""));
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
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-1000).sort(function(a, b){return a.date.replaceAll("-","") - b.date.replaceAll("-","")})
 }else if(selectedDate === "Last Year asc"){
  filteredDate = new Date().toISOString().slice(0,10).replaceAll("-","") 
  transactions = $FeedbackStore.filter((item)=>item.date.replaceAll("-","") > filteredDate-1000).sort(function(a, b){return b.date.replaceAll("-","") - a.date.replaceAll("-","")})
 }
 
 
	//$: transactions = $FeedbackStore.sort(function(a, b){return a.date.replaceAll("-","") - b.date.replaceAll("-","")})
	
  
  
  


	$: visibleTransactions = search ?
		transactions.filter(transaction => {
			return transaction.text.match(`${search.toLocaleLowerCase()}.*`) || transaction.date.match(`${search.toLocaleLowerCase()}.*`)
		}) : transactions;

   

   
</script>

  
  <!-- <Input type="search"  bind:value={search}  placeholder="Search" /> -->
  <FormGroup>
    <Label>{$LanguageStore === "TR" ? "İşlem Ara" : "Search For Transactions"}</Label>
    <Input type="text" bind:value={search}  />
    <Label for="exampleSelect">Select</Label>
    <Input type="select" name="select" id="exampleSelect" bind:value={selectedDate}  >
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

  {#each visibleTransactions as fb (fb.id) }

<div class="itemList"  in:fade out:scale|local={{duration:1000}} animate:flip={{duration: 1000}}  >
  
  <FeedbackItem {fb} />
</div>
    
{/each}





  


<style>
  @media screen and (min-width: 600px) {
  .itemList{
    margin: auto;
  }
}
</style>