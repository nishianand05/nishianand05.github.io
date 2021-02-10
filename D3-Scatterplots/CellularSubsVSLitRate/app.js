var width = 800;
var height = 500;
var padding = 90;

function mustHaveKeys(obj){
    var keys = [
        'subscribersPer100',
        'adultLiteracyRate',
        'medianAge',
        'urbanPopulationRate'
    ];

    for(let i = 0; i < keys.length; i++){
        if(obj[keys[i]] === null) return false
    }
    return true;
}

var data = regionData.filter(mustHaveKeys);

var yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.subscribersPer100))
                .range([height-padding, padding])

var xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.adultLiteracyRate))
                .range([padding, width-padding])

var yAxis = d3.axisLeft(yScale)
                .tickSize(-width + 2 * padding)
                .tickSizeOuter(0);

var xAxis = d3.axisBottom(xScale)
                .tickSize(-height + 2 * padding)
                .tickSizeOuter(0);

var rScale = d3.scaleLinear()
                    .domain(d3.extent(data, d => d.medianAge))
                    .range([5,30])

var fScale = d3.scaleLinear()
                    .domain(d3.extent(data, d => d.urbanPopulationRate))
                    .range(["green", "blue"])


//Tooltips

var tooltip = d3.select('body')
                .append('div')
                    .classed('tooltip', true);

d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(yAxis)

d3.select('svg')
    .append('g')
    .attr('transform', 'translate(0,' + (height - padding) + ')')
    .call(xAxis)
        
d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
            .attr('cx', d => xScale(d.adultLiteracyRate))
            .attr('cy', d => yScale(d.subscribersPer100))
            .attr('r', d => rScale(d.medianAge))
            .attr('fill', d => fScale(d.urbanPopulationRate))
            .attr('stroke', "lightgrey")
            .on('mousemove', showTooltip)
            .on('touchstart', showTooltip)
            .on('mouseout', hideTooltip)
            .on('touchend', hideTooltip);

d3.select('svg')
    .append('text')
        .attr('x', width / 2)
        .attr('y', padding-60)
        // .attr('dy', '1em')
        .style('font-size', '2em')
        .style('text-anchor', 'middle')
        .text('Cellular Subscriptions vs. Literacy Rate')

d3.select('svg')
    .append('text')
        .attr('x', width / 2)
        .attr('y', height - padding)
        .attr('dy', padding / 2)
        .style('text-anchor', 'middle')
        .text('Literacy Rate, Age 15 and Up')

d3.select('svg')
    .append('text')
        .attr('x', -height / 2)
        .attr('dy', padding / 2)
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle')
        .text('Cellular subscriptions per 100 people')
        
function showTooltip(d){
    tooltip
        .style('opacity', 1)
        .style('left', d3.event.x - (tooltip.node().offsetWidth/2) + 'px') //d3.event.x and .y give coordinates of mouse
        .style('top', d3.event.y+25 + 'px')
        .html(`
            <p>Region: ${d.region}</p>
            <p>Subscribers per 100: ${d.subscribersPer100.toLocaleString()}</p>
            <p>Adult Litracy Rate: ${d.adultLiteracyRate.toLocaleString()}</p>
            <p>Growth Rate: ${d.growthRate.toLocaleString()}</p>
            <p>Urban Population rate: ${d.urbanPopulationRate}</p>
            <p>Extreme Poverty rate: ${d.extremePovertyRate}</p>
            <p>Median age: ${d.medianAge}</p>
        `);
}

function hideTooltip(){
    tooltip.style('opacity', 0);
}

// "region": "Afghanistan",
// "subscribersPer100": 60,
// "adultLiteracyRate": null,
// "growthRate": -2.4,
// "urbanPopulationRate": 24,
// "extremePovertyRate": null,
// "medianAge": 16.2