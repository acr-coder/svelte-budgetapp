<script>
  import { Router, Link, Route } from "svelte-navigator";
  
  import Expenses from "./lib/Expenses.svelte";
  import FeedbackForm from './lib/FeedbackForm.svelte';
  import FeedbackList from './lib/FeedbackList.svelte'
  import FeedbackStats from './lib/FeedbackStats.svelte';
  import Graph from './lib/Graph.svelte';
  import Incomes from "./lib/Incomes.svelte";
  import Investments from "./lib/Investments.svelte";
  import { LanguageStore } from "./stores";

   
  
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

</script>
<div class="box">


<Router>
  <div class="header">
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "transitions"}  class:link="{selectedMenu === "transitions"}" >
      <Link  to="/" >{$LanguageStore === "TR" ? "Tüm İşlemler" : "All Transactions"} </Link>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "investments"} class:link="{selectedMenu === "investments"}" >
      <Link   to="investments" >{$LanguageStore === "TR" ? "Yatırımlar" : "Investments"}</Link>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "expenses"} class:link="{selectedMenu === "expenses"}" >
      <Link  to="expenses" >{$LanguageStore === "TR" ? "Harcamalar" : "Expenses"}</Link>
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
    
  </div>

<main class="container" >
  

  <!-- <Graph /> -->
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
