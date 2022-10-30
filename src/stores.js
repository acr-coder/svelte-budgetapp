import { writable } from "svelte/store";
import { persistStore } from "./persistStore";

const initial = []

export const FeedbackStore = persistStore('data', initial)


const initialLanguage = "EN"

export const LanguageStore = persistStore('lang',initialLanguage)