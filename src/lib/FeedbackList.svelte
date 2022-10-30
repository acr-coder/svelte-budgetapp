<script>
  
  import { FeedbackStore } from '../stores';
  import { fly, fade, slide, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate'
  import FeedbackItem from "./FeedbackItem.svelte";

  



</script>

{#each $FeedbackStore as fb (fb.id) }
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