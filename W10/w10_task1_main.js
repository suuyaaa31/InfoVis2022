d3.csv("https://suuyaaa31.github.io/InfoVis2022/W08/data1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:30, bottom:50, left:50},
            xtics:10,
            yticks:10,
            xlabel: 'xlabel',
        };

        const bar_chart = new Barchart( config, data );
        bar_chart.update();

        d3.select('#reverse')
          .on('click', d=> {
              data.reverse();
              bar_chart.update();
          });

        d3.select('#ascend')
          .on('click', d=> {
              data.sort((a,b) => a.value - b.value);
              bar_chart.update();
          });
        
        d3.select('#descend')
          .on('click', d=> {
              data.sort((a, b) => b.value - a.value);
              bar_chart.update();
          });

    })
    .catch( error => {
        console.log( error );
    });

class Barchart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:20},
            xticks: config.xticks || 10,
            yticks: config.yticks || 10,
            xlabel: config.xlabel || ''
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

           
        self.chart = self.svg.append('g')
                .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
    
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
    
        self.xscale = d3.scaleLinear()
            .range([0, self.inner_width]);
    
        self.yscale = d3.scaleBand()
            .range([0, self.inner_height]);
    
        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(5);
                
        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(0)
            .tickSizeOuter(0);
    
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);
    
        self.yaxis_group = self.chart.append('g');
    
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.value );
        const xmax = d3.max( self.data, d => d.value );
        self.xscale.domain( [0, xmax]);

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain(self.data.map(d => d.label)).paddingInner(0.1);

        self.chart.selectAll("rect")
            .data(self.data)
            .join("rect")
            .transition()
            .duration(1000)
            .attr("x", 0)
            .attr("y", d => self.yscale(d.label))
            .attr("width", d => self.xscale(d.value))
            .attr("height", self.yscale.bandwidth());

        self.render();
    }

    render() {
        let self = this;

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }
}