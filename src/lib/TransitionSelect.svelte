<script>
    import {createEventDispatcher} from 'svelte'
    import { LanguageStore } from "../stores"

let transitionSelected = "Income"

const dispatch = createEventDispatcher()

const onChange = (e) => {
  transitionSelected = e.currentTarget.value
  dispatch('transition-select', transitionSelected)
}
    
</script>

<ul class="rating">
  
    <li  >
      <input type="radio" id="exp1" name="expense" value="Investment" on:change={onChange}  checked={transitionSelected==="Investment"} />
      <label class="inv" for="exp1">{$LanguageStore === "TR" ? "Yatırımlar" : "Investments"}</label>
    </li>
    <li>
      <input  type="radio" id="exp2" name="expense" value="Expense" on:change={onChange} checked={transitionSelected==="Expense"} />
      <label class="exp" for="exp2">{$LanguageStore === "TR" ? "Harcamalar" : "Expenses"}</label>
    </li>
    <li>
      <input  type="radio" id="exp3" name="expense" value="Income" on:change={onChange} checked={transitionSelected==="Income"} />
      <label class="inc" for="exp3">{$LanguageStore === "TR" ? "Gelirler" : "Incomes"}</label>
    </li>
    
  </ul>

  <style>
    .rating {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 30px 0;
    }
  
    .rating li {
      position: relative;
      
      
      height: 50px;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      font-size: 19px;
      
      transition: 0.3s;
    }
  
    .rating li label {
      position: absolute;
      top: 50%;
      left: 50%;
      width: fit-content;
      height: 50px;
      padding: 10px;
      border-radius: 5px;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  
    
  
    /* Make actual radio select invisible */
    [type='radio'] {
      opacity: 0;
    }
  
    /* Use the sibling select */
    [type='radio']:checked ~ label {
      background: #ff6a95;
      color: #fff;
    }
    .inv{
      border-left: 2px solid yellow;
      border-bottom: 2px solid yellow;
    }
    .exp{
      border-left: 2px solid rgb(241, 108, 59);
      border-bottom: 2px solid rgb(241, 108, 59);
    }
    .inc{
      border-left: 2px solid rgb(229, 13, 236);
      border-bottom: 2px solid rgb(229, 13, 236);
    }

    @media only screen and (max-width: 600px) {
  .rating li {
    width: 20px;
    height: 20px;
    padding: 5px;
    font-size: 13px;
  }
  .rating li label{
    width: fit-content;
    height: 30px;
    padding: 5px;
  }
}
          

</style>