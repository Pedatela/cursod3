// select svg container first
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600)

// Create margin and dimensions

const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

// Create Graph Group
const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

// Create Axis Group
const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

d3.json('menu.json').then(data => {

    const max = d3.max(data, d => d.orders)
    // Create Scale
    const y = d3.scaleLinear()
        .domain([0, max])
        .range([0, graphHeight]);

    const x = d3.scaleBand()
        .domain(data.map(item => item.name))
        .range([0, 500])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    // join the data to rects
    const rects = graph.selectAll('rect')
        .data(data);

    rects.attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name));

    //append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name));
    // Create Axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);


})
