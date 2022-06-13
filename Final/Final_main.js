d3.csv("https://suuyaaa31.github.io/InfoVis2022/Final/SSDSE-C-2022_4.csv")
    .then( data => {
        data.forEach( (d,i) => {
          d.Cereals =+ d.Cereals, 
          d.Seafood =+ d.Seafood,
          d.Meat =+ d.Meat,
          d.MilkEggs =+ d.MilkEggs,
          d.Vegetable =+ d.Vegetable,
          d.Fruits =+ d.Fruits,
          d.Oils =+	d.Oils,
          d.Confectionery =+ d.Confectionery,
          d.Cooked =+ d.Cooked,
          d.Beverage =+ d.Beverage,
          d.Liquors =+ d.Liquors,
          d.sum =+ d.sum,
          d.index = i;  });

        const barchart = new BarChart({ 
            parent: '#drawing_region_barchart',
            width: 600,
            height: 600,
            margin: {top:10, right:50, bottom:50, left:100},
            xlabel: 'xlabel',
            ylabel: 'ylabel',
            title: "title",
            }, data);
        
        const scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 600,
            height: 600,
            margin: {top:10, right:10, bottom:50, left:100},
            xlabel: 'Sepal length [cm]',
            ylabel: 'Sepal width [cm]',
            }, data );
        
        d3.select('#original')
          .on('click', d => {
            data.sort((a, b) => a.index - b.index);
            barchart.update();
        });
        
        d3.select('#reverse')
        .on('click', d => {
            data.reverse();
            barchart.update();
        });
    
        d3.select('#ascend')
        .on('click', d => {
            const BarData = document.getElementById('BarValue');
            const num = BarData.selectedIndex;
            const str = BarData.options[num].value;
            //データの追加
              if(num == 1){
              data.sort((a, b) => a.Cereals - b.Cereals)
              }else if (num == 2){
                data.sort((a, b) => a.Seafood - b.JSeafood)
              }else if (num == 3){
                data.sort((a, b) => a.Meat - b.Meat)
              }else if (num == 4){
                data.sort((a, b) => a.MilkEggs - b.MilkEggs)
              }else if (num == 5){
                data.sort((a, b) => a.Vegetable - b.Vegetable)
              }else if (num == 6){
                data.sort((a, b) => a.Fruits - b.Fruits)
              }else if (num == 7){
                data.sort((a, b) => a.Oils - b.Oils)
              }else if (num == 8){
                data.sort((a, b) => a.Confectionery - b.Confectionery)
              }else if (num == 9){
                data.sort((a, b) => a.Cooked - b.Cooked)
              }else if (num == 10){
                data.sort((a, b) => a.Beverage - b.Beverage)
              }else if (num == 11){
                data.sort((a, b) => a.Liquors - b.Liquors)
              }else if (num == 12){
                  data.sort((a, b) => a.sum - b.sum)
              }
              barchart.update();
        });

        d3.select('#descend')
        .on('click', d => {
            const BarData = document.getElementById('BarValue');
            const num = BarData.selectedIndex;
            const str = BarData.options[num].value;
            //データの追加
              if(num == 1){
              data.sort((a, b) => b.Cereals - a.Cereals)
              }else if (num == 2){
              data.sort((a, b) => b.Seafood - a.Seafood)
              }else if (num == 3){
              data.sort((a, b) => b.Meat - a.Meat)
              }else if (num == 4){
              data.sort((a, b) => b.MilkEggs - a.MilkEggs)
              }else if (num == 5){
              data.sort((a, b) => b.Vegetable - a.Vegetable)
              }else if (num == 6){
              data.sort((a, b) => b.Fruits - a.Fruits)
              }else if (num == 7){
                data.sort((a, b) => b.Oils - a.Oils)
              }else if (num == 8){
                data.sort((a, b) => b.Confectionery - a.Confectionery)
              }else if (num == 9){
                data.sort((a, b) => b.Cooked - a.Cooked)
              }else if (num == 10){
                data.sort((a, b) => b.Beverage - a.Beverage)
              }else if (num == 11){
                data.sort((a, b) => b.Liquors - a.Liquors)
              }else if (num == 12){
                  data.sort((a, b) => b.sum - a.sum)
              }
              barchart.update();
        });

        d3.select('#Decision1')
        .on('click', d => {
            const BarData = document.getElementById('BarValue');
            const num = BarData.selectedIndex;
            const str = BarData.options[num].value;
            barchart.update()
            document.getElementById("span1").textContent = str;   
        });

        d3.select('#Decision2')
        .on('click', d => {
            const HorizontalData = document.getElementById('HorizontalValue');
            const Horizontalnum = HorizontalData.selectedIndex;
            const Horizontalstr = HorizontalData.options[Horizontalnum].value;
            scatter_plot.update();
            document.getElementById("span2").textContent = Horizontalstr; 
        });

        d3.select('#Decision3')
        .on('click', d => {
            const VerticalData = document.getElementById('VerticalValue');
            const Verticalnum = VerticalData.selectedIndex;
            const Verticalstr = VerticalData.options[Verticalnum].value;
            scatter_plot.update();
            document.getElementById("span3").textContent = Verticalstr; 
        });

        d3.select('#Decision4')
        .on('click', d => {
            barchart.update()
            scatter_plot.update();    
        });

        d3.select('#Decision5')
        .on('click', d => {
            data.forEach( (d,i) =>{
            d.color = 'steelblue'
        });
            barchart.update()
            scatter_plot.update();    
        });
        
        d3.select('#radius-slider')
        .on('input', function() {
            data.forEach( (d,i) =>{
            d.radius = this.value
        });
            scatter_plot.update(); 
            d3.select('#radius-value').text(this.value);
        });

        

    })
    .catch( error => {
        console.log( error );
    });
