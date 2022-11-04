import { derived, writable } from "svelte/store";
import { persistStore } from "./persistStore";

const initial = []
const optionInitial = ['maaş']

export const FeedbackStore = persistStore('data', initial)

export const transactionOptions = persistStore('optionNames', optionInitial)


export const countOfIncome = derived(
    FeedbackStore,
    // @ts-ignore
    $FeedbackStore => $FeedbackStore.filter((item) => item.transitionType === "Income").length
)

export const amountOfIncome = derived(
    FeedbackStore,
    // @ts-ignore
    $FeedbackStore => $FeedbackStore.filter((item) => item.transitionType === "Income").reduce((a, item) => a + item.amount, 0)
)
export const countOfExpense = derived(
    FeedbackStore,
    // @ts-ignore
    $FeedbackStore => $FeedbackStore.filter((item) => item.transitionType === "Expense").length
)
export const amountOfExpense = derived(
    FeedbackStore,
    // @ts-ignore
    $FeedbackStore => $FeedbackStore.filter((item) => item.transitionType === "Expense").reduce((a, item) => a + item.amount, 0)
)
export const countOfInvestment = derived(
    FeedbackStore,
    // @ts-ignore
    $FeedbackStore => $FeedbackStore.filter((item) => item.transitionType === "Investment").length
)
export const amountOfInvestment = derived(
    FeedbackStore,
    // @ts-ignore
    $FeedbackStore => $FeedbackStore.filter((item) => item.transitionType === "Investment").reduce((a, item) => a + item.amount, 0)
)


const initialLanguage = "EN"

export const LanguageStore = persistStore('lang',initialLanguage)