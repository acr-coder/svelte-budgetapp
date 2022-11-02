<button on:click={()=>deleteRow(row.id)}>
	❌ 
</button>

<script>
	export let row;
	export let deleteRow
</script>

<style>
	button:hover{
		color: red;
	}
</style>