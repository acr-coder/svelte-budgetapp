<script>
  import { LanguageStore } from "../stores";
  import { useNavigate } from "svelte-navigator";
  import { FeedbackStore } from "../stores";
  import { createEventDispatcher } from "svelte";
  import { fly, fade, slide, scale } from 'svelte/transition';
  import Button from "./Button.svelte";
  import FormCard from "./FormCard.svelte";
  import RatingSelect from "./RatingSelect.svelte";
  import TransitionSelect from "./TransitionSelect.svelte";
  

  let text = ''
  let transitionType = "Income"
  let btnDisabled = true
  let min = 3;
  let max = 20;
  let message;
  let amount;
  let date;

  const navigate = useNavigate()

  const handleSelect = e => transitionType = e.detail 

  

  const handleSubmit = () => {
    if(text.trim().length > min && text.trim().length < max  ){
      const newTransition = {
        id:Date.now(),
        text,
        amount: amount,
        transitionType,
        date
      }
      console.log(newTransition);
      FeedbackStore.update((currentTransition) => {
        return [newTransition, ...currentTransition]
      })

      //$FeedbackStore = [newFeedback, ...$FeedbackStore]
      

      text = ''
      amount = ''
      date=''

      navigate('/all-transitions')
    }else{
      message=`Text must be between ${min} and ${max} characters. `
    }

  }


    

</script>

<FormCard>
    <header >
      <h2> {$LanguageStore === "TR" ? "İşlem Tipini Seçiniz" : "Choose your transition type?"} </h2>
    </header>
  <form on:submit|preventDefault = {handleSubmit} >
    
    <TransitionSelect  on:transition-select={handleSelect} />
    <div class="input-group">
      <input type="text" on:input={message = null}  bind:value={text} placeholder={ $LanguageStore === "TR" ? "İşlem adı" : "Transition name..."}>
      
    </div>
    <div class="input-group">
      <input type="number" required bind:value={amount} placeholder={ $LanguageStore === "TR" ? "İşlem miktarı..." : "Amount"} >
      
    </div>
    <div class="input-group">
      <input type="date" required bind:value={date} placeholder="Transition date...">
      
    </div>
    <div class="btn-group">
      <Button  type="submit">{$LanguageStore === "TR" ? "Ekle" : "Add"}</Button>
    </div>
      
    
    {#if message}
        <div in:scale out:scale class="message">
            {message}
    </div>
    {/if}
    
    
  </form>
  </FormCard>

<style>
    header {
      max-width: 400px;
      margin: auto;
    }
  
    header h2 {
      font-size: 22px;
      font-weight: 600;
      text-align: center;
    }
  
    .input-group {
      display: flex;
      flex-direction: row;
      border: 1px solid #ccc;
      padding: 8px 10px;
      border-radius: 8px;
      margin-top: 15px;
    }
  
    input {
      flex-grow: 2;
      border: none;
      font-size: 16px;
    }
  
    input:focus {
      outline: none;
    }
  
    .message{
      padding-top: 10px;
      text-align: center;
      color: rebeccapurple;
    }

    .btn-group{
      padding: 5px;
      display: flex;
      justify-content: center;
    }

    @media only screen and (max-width: 600px) {
      input{
        font-size: 12px;
      }
    }
  
  
  </style>