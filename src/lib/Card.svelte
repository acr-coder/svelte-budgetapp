<script>
  import { fly, fade, slide, scale } from "svelte/transition";

  export let transition_Type;
</script>

<div
  class="card"
  class:inv={transition_Type === "Investment"}
  class:exp={transition_Type === "Expense"}
  class:inc={transition_Type === "Income"}
>
  <slot />
</div>

<style>
  .card {
    width: 200px;
    
    background-color: #fff;
    color: rgb(14, 1, 1);
    border-radius: 15px;
    padding: 40px 20px;
    margin: 20px 10px;
    position: relative;
  }
  .inv {
    border-left: 10px solid yellow;
    border-bottom: 10px solid yellow;
  }
  .exp {
    border-left: 10px solid rgb(241, 108, 59);
    border-bottom: 10px solid rgb(241, 108, 59);
  }
  .inc {
    border-left: 10px solid rgb(229, 13, 236);
    border-bottom: 10px solid rgb(229, 13, 236);
  }
  @media only screen and (max-width: 600px) {
      .card{
        width: 90%;
        margin: 10px auto;
      }
    }
</style>
