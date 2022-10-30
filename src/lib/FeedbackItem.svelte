
<script>
  import { FeedbackStore } from "../stores";
    import { createEventDispatcher } from "svelte";
  import Card from "./Card.svelte";
  

export let fb;



const handleDelete = (id) => {
  FeedbackStore.update((currentFeedback) => {
    return currentFeedback.filter(item => item.id != id)
  })
}

</script>


<Card transition_Type={fb.transitionType} >
    <div class="num-display">
        {fb.amount}
    </div>
    <button class="close" on:click={() => handleDelete(fb.id) } >X</button>
    <div class="text-display">
        {fb.text}
    </div>
    <div class="date-display">
      {fb.date}
  </div>
</Card>

<style>
    .num-display {
      position: absolute;
      top: 0;
      left: -10px;
      width: fit-content;
      height: fit-content;
      background: #ff6a95;
      color: #fff;
      border: 1px #eee solid;
      border-radius: 10px;
      padding: 5px;
      text-align: center;
      font-size: 14px;
    }
    .date-display {
      position: absolute;
      right: 0;
      bottom: -10px;
      width: fit-content;
      height: fit-content;
      background: #ff6a95;
      color: #fff;
      border: 1px #eee solid;
      border-radius: 10px;
      padding: 5px;
      text-align: center;
      font-size: 14px;
    }
  
    .close {
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
      background: none;
      border: none;
      background: none;
      border: none;
    }
    
  </style>