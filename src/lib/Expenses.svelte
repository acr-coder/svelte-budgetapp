<script>
  
    import { FeedbackStore,LanguageStore } from '../stores';
    import { fly, fade, slide, scale } from 'svelte/transition';
    import { flip } from 'svelte/animate'
    import FeedbackItem from "./FeedbackItem.svelte";
  
    
  
  $: expenseList = $FeedbackStore.filter((item)=> item.transitionType === "Expense")
  
  </script>
  <svelte:head>
    <title>{$LanguageStore === "TR" ? "Harcamalar" : "Expenses"}</title>
  </svelte:head>
  
  {#each expenseList as fb (fb.id) }
  <div class="expense-list"  in:fade out:scale|local={{duration:1000}} animate:flip={{duration: 1000}}  >
    
    <FeedbackItem {fb} />
  </div>
      
  {/each}
  
  <style>
    @media screen and (min-width: 600px) {
  .expense-list{
    margin: auto;
  }
}
  </style>