<script>
  
    import { FeedbackStore } from '../stores';
    import { fly, fade, slide, scale } from 'svelte/transition';
    import { flip } from 'svelte/animate'
    import FeedbackItem from "./FeedbackItem.svelte";
  
    
  
  $: investmentList = $FeedbackStore.filter((item)=> item.transitionType === "Investment")
  
  </script>
  
  {#each investmentList as fb (fb.id) }
  <div  in:fade out:scale|local={{duration:1000}} animate:flip={{duration: 1000}}  >
    
    <FeedbackItem {fb} />
  </div>
      
  {/each}
  
  <style>
    
  </style>