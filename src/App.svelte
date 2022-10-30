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

</script>

<Router>
  <div class="header">
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "transitions"}  class:link="{selectedMenu === "transitions"}" >
      <Link  to="/all-transitions" >{$LanguageStore === "TR" ? "Tüm İşlemler" : "All Transitions"} </Link>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "investments"} class:link="{selectedMenu === "investments"}" >
      <Link   to="/all-investments" >{$LanguageStore === "TR" ? "Yatırımlar" : "Investments"}</Link>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "expenses"} class:link="{selectedMenu === "expenses"}" >
      <Link  to="/all-expenses" >{$LanguageStore === "TR" ? "Harcamalar" : "Expenses"}</Link>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "incomes"} class:link="{selectedMenu === "incomes"}" >
      <Link   to="/all-incomes" >{$LanguageStore === "TR" ? "Gelirler" : "Incomes"}</Link>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => selectedMenu = "new"} class:link="{selectedMenu === "new"}" >
      <Link  to="/form" >{$LanguageStore === "TR" ? "Yeni İşlem Ekle" : "New Transition"}</Link>
    </div>
    <div class="lang" on:click={handleLanguage} >{$LanguageStore === "TR" ? "EN" : "TR"} </div>
    
  </div>

<main class="container" >
  

  <!-- <Graph /> -->
  <FeedbackStats />
  <Route path="form" component={FeedbackForm} />
  
  <Route path="all-transitions" >
    <div class="list">
    <FeedbackList />
  </div>
  </Route>
  <Route path="all-investments" >
    <div class="list">
    <Investments />
  </div>
  </Route>
  <Route path="all-expenses" >
    <div class="list">
    <Expenses />
  </div>
  </Route>
  <Route path="all-incomes" >
    <div class="list">
    <Incomes />
  </div>
  </Route>
  
  
  
  
</main> 
</Router>
 


