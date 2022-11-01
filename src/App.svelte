<script>
  import { Router, Link, Route } from "svelte-navigator";
  import { Progress } from 'sveltestrap';
  
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

  let budget;
  let totalExpenseAmount;
  let totalInvestmentAmount;
  let totalIncomeAmount;

  $: if(count === 0){
    budget= 0
  }else{
    let expenses = $FeedbackStore.filter((transition) => transition.transitionType === "Expense")
    let investments = $FeedbackStore.filter((transition) => transition.transitionType === "Investment")
    let incomes = $FeedbackStore.filter((transition) => transition.transitionType === "Income")
     totalExpenseAmount = expenses.reduce((a, item) => a + item.amount, 0)
     totalInvestmentAmount = investments.reduce((a, item) => a + item.amount, 0)
     totalIncomeAmount = incomes.reduce((a, item) => a + item.amount, 0)
    budget = $FeedbackStore.reduce((a, item) => a + item.amount, 0) - 2*totalExpenseAmount - 2*totalInvestmentAmount
  }
  
  

</script>

<div class="box">


<Router>
  <div class="header">
    
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "transitions"}  class:link="{selectedMenu === "transitions"}" >
      <Link  to="/" >{$LanguageStore === "TR" ? "Tüm İşlemler" : "All Transactions"}  </Link>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "investments"} class:link="{selectedMenu === "investments"}" >
      <Link   to="investments" >{$LanguageStore === "TR" ? "Yatırımlar" : "Investments"} </Link>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "expenses"} class:link="{selectedMenu === "expenses"}" >
      <Link  to="expenses" >{$LanguageStore === "TR" ? "Harcamalar" : "Expenses"} </Link>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "incomes"} class:link="{selectedMenu === "incomes"}" >
      <Link   to="incomes" >{$LanguageStore === "TR" ? "Gelirler" : "Incomes"}</Link>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "new"} class:link="{selectedMenu === "new"}" >
      <Link  to="form" >{$LanguageStore === "TR" ? "Yeni İşlem Ekle" : "New Transaction"}</Link>
    </div>
    <div class="lang" on:click={handleLanguage} >{$LanguageStore === "TR" ? "EN" : "TR"} </div>
    
    
    <div>
      Rate of Investments / Incomes
          <Progress color="warning" value={(totalInvestmentAmount/totalIncomeAmount)*100} />

    </div>
    <div>
      Rate of Expenses / Incomes
          <Progress color="info" value={(totalExpenseAmount/totalIncomeAmount)*100} />

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


