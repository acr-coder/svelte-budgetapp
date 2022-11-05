
<script>
  import { FeedbackStore, LanguageStore } from "../stores";
    import { createEventDispatcher } from "svelte";
  import Card from "./Card.svelte";
  import MdDeleteForever from 'svelte-icons/md/MdDeleteForever.svelte'
  import FaEdit from 'svelte-icons/fa/FaEdit.svelte'
  import FaCheck from 'svelte-icons/fa/FaCheck.svelte'
  
 
  

export let fb;
let isEdit = false;
let amount;
let text= '';
let date;
let min = 3;
  let max = 20;
  let messageEN;
  let messageTR;
  let transactionType;




const handleDelete = (id) => {
  FeedbackStore.update((currentFeedback) => {
    return currentFeedback.filter(item => item.id != id)
  })
  
}

const updateTransaction = (transaction) => {
  if(text.trim().length < max  ){
          const updatedTransition = {
            id:Date.now(),
            text: text ? text.toLocaleLowerCase() : fb.text,
            amount: amount ? amount : fb.amount,
            transitionType:transactionType ? transactionType : fb.transitionType,
            date: date ? date : fb.date
          }
      $FeedbackStore = $FeedbackStore.filter((item)=>item.id != transaction.id )      

      $FeedbackStore = [updatedTransition, ...$FeedbackStore]

      isEdit=false
      

      text = ''
      amount = ''
      date=''
       transactionType=''
       alert($LanguageStore === "TR" ? "İşlem Güncellendi" : "Transaction Updated")
    }else{
      messageEN=`Text must be maximum ${max} characters. `
          messageTR=`Lütfen en fazla ${max} karakter giriniz. `
          alert($LanguageStore === "TR" ? messageTR : messageEN)
    }
}

</script>


<Card transition_Type={fb.transitionType} >
   
 
      {#if !isEdit}  
      <input type="number" class="num-display"  value={fb.amount} readonly />
    <div class="edit" on:click={() => isEdit = !isEdit} ><FaEdit/></div>
    <div class="close"  on:click={() => handleDelete(fb.id) } ><MdDeleteForever /></div>
    <input type="text" class="text-display"  value={fb.text}   readonly />
    <input type="date" class="date-display" value={fb.date} readonly />
    {:else}
    <input type="number" bind:value={amount} class="num-display" placeholder={fb.amount}   />
    <div class="check" on:click={()=> updateTransaction(fb)}   ><FaCheck/></div>
    <div class="close"  on:click={() => handleDelete(fb.id) } ><MdDeleteForever /></div>
    <input type="text" bind:value={text} class="text-display" placeholder={fb.text}     />
    <input type="date" bind:value={date} class="date-display"  placeholder={fb.datedate} />

    {/if }
      
    
   
    <!-- <button class="close" on:click={() => handleDelete(fb.id) } >X</button> -->
    
        
    
   
      
  
</Card>

<style>
    .num-display {
      position: absolute;
      top: 0;
      left: -10px;
      width: 50%;
      height: fit-content;
      background: #ff6a95;
      color: #fff;
      border: 1px #eee solid;
      border-radius: 10px;
      padding:3px;
      text-align: center;
      font-size: 14px;
      outline: none;
    }
   
    .date-display {
      position: absolute;
      right: 0;
      bottom: -10px;
      width: 70%;
      height: fit-content;
      background: #ff6a95;
      color: #fff;
      border: 1px #eee solid;
      border-radius: 10px;
      padding: 5px;
      text-align: center;
      font-size: 14px;
      outline: none;
    }
    .text-display{
      outline: none;
    }
  
    .close {
      width: 22px;
      position: absolute;
      top: 10px;
      right: 10px;
      color: gray;
      cursor: pointer;
      background: none;
      border: none;
      background: none;
      border: none;
    }
    .close:hover{
      color: red;
    }
    .edit {
      width: 22px;
      position: absolute;
      color: gray;
      top: 10px;
      right: 40px;
      cursor: pointer;
      background: none;
      border: none;
      background: none;
      border: none;
    }
    .check {
      width: 22px;
      position: absolute;
      color: gray;
      top: 10px;
      right: 40px;
      cursor: pointer;
      background: none;
      border: none;
      background: none;
      border: none;
    }
    .edit:hover{
      color: red;
    }
    .check:hover{
      color: green;
    }
    @media only screen and (max-width: 600px) {
      input[type="number"]{
        width: 30%;
        
      }
    }
    @media only screen and (max-width: 600px) {
      input[type="date"]{
        width: 30%;
        
      }
    }
   
  </style>