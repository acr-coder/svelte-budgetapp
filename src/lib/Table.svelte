<script>
// @ts-nocheck

	import SvelteTable from 'svelte-table';
	import DeleteRow from "./DeleteRow.svelte"
	import { data } from '../myLittleData.js'
	import {FeedbackStore} from "../stores"

	let rows = $FeedbackStore;
	
	// define column configs
	const columns = [
		// {
		// 	key: "number",
		// 	title: "Number / Episode / Season",
		// 	value: v => `S${(v.episode + "").padStart(2,'0')}E${(v.season + "").padStart(2,'0')}`,
		// 	sortable: true
		// },
		{
			key: "text",
			title: "Transaction Name",
			value: v => v.text,
			sortable: true,
			searchValue: v => [v.text, v.date].join(' ¦ '),
		},
		{
			key: "amount",
			title: "Amount",
			value: v => v.amount,
			sortable: true,
		},
		{
			key: "transitionType",
			title: "Transaction Type",
			value: v => v.transitionType,
			sortable: true,
		},
		{
			key: "date",
			title: "Date",
			value: v => v.date,
			sortable: true,
		},
		{
			key: "delete",
			title: "",
			renderComponent: {
				component: DeleteRow,
				props: {
        	deleteRow,
      	},
			},
		},
	];
	
	function deleteRow(id){
		rows = rows.filter(r => r.id !== id)
	}
</script>

<SvelteTable columns="{columns}" rows="{rows}"  ></SvelteTable>


<style>
	:global(thead, tbody tr) {
		display:table;
		width:100%;
		table-layout:fixed;
		margin: auto;
		
	}
	:global(tbody td) {
		border-top: 2px solid rgb(166, 201, 40);
		
	}
	:global(thead){
		color:red;
	}
</style>