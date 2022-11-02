<script>
  
  import { FeedbackStore, LanguageStore } from '../stores';
  import { fly, fade, slide, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate'
  import FeedbackItem from "./FeedbackItem.svelte";
  import { FormGroup,Label, Input} from 'sveltestrap';
  
  let search = undefined;
	$: transactions = $FeedbackStore;
	$: visibleTransactions = search ?
		transactions.filter(transaction => {
			return transaction.text.match(`${search.toLocaleLowerCase()}.*`) || transaction.date.match(`${search.toLocaleLowerCase()}.*`)
		}) : transactions;


</script>

  
  <!-- <Input type="search"  bind:value={search}  placeholder="Search" /> -->
  <FormGroup>
    <Label>{$LanguageStore === "TR" ? "İşlem Ara" : "Search For Transactions"}</Label>
    <Input type="text" bind:value={search}  />
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