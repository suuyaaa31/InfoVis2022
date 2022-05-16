d3.csv("https://suuyaaa31.github.io/InfoVis2022/W08/data1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:30, bottom:50, left:60},
            xlabel: 'X-Label',
            title: 'Title',
        };

        let bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            xlabel: config.xlabel || '',
            title: config.title || '',
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
            .domain([0, d3.max(self.data, d => d.value)])
            .range([0, self.inner_width]);
        
        self.yscale = d3.scaleBand()
            .domain(self.data.map(d=> d.label))
            .range([0, self.inner_height])
            .paddingInner(0.1);

        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(5);
        
        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(0)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)
            .call(self.xaxis);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(${self.inner_width}), 0`)
            .call(self.yaxis);

        self.label_group = self.svg.append('g');
        self.title_group = self.svg.append('g');
        
    }

    update() {
        let self = this;
        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d=>self.yscale(d.label))
            .atr("width", d=>self.xscale(d.value))
            .attr("height", self.yscale.bandwidth());

        self.label_group.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top + self.inner_height + self.config.margin.bottom / 2)
            .attr('font-size', '10pt')
            .text(self.config.xlabel);

        self.title_group.append('text')
            .attr('x', self.config.width / 2)
            .attr('y', self.config.margin.top / 2)
            .attr('font-size', '10pt')
            .text(self.config.title);
    }
}