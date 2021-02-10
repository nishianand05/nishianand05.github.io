var width = 1050;
var height = 600;
var padding = 80;

// var yMax = d3.max(birthData2011, d => d.lifeExpectancy);
// var yMin = d3.min(birthData2011, d => d.lifeExpectancy);

// Scale

var yScale = d3.scaleLinear()
                .domain(d3.extent(birthData2011, d => d.lifeExpectancy)) //Find min and max based on life expectancy and map to height
                .range([height - padding, padding])


var xScale = d3.scaleLinear()
                .domain(d3.extent(birthData2011, d => d.births / d.population)) //Find min and max based on births per capita and map to width
                .range([padding, width - padding])


var colorScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, d => d.population / d.area)) //Find min and max population density and map with color
                    .range(['lightgreen', 'black'])

var radiusScale = d3.scaleLinear()                                         //Find min and max births and map wit radius
                    .domain(d3.extent(birthData2011, d => d.births))
                    .range([2, 40]);

// Axis

var yAxis = d3.axisLeft(yScale)                  
              .tickSize(-width + 2 * padding)
              .tickSizeOuter(0);

var xAxis = d3.axisBottom(xScale)
                .tickSize(-height + 2 * padding)
                .tickSizeOuter(0);

// Appending Axes

d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + padding + ',0)')   //Move yAxis right based on padding
    .call(yAxis)

d3.select('svg')
    .append('g')
    .attr('transform', 'translate(0,' + (height - padding) + ')')  //Move xAxis down based on height and padding
    .call(xAxis)

//Tooltips

var tooltip = d3.select('body')
                .append('div')
                    .classed('tooltip', true);

//Joining data 

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('circle')
    .data(birthData2011)
    .enter()
    .append('circle')
        .attr('cx', d => xScale(d.births / d.population))
        .attr('cy', d => yScale(d.lifeExpectancy))
        .attr('r', d => radiusScale(d.births))
        .attr('fill', d => colorScale(d.population / d.area))
        .attr('stroke', 'white')
        .on('mousemove', showTooltip)
        .on('touchstart', showTooltip)
        .on('mouseout', hideTooltip)
        .on('touchend', hideTooltip);


// Text

d3.select('svg')
    .append('text')
    .attr('x', width / 2)
    .attr('y', height - padding)
    .attr('dy', '1.5em')
    .style('text-anchor', 'middle')
    .text('Births per Capita')

d3.select('svg')
    .append('text')
    .attr('x', width / 2)
    .attr('y', padding-50)
    .style('font-size', '2em')
    .style('text-anchor', 'middle')
    .style('font-weight', 'semi-bold')
    .text('Data on births by country in 2011')

d3.select('svg')
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', padding)
    .attr('dy', '-1.5em')
    .style('text-anchor', 'middle')
    .text('Life Expectancy')



function showTooltip(d){
    tooltip
        .style('opacity', 1)
        .style('left', d3.event.x - (tooltip.node().offsetWidth/2) + 'px') //d3.event.x and .y give coordinates of mouse
        .style('top', d3.event.y+25 + 'px')
        .html(`
            <p>Region: ${d.region}</p>
            <p>Births: ${d.births.toLocaleString()}</p>
            <p>Population: ${d.population.toLocaleString()}</p>
            <p>Area: ${d.area.toLocaleString()}</p>
            <p>Life Expectancy: ${d.lifeExpectancy}</p>
        `);
}

function hideTooltip(){
    tooltip.style('opacity', 0);
}