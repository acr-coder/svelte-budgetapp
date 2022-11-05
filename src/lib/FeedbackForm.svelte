<script>
  import { LanguageStore, transactionOptions } from "../stores";
  import { Input } from "sveltestrap";
  import { useNavigate } from "svelte-navigator";
  import { FeedbackStore } from "../stores";
  import { createEventDispatcher } from "svelte";
  import { fly, fade, slide, scale } from 'svelte/transition';
  import Button from "./Button.svelte";
  
  import FormCard from "./FormCard.svelte";
  import RatingSelect from "./RatingSelect.svelte";
  import TransitionSelect from "./TransitionSelect.svelte";
  
  export let selectedMenu;
  let text = ''
  let transitionType = "Income"
  let transitionTypeTr;
  let btnDisabled = true
  let min = 3;
  let max = 20;
  let message;
  let messageTransactionName;
  let amount;
  let date;

  $:if(transitionType === "Income"){
    transitionTypeTr = "Gelir"
  }else if(transitionType === "Expense"){
    transitionTypeTr = "Harcama"
  }else{
    transitionTypeTr="Yatırım"
  }

  let isNewTransaction = false;
  
  let newOption = ''
  $:console.log(newOption);

  const navigate = useNavigate()

  const handleSelect = e => transitionType = e.detail 

  const dispatch = createEventDispatcher()

  const handleSubmit = () => {
    if(text.trim().length > min && text.trim().length < max  ){
      const newTransition = {
        id:Date.now(),
        text:text.toLocaleLowerCase(),
        amount: amount,
        transitionType,    
        transitionTypeTr,
        date,
        
      }
      console.log(newTransition);
      FeedbackStore.update((currentTransition) => {
        return [newTransition, ...currentTransition]
      })

      //$FeedbackStore = [newFeedback, ...$FeedbackStore]
      

      text = ''
      amount = ''
      date=''
        selectedMenu = "transitions"
      dispatch('selectMenu', selectedMenu)
      
      navigate('/')
    }else{
      message = $LanguageStore === "TR" ? `Lütfen ${min} ile ${max} karakter arasında bir değer giriniz.` : `Text must be between ${min} and ${max} characters. `
    }

  }
  const handleOption = () => {
    if(newOption.trim().length > min && text.trim().length < max  ){
      
      
      transactionOptions.update((currentOption) => {
        return [newOption, ...currentOption]
      })

      newOption=''
        
      
    }else{
      messageTransactionName = $LanguageStore === "TR" ? `Lütfen ${min} ile ${max} karakter arasında bir değer giriniz.` : `Text must be between ${min} and ${max} characters. `

    }

  }

  const handleCloseForm = () => {
    selectedMenu = "transitions"
      dispatch('selectMenu', selectedMenu)
    navigate('/')
  }

  

    

</script>
<svelte:head>
  <title>{$LanguageStore === "TR" ? "Yeni İşlem" : "New Transaction"}</title>
</svelte:head>

<FormCard class="form" >
  
  <button on:click={handleCloseForm} class="close-btn" >X</button>
    <header >
      <h2> {$LanguageStore === "TR" ? "İşlem Tipini Seçiniz" : "Choose your transaction type?"} </h2>
      
    </header>
  <form on:submit|preventDefault = {handleSubmit} >
    
    <TransitionSelect  on:transition-select={handleSelect} />
    <div class="input-group">
      <input list="transactionsNames" type="text" on:input={message = null}  bind:value={text} placeholder={ $LanguageStore === "TR" ? "İşlem adı" : "Transaction name..."}>
      <datalist id="transactionsNames">
        {#each $transactionOptions as tn (tn) }
          
            <option value={tn}  ></option>
            
        {/each}
       
        
        
      </datalist>
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
  <span on:click={() => isNewTransaction = !isNewTransaction}  >{ $LanguageStore === "TR" ? "İşlem adı eklemek için buraya tıkla..." : "To add new transaction name click here..."}</span>

  {#if isNewTransaction}
    
      <form class="options" on:submit|preventDefault={handleOption} >
    <Input class="w-2/3" on:input={messageTransactionName=null} bind:value={newOption} type="text" placeholder={ $LanguageStore === "TR" ? "Yeni işlem adı..." : "New transaction name..."}/>
    
    <button class="btn" type="submit"  >{$LanguageStore === "TR" ? "Ekle" : "Add"}</button>
    <button class="btn" on:click={()=>isNewTransaction=false} >{$LanguageStore === "TR" ? "İptal" : "Cancel"}</button>
    {#if messageTransactionName}
        <div in:scale out:scale class="message">
            {messageTransactionName}
    </div>
    {/if}
  </form>
  
  {/if}
  
  </FormCard>

<style>
  .form{
    position: relative;
  }
    header {
      max-width: 400px;
      margin: auto;
      
    }
    .close-btn{
      position: absolute;
      background-color: rgba(0,0,0,0.2);
      right: 0;
      top: 0;
      width: 35px;
      height: 35px;
      color: black;
      border-radius: 50%; 
      transition: .25s ease-in-out;  
     }
     .close-btn:hover{
      background-color: rgba(0,0,0,0.7);
      color: #fff;
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
      color: rgb(201, 50, 12);
      font-size: 11px;
    }

    .btn-group{
      padding: 5px;
      display: flex;
      justify-content: center;
    }

    span{
      cursor: pointer;
      color: red;
    }
    .options{
      display: flex;
      justify-content: space-between;
    }

    @media only screen and (max-width: 600px) {
      input{
        font-size: 12px;
      }
    }
  
  
  </style>