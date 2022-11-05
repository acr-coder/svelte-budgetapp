<script>
    import { Card, CardBody, CardHeader, Input, Table, Column, Styles, Button,Label, FormGroup } from 'sveltestrap';
        import {FeedbackStore, LanguageStore} from "../stores"    
        import MdDeleteForever from 'svelte-icons/md/MdDeleteForever.svelte'
      import FaEdit from 'svelte-icons/fa/FaEdit.svelte'
      import FaCheck from 'svelte-icons/fa/FaCheck.svelte'
      import { each } from 'svelte/internal';
  
        
        export let vT;
         let isEdit=false
        let amount;
    let text= '';
    let date;
    let transactionType;
    let transitionTypeTr;
    let min = 3;
      let max = 20;
      let messageEN;
      let messageTR;

      $:if(transactionType === "Income" || transactionType === "Gelir"){
    transitionTypeTr = "Gelir"
    transactionType = "Income"
  }else if(transactionType === "Expense" || transactionType === "Harcama"){
    transitionTypeTr = "Harcama"
    transactionType = "Expense"
  }else{
    transitionTypeTr="Yatırım"
    transactionType = "Investment"
  }

        const handleDel = (id) => {
            $FeedbackStore = $FeedbackStore.filter((item) => item.id != id)
         }    
    
       const updateTransaction = (transaction) => {
      if(text.trim().length < max  ){
        
          const updatedTransition = {
            id:Date.now(),
            text: text ? text.toLocaleLowerCase() : vT.text,
            amount: amount ? amount : vT.amount,
            transitionType:transactionType ? transactionType : vT.transitionType,
            date: date ? date : vT.date
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

 {#if !isEdit}
 <tr>
   <td>{vT.text}</td>
<td>{vT.amount}</td>
<td>{$LanguageStore === "TR" ? vT.transitionTypeTr : vT.transitionType}</td>
<td>{vT.date}</td>
<td><Button on:click={()=> isEdit = !isEdit}  class="hover:bg-red-700 w-8 sm:w-12" ><FaEdit/></Button></td>
<td><Button on:click={()=>handleDel(vT.id)}  class="hover:bg-red-700 w-8 sm:w-12" ><MdDeleteForever/></Button></td>
 </tr>
   {:else}
   <tr>
     <td>
       <input type="text" bind:value={text} placeholder={vT.text}  />              
     </td>
     
     <td>
       <input type="number" bind:value={amount} placeholder={vT.amount}  />              
     </td>
     
     <td>
       <input list="options" type="text" bind:value={transactionType} placeholder={vT.transitionType}  /> 
       <datalist id="options" >
        <option value={$LanguageStore === "TR" ? "Gelir" : "Income"}></option>
        <option value={$LanguageStore === "TR" ? "Harcama" : "Expense"}></option>
        <option value={$LanguageStore === "TR" ? "Yatırım" : "Investment"}></option>
       </datalist>             
     </td>
     
     <td>
       <input type="date" bind:value={date} placeholder={vT.date}  />              
     </td>
     <td><Button on:click={()=>updateTransaction(vT)} class="hover:bg-green-700 w-8 sm:w-12" ><FaCheck/></Button></td>
     <td><Button on:click={()=>handleDel(vT.id)}  class="hover:bg-red-700 w-8 sm:w-12" ><MdDeleteForever/></Button></td>

     
 </tr>
 {/if}

 <style>
    input{
        outline: none;
    }
    input[type="text"]{
        width: 50%;
    }
    input[type="number"]{
        width: 50%;
    }
    
 </style>