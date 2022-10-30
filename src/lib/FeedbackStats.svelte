<script>
    import { FeedbackStore } from '../stores'
  import Graph from './Graph.svelte';
  import { LanguageStore } from "../stores"
   

    $:count = $FeedbackStore.length

  let budget;
  let totalExpenseAmount;
  let totalInvestmentAmount;

  $: if(count === 0){
    budget= 0
  }else{
    let expenses = $FeedbackStore.filter((transition) => transition.transitionType === "Expense")
    let investments = $FeedbackStore.filter((transition) => transition.transitionType === "Investment")
     totalExpenseAmount = expenses.reduce((a, item) => a + item.amount, 0)
     totalInvestmentAmount = investments.reduce((a, item) => a + item.amount, 0)
    budget = $FeedbackStore.reduce((a, item) => a + item.amount, 0) - 2*totalExpenseAmount - 2*totalInvestmentAmount
  }

</script>

<div class="feedback-stats">
    <h4 class="box" >{ $LanguageStore === "TR" ? "Toplam İşlem" : "Total Transitions"}: {count > 1 ? `${count}` : `${count}`}</h4>
    <!-- <Graph budget={budget} totalExpenseAmount={totalExpenseAmount} totalInvestmentAmount={totalInvestmentAmount} /> -->
    <h4 class="box" >{ $LanguageStore === "TR" ? "Bütçe" : "Budget"}: {budget} </h4>
    
</div>

<style>
    .feedback-stats{
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 30px;
        margin-bottom: 30px;
        
       
    }
    .box{
      border: 2px solid yellow;
      padding: 3px 6px;
    }
    @media only screen and (max-width: 600px) {
      .box{
        border: 2px solid yellow;
        
        margin: auto;
        padding: 2px 3px;
        font-size: 19px;
      }
    }

    @media only screen and (max-width: 800px) {
  .box{
    font-size: 16px;
  }
}
</style>
