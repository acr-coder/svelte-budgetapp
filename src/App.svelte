<script>
  import { Router, Link, Route } from "svelte-navigator";
  import { Progress, Badge } from 'sveltestrap';
  
  import Expenses from "./lib/Expenses.svelte";
  import FeedbackForm from './lib/FeedbackForm.svelte';
  import FeedbackList from './lib/FeedbackList.svelte'
  import FeedbackStats from './lib/FeedbackStats.svelte';
  import Incomes from "./lib/Incomes.svelte";
  import Investments from "./lib/Investments.svelte";
  import { LanguageStore, FeedbackStore } from "./stores";

  
  
  let selectedMenu = "transitions"

  const handleLanguage = () => {
    if($LanguageStore === "EN"){
      $LanguageStore = "TR"
    }else{
      $LanguageStore = "EN"
    }
  }

  const handleSelectMenu = (e) => {
    selectedMenu = e.detail
  }

  $:count = $FeedbackStore.length
  $: incomesCount = $FeedbackStore.filter((item) => item.transitionType === "Income").length
  $: expenseCount = $FeedbackStore.filter((item) => item.transitionType === "Expense").length
  $: investmentsCount = $FeedbackStore.filter((item) => item.transitionType === "Investment").length

  let budget;
  $: totalExpenseAmount =  $FeedbackStore.filter((transition) => transition.transitionType === "Expense").reduce((a, item) => a + item.amount, 0)
  $: totalIncomeAmount =  $FeedbackStore.filter((transition) => transition.transitionType === "Income").reduce((a, item) => a + item.amount, 0)
  $: totalInvestmentAmount =  $FeedbackStore.filter((transition) => transition.transitionType === "Investment").reduce((a, item) => a + item.amount, 0)
 
  $: if(count === 0){
    budget= 0
  }else{       
    budget = $FeedbackStore.reduce((a, item) => a + item.amount, 0) - 2*totalExpenseAmount - 2*totalInvestmentAmount
  }

  
  
  

</script>

<div class="box">


<Router>
  <div class="header">
    <div class="yeni" on:click={() => selectedMenu = "new"} class:link="{selectedMenu === "new"}" >
      <Link  to="form" >{$LanguageStore === "TR" ? "Yeni İşlem Ekle" : "New Transaction"} <span>+</span> </Link>
      
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "transitions"}  class:link="{selectedMenu === "transitions"}" >
      <Link  to="/" >{$LanguageStore === "TR" ? "Tüm İşlemler" : "All Transactions"}  </Link>
      
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "investments"} class:link="{selectedMenu === "investments"}" >
      <Link   to="investments" >{$LanguageStore === "TR" ? "Yatırımlar" : "Investments"} </Link>
     <div>
      <Badge color="primary">{investmentsCount} {$LanguageStore === "TR" ? "İşlem" : "transactions"}</Badge>
      <Badge color="primary">{$LanguageStore === "TR" ? "toplam" : "total"}: {totalInvestmentAmount ? totalInvestmentAmount : 0} </Badge>
    </div>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "expenses"} class:link="{selectedMenu === "expenses"}" >
      <Link  to="expenses" >{$LanguageStore === "TR" ? "Harcamalar" : "Expenses"} </Link>
      <div>
      <Badge color="primary">{expenseCount} {$LanguageStore === "TR" ? "İşlem" : "transactions"}</Badge>
      <Badge color="primary">{$LanguageStore === "TR" ? "toplam" : "total"}: {totalExpenseAmount ? totalExpenseAmount : 0} </Badge>
    </div>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "incomes"} class:link="{selectedMenu === "incomes"}" >
      <Link   to="incomes" >{$LanguageStore === "TR" ? "Gelirler" : "Incomes"}</Link>
      <div>
        <Badge  color="primary">{incomesCount} {$LanguageStore === "TR" ? "İşlem" : "transactions"}</Badge>
      <Badge color="primary">{$LanguageStore === "TR" ? "toplam" : "total"}: {totalIncomeAmount ? totalIncomeAmount : 0} </Badge>
      </div>
      
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
   
    <div class="lang" on:click={handleLanguage} >{$LanguageStore === "TR" ? "EN" : "TR"} </div>
    
    
    <div>
      {$LanguageStore === "TR" ? "Yatırımların Gelirlere Oranı" : "Ratio of Investment to Incomes "}
          <Progress color="warning" value={(totalInvestmentAmount/totalIncomeAmount)*100} ></Progress> %{Math.round(totalIncomeAmount === 0 ? 0 : (totalInvestmentAmount/totalIncomeAmount)*100)}

    </div>
    <div  >
      {$LanguageStore === "TR" ? "Giderlerin Gelirlere Oranı" : "Ratio of Expenses to Incomes "}
          <Progress color="info" value={(totalExpenseAmount/totalIncomeAmount)*100} />% {Math.round(totalIncomeAmount === 0 ? 0 :(totalExpenseAmount/totalIncomeAmount)*100)} 

    </div>


   
  </div>

<main class="container" >
  

  
  <FeedbackStats />
  <Route path="/" >
    <div class="list">
    <FeedbackList />
  </div>
  </Route>

  <Route path="form" >
    <FeedbackForm {selectedMenu} on:selectMenu={handleSelectMenu} />
  </Route>
  
  
  <Route path="investments" >
    <div class="list">
    <Investments />
  </div>
  </Route>
  <Route path="expenses" >
    <div class="list">
    <Expenses />
  </div>
  </Route>
  <Route path="incomes" >
    <div class="list">
    <Incomes />
  </div>
  </Route>
  
  
  
  
</main> 
</Router>
 

</div>

<style>
  .yeni{
    font-size: 23px;
  }
  span{
    width: 30px;
    height: 20px;
    background-color: red;
    color: #fff;
    border-radius: 10px;
    padding: 10px;
  }
</style>

