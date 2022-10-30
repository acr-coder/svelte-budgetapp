<script>
    import { Doughnut } from 'svelte-chartjs';
    //import { data } from './data';
    

    
  
    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      CategoryScale,
    } from 'chart.js';
  
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

    const data = {
    
    datasets: [
      {
        data: [300,100,50],
        backgroundColor: ['rgb(229, 13, 236)', 'rgb(241, 108, 59)', 'yellow'],
        hoverBackgroundColor: [
          '#FF5A5E',
          '#5AD3D1',
          '#FFC870'
        ],
        borderRadius: 30,
        spacing:5,
        hoverOffset:4
      },
    ],
  };
  </script>  
  <div >
      <Doughnut {data} width={250}
      height={250}
      options={{ maintainAspectRatio: false, responsive: true, cutout:85  }}  />
  </div>

  