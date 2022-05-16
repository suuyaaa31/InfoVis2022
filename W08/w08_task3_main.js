d3.csv("https://suuyaaa31.github.io/InfoVis2022/W08/data1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:30, bottom:50, left:30},
            xtics:10,
            yticks:10,
            radius:100,
            xlabel: 'X-Label',
            title: 'Title',
        };

        let pie_chart = new PieChart( config, data );
        pie_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

class PieChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:20},
            title: config.title || '',
            radius:config.radius||100,
            
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

           
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.width / 2}, ${self.config.height / 2})`);
    
        self.pie = d3.pie()
            .value(d => d.value);

        self.arc = d3.arc()
            .innerRadius(self.config.radius / 3)
            .outerRadius(self.config.radius);

        self.color = d3.scaleOrdinal()
            .range(["black", "blue", "red", "yellow", "pink"]);
    }

    update() {
        let self = this;
        self.render();
    }

    render() {
        let self = this;

        let pieElement = self.chart.selectAll('pie')
            .data(self.pie(self.data)).enter()
            .append('g')

            pieElement
            .append('path')
            .attr('d', self.arc)
            .attr('fill', d => self.color(d.index))
            .attr('stroke', 'black')
            .style('stroke-width', '1px');

            pieElement
            .append("text")
            .attr('transform', d => `translate(${self.arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => d.data.label);
            
    }
}