<script>	
	
import { Card, CardBody, CardHeader, Input, Table, Column, Styles, Button } from 'sveltestrap';
    import {FeedbackStore, LanguageStore} from "../stores"    
	
	let search = undefined;
	$: transactions = $FeedbackStore;
	$: visibleTransactions = search ?
		transactions.filter(transaction => {
			return transaction.text.match(`${search.toLocaleLowerCase()}.*`) || transaction.date.match(`${search.toLocaleLowerCase()}.*`)
		}) : transactions;

     const handleDel = (id) => {
		$FeedbackStore = $FeedbackStore.filter((item) => item.id != id)
	 }    
       
	
</script>



<Card>
	<CardHeader>
		<Input type="search" bind:value={search} class="ms-auto w-auto" placeholder="Search" />
	</CardHeader>
	<CardBody>
		<Table rows={visibleTransactions} let:row={transaction} hover responsive >
			<Column header={$LanguageStore === "TR" ? "İşlem Adı" : "Transaction Name"}>
				{transaction.text}
			</Column>
			<Column header={$LanguageStore === "TR" ? "İşlem Miktarı" : "Amount"}>
				{transaction.amount}
			</Column>
			<Column header={$LanguageStore === "TR" ? "İşlem Çeşidi" : "Transaction Type"}>
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