var width = 400, height = 400;

var minYear = d3.min(birthData, d => d.year)
var maxYear = d3.max(birthData, d => d.year)

var months = [];

for(var i =0; i < birthData.length; i++){
    var month = birthData[i].month;
    if(months.indexOf(month) === -1){
        months.push(month)
    }
}


var quarterColors = ['#0a014d', '#ff8599', '#11cc00', '#966ca1'];

var colorScale = d3.scaleOrdinal()
                    .domain(months)
                    .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]);



//Tooltips

var tooltip = d3.select('body')
                .append('div')
                    .classed('tooltip', true);

var svg = d3.select('svg')
                .attr('width', width)
                .attr('height', height)
svg
    .append('g')
        .attr('transform', `translate(${width/2},${height/2})`)
        .classed('chart', true);

svg
    .append('g')
        .attr('transform', `translate(${width/2},${height/2})`)
        .classed('inner-chart', true);


d3.select('input')
    .property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear)
    .on('input', function(){
        makeGraph(+d3.event.target.value);
    })

makeGraph(minYear);

function makeGraph(year){

    d3.select('.yearVal')
        .text(year)

    var yearData = birthData.filter(d => d.year === year);

    var arcs = d3.pie()
                .value(d => d.births)
                .sort((a,b) => months.indexOf(a.month) - months.indexOf(b.month));

    var innerArcs = d3.pie()
                        .value(d => d.births)
                        .sort((a,b) => a.quarter - b.quarter);

    var path = d3.arc()
                    .outerRadius(width/2 - 40)
                    .innerRadius(width/4)

    var innerPath = d3.arc()
                        .outerRadius(0)
                        .innerRadius(width/4);

    var outer = d3.select('.chart')
                    .selectAll('.arc')
                    .data(arcs(yearData));

    var inner = d3.select('.inner-chart')
                    .selectAll('.arc')
                    .data(innerArcs(getDataByQuarter(yearData)));

    outer
        .exit()
        .remove()

    outer
        .enter()
        .append('path')
            .classed('arc', true)
        .merge(outer)
            .attr('fill', d => colorScale(d.data.month))
            .attr('d', path)
            .on('mousemove', showTooltip)
            .on('touchstart', showTooltip)
            .on('mouseout', hideTooltip)
            .on('touchend', hideTooltip);

    inner
        .exit()
        .remove()

    inner
        .enter()
        .append('path')
            .classed('arc', true)
        .merge(inner)
            .attr('fill', (d,i) => quarterColors[i])
            .attr('d', innerPath)
            .on('mousemove', showInnerTooltip)
            .on('touchstart', showInnerTooltip)
            .on('mouseout', hideTooltip)
            .on('touchend', hideTooltip);
}

function getDataByQuarter(data){
    var quarterTallies = [0,1,2,3].map( n => ({
        quarter: n, births: 0
    }));

    for(var i = 0; i< data.length; i++){
        var row = data[i];
        var quarter = Math.floor(months.indexOf(row.month)/3);
        quarterTallies[quarter].births += row.births;
    }
    return quarterTallies;
}

function showTooltip(d){
    tooltip
        .style('opacity', 1)
        .style('left', d3.event.x - (tooltip.node().offsetWidth/2) + 'px') //d3.event.x and .y give coordinates of mouse
        .style('top', d3.event.y-120 + 'px')
        .html(`
            <p>Month: ${d.data.month}</p>
            <p>Births: ${d.data.births.toLocaleString()}</p>
        `);
}

function showInnerTooltip(d){
    tooltip
        .style('opacity', 1)
        .style('left', d3.event.x - (tooltip.node().offsetWidth/2) + 'px') //d3.event.x and .y give coordinates of mouse
        .style('top', d3.event.y-120 + 'px')
        .html(`
            <p>Quarter: ${d.data.quarter}</p>
            <p>Births: ${d.data.births.toLocaleString()}</p>
        `);
}

function hideTooltip(){
    tooltip.style('opacity', 0);
}


// "year": 1967, 
// "month": "January", 
// "births": 31502 