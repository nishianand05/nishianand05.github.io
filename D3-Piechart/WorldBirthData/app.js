var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);
var width = 400;
var height = 400;


var continents = [];

for(var i=0; i < birthData.length; i++){
    var continent = birthData[i].continent;
    if(continents.indexOf(continent) === -1){
        continents.push(continent)
    }
}

var colorScale = d3.scaleOrdinal()
                        .domain(continents)
                        .range(d3.schemeCategory10);

//Tooltips

var tooltip = d3.select('body')
                .append('div')
                    .classed('tooltip', true);


d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`)
    .classed('chart', true);


d3.select('input')
    .property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear)
    .on('input', function(){
        makeGraph(+d3.event.target.value);
    });

makeGraph(minYear);


function makeGraph(year){

    d3.select('.yearVal')
        .text('Year: ' + year)

    var yearData = birthData.filter(d => d.year === year);

    var arcs = d3.pie()
                .value(d => d.births)
                .sort(function(a,b){
                    if(a.continent < b.continent) return -1;
                    else if (a.continent > b.continent) return 1;
                    else return a.births - b.births;
                })
                (yearData);

    var path = d3.arc()
                .outerRadius(width/2 - 10)
                .innerRadius(0)


    var update = d3.select('.chart')
                    .selectAll('.arc')
                    .data(arcs);

    update
        .exit()
        .remove();

    update
        .enter()
        .append('path')
            .classed('arc', true)
        .merge(update)
            .attr('fill', d => colorScale(d.data.continent))
            .attr('stroke', '#202124')
            .attr('d', path)
            .on('mousemove', showTooltip)
            .on('touchstart', showTooltip)
            .on('mouseout', hideTooltip)
            .on('touchend', hideTooltip);


    function showTooltip(d){
        tooltip
            .style('opacity', 1)
            .style('left', d3.event.x - (tooltip.node().offsetWidth/2) + 'px') //d3.event.x and .y give coordinates of mouse
            .style('top', d3.event.y-120 + 'px')
            .html(`
                <p>Region: ${d.data.region}</p>
                <p>Continent: ${d.data.continent}</p>
                <p>Year: ${d.data.year}</p>
                <p>Births: ${d.data.births}</p>
            `);
    }

    function hideTooltip(){
        tooltip.style('opacity', 0);
    }
}

// "region": "Åland Islands", 
// "continent": "EU", 
// "year": 2015, 
// "births": 275 