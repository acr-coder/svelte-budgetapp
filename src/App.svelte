<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Table from "./lib/Table.svelte";
  import { Progress, Badge } from "sveltestrap";
  import NewTable from "./lib/NewTable.svelte";
  import Expenses from "./lib/Expenses.svelte";
  import FeedbackForm from "./lib/FeedbackForm.svelte";
  import FeedbackList from "./lib/FeedbackList.svelte";
  import FeedbackStats from "./lib/FeedbackStats.svelte";
  import Incomes from "./lib/Incomes.svelte";
  import Investments from "./lib/Investments.svelte";
  import {
    LanguageStore,
    FeedbackStore,
    countOfIncome,
    countOfExpense,
    countOfInvestment,
    amountOfExpense,
    amountOfIncome,
    amountOfInvestment,
  } from "./stores";
  import TableList from "./lib/TableList.svelte";

  
  

  let selectedMenu = "transitions";

  const handleLanguage = () => {
    if ($LanguageStore === "EN") {
      $LanguageStore = "TR";
    } else {
      $LanguageStore = "EN";
    }
  };

  const handleSelectMenu = (e) => {
    selectedMenu = e.detail;
  };

  $: count = $FeedbackStore.length;

  let budget;

  $: if (count === 0) {
    budget = 0;
  } else {
    budget = $amountOfIncome - $amountOfExpense - $amountOfInvestment;
  }
</script>

<div class="box">
  <Router>
    <div class="header">
      <div
        class="yeni"
        on:click={() => (selectedMenu = "new")}
        class:link={selectedMenu === "new"}
      >
        <Link to="form"
          >{$LanguageStore === "TR" ? "Yeni İşlem Ekle" : "New Transaction"}
          <span>+</span>
        </Link>
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => (selectedMenu = "transitions")}
        class:link={selectedMenu === "transitions"}
      >
        <Link to="/"
          >{$LanguageStore === "TR" ? "Tüm İşlemler Kart Görünüm" : "All Transactions Card View"}
        </Link>
      </div>
      <div
      on:click={() => (selectedMenu = "table")}
      class:link={selectedMenu === "table"}
    >
      <Link to="table"
        >{$LanguageStore === "TR" ? "Tüm İşlemler Tablo Görünümü" : "All Transactions Table View"}</Link
      >
      
    </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => (selectedMenu = "investments")}
        class:link={selectedMenu === "investments"}
      >
        <Link to="investments"
          >{$LanguageStore === "TR" ? "Yatırımlar" : "Investments"}
        </Link>
        <div>
          <Badge color="primary"
            >{$countOfInvestment}
            {$LanguageStore === "TR" ? "İşlem" : "transactions"}</Badge
          >
          <Badge color="primary"
            >{$LanguageStore === "TR" ? "toplam" : "total"}: {$amountOfInvestment
              ? $amountOfInvestment
              : 0}
          </Badge>
        </div>
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => (selectedMenu = "expenses")}
        class:link={selectedMenu === "expenses"}
      >
        <Link to="expenses"
          >{$LanguageStore === "TR" ? "Harcamalar" : "Expenses"}
        </Link>
        <div>
          <Badge color="primary"
            >{$countOfExpense}
            {$LanguageStore === "TR" ? "İşlem" : "transactions"}</Badge
          >
          <Badge color="primary"
            >{$LanguageStore === "TR" ? "toplam" : "total"}: {$amountOfExpense
              ? $amountOfExpense
              : 0}
          </Badge>
        </div>
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => (selectedMenu = "incomes")}
        class:link={selectedMenu === "incomes"}
      >
        <Link to="incomes"
          >{$LanguageStore === "TR" ? "Gelirler" : "Incomes"}</Link
        >
        <div>
          <Badge color="primary"
            >{$countOfIncome}
            {$LanguageStore === "TR" ? "İşlem" : "transactions"}</Badge
          >
          <Badge color="primary"
            >{$LanguageStore === "TR" ? "toplam" : "total"}: {$amountOfIncome
              ? $amountOfIncome
              : 0}
          </Badge>
        </div>
      </div>
      

      <!-- svelte-ignore a11y-click-events-have-key-events -->

      <div class="lang" on:click={handleLanguage}>
        {$LanguageStore === "TR" ? "EN" : "TR"}
      </div>

      <div>
        {$LanguageStore === "TR"
          ? "Yatırımların Gelirlere Oranı"
          : "Ratio of Investment to Incomes "}
        <Progress
          color="warning"
          value={($amountOfInvestment / $amountOfIncome) * 100}
        /> %{Math.round(
          $amountOfIncome === 0
            ? 0
            : ($amountOfInvestment / $amountOfIncome) * 100
        )}
      </div>
      <div>
        {$LanguageStore === "TR"
          ? "Giderlerin Gelirlere Oranı"
          : "Ratio of Expenses to Incomes "}
        <Progress
          color="info"
          value={($amountOfExpense / $amountOfIncome) * 100}
        />% {Math.round(
          $amountOfIncome === 0 ? 0 : ($amountOfExpense / $amountOfIncome) * 100
        )}
      </div>
    </div>

    <main class="container">
      <FeedbackStats />
      <Route path="/">
        <div class="list">
          <FeedbackList />
        </div>
      </Route>

      <Route path="form">
        <FeedbackForm {selectedMenu} on:selectMenu={handleSelectMenu} />
      </Route>

      <Route path="investments">
        <div class="list">
          <Investments />
        </div>
      </Route>
      <Route path="expenses">
        <div class="list">
          <Expenses />
        </div>
      </Route>
      <Route path="incomes">
        <div class="list">
          <Incomes />
        </div>
      </Route>
      <Route path="table">
        <div >
          <TableList />
        </div>
      </Route>
    </main>
  </Router>
</div>

<style>
  .yeni {
    font-size: 23px;
  }
  span {
    width: 30px;
    height: 20px;
    background-color: red;
    color: #fff;
    border-radius: 10px;
    padding: 10px;
  }
</style>
