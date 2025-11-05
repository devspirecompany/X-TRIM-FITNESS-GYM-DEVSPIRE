// Progress page interactions (lightweight/demo)
document.addEventListener('DOMContentLoaded', () => {
    const dateBtns = document.querySelectorAll('.date-range');
    const chartTypes = document.querySelectorAll('.chart-type');
    const chartSvg = document.getElementById('chartSvg');
    const chartTitle = document.getElementById('chartTitle');
    const chartRangeLabel = document.getElementById('chartRangeLabel');
    const totalWorkoutsEl = document.getElementById('totalWorkouts');
    const totalTimeEl = document.getElementById('totalTime');
    const estCaloriesEl = document.getElementById('estCalories');
    const goalWeightEl = document.getElementById('goalWeight');

    // initial mock state
    let state = {
        range: '7',
        chart: 'weight',
        goalWeight: 75
    };

    // helper: set active button in a list
    function setActive(list, activeEl) {
        list.forEach(el => el.classList.remove('active'));
        if (activeEl) activeEl.classList.add('active');
    }

    // date range click
    dateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            state.range = btn.dataset.range;
            setActive(dateBtns, btn);
            updateOverviewMetrics();
            renderChart();
            updateRangeLabel();
        });
    });

    // chart type click
    chartTypes.forEach(btn => {
        btn.addEventListener('click', () => {
            state.chart = btn.dataset.type;
            setActive(chartTypes, btn);
            chartTitle.textContent = chartTitleFor(state.chart);
            renderChart();
        });
    });

    function chartTitleFor(type) {
        switch(type) {
            case 'weight': return 'Weight Tracker';
            case 'frequency': return 'Workout Frequency';
            case 'measurements': return 'Body Measurements';
            case 'calories': return 'Calories Burned';
            default: return 'Trend';
        }
    }

    function updateRangeLabel() {
        const map = { '7':'Last 7 Days', '30':'Last 30 Days', 'month':'This Month', 'all':'All Time', 'custom':'Custom' };
        chartRangeLabel.textContent = map[state.range] || map['7'];
    }

    // Mock overview metrics based on range
    function updateOverviewMetrics() {
        // Simple mocked values that adjust by range
        const ranges = { '7': 12, '30': 40, 'month': 28, 'all': 420, 'custom': 20 };
        const factor = ranges[state.range] || 12;
        totalWorkoutsEl.textContent = factor;
        // total time roughly factor * 40 minutes
        const totalMinutes = factor * 40;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        totalTimeEl.textContent = `${hours}h ${minutes}m`;
        estCaloriesEl.textContent = `${Math.round(factor * 350)} kcal`;
        goalWeightEl.textContent = state.goalWeight + ' kg';
    }

    // simple SVG line chart renderer for weight or frequency
    function renderChart() {
        // clear
        while (chartSvg.firstChild) chartSvg.removeChild(chartSvg.firstChild);

        const w = chartSvg.clientWidth || 300;
        const h = chartSvg.clientHeight || 140;

        // generate mock data depending on chart type
        const points = generateMockData(state.chart, state.range);

        // Create scales
        const padding = 12;
        const xs = points.map((p,i) => padding + (i/(points.length-1))*(w - padding*2));
        const ys = points.map(p => padding + (1 - (p - Math.min(...points)) / (Math.max(...points) - Math.min(...points) || 1))*(h - padding*2));

        // Line path
        const pathD = xs.map((x,i)=> `${i===0? 'M':'L'} ${x.toFixed(2)} ${ys[i].toFixed(2)}`).join(' ');
        const ns = 'http://www.w3.org/2000/svg';

        const grid = document.createElementNS(ns, 'g');
        // subtle grid lines
        for (let i=0;i<4;i++){
            const line = document.createElementNS(ns,'line');
            const yy = padding + i*(h - padding*2)/3;
            line.setAttribute('x1', padding);
            line.setAttribute('x2', w - padding);
            line.setAttribute('y1', yy);
            line.setAttribute('y2', yy);
            line.setAttribute('stroke', 'rgba(255,255,255,0.03)');
            line.setAttribute('stroke-width', '1');
            grid.appendChild(line);
        }
        chartSvg.appendChild(grid);

        const path = document.createElementNS(ns,'path');
        path.setAttribute('d', pathD);
        path.setAttribute('fill','none');
        path.setAttribute('stroke','url(#grad)');
        path.setAttribute('stroke-width','2.5');
        path.setAttribute('stroke-linecap','round');
        path.setAttribute('stroke-linejoin','round');

        // gradient definition
        const defs = document.createElementNS(ns,'defs');
        const linGrad = document.createElementNS(ns,'linearGradient');
        linGrad.setAttribute('id','grad');
        linGrad.setAttribute('x1','0%'); linGrad.setAttribute('y1','0%'); linGrad.setAttribute('x2','100%'); linGrad.setAttribute('y2','0%');
        const stop1 = document.createElementNS(ns,'stop'); stop1.setAttribute('offset','0%'); stop1.setAttribute('stop-color','#F9C513');
        const stop2 = document.createElementNS(ns,'stop'); stop2.setAttribute('offset','100%'); stop2.setAttribute('stop-color','#E41E26');
        linGrad.appendChild(stop1); linGrad.appendChild(stop2);
        defs.appendChild(linGrad);
        chartSvg.appendChild(defs);

        chartSvg.appendChild(path);

        // draw circles
        xs.forEach((x,i)=>{
            const c = document.createElementNS(ns,'circle');
            c.setAttribute('cx', x);
            c.setAttribute('cy', ys[i]);
            c.setAttribute('r', 3.5);
            c.setAttribute('fill', '#fff');
            c.setAttribute('stroke','rgba(0,0,0,0.2)');
            c.setAttribute('stroke-width','0.5');
            chartSvg.appendChild(c);
        });

        // add simple last-value label
        const lastVal = points[points.length-1];
        const label = document.createElementNS(ns,'text');
        label.setAttribute('x', w - 10);
        label.setAttribute('y', 18);
        label.setAttribute('text-anchor','end');
        label.setAttribute('fill','rgba(255,255,255,0.9)');
        label.setAttribute('font-size','12');
        label.textContent = state.chart === 'weight' ? `${lastVal} kg` : `${lastVal}`;
        chartSvg.appendChild(label);
    }

    function generateMockData(type, range) {
        // decide length
        const len = (range === '7') ? 7 : (range === '30') ? 14 : 10;
        const arr = [];
        for (let i=0;i<len;i++){
            if (type === 'weight') {
                // generate around 78 down to goal
                arr.push(Math.round(78 - (i * 0.2) + (Math.random()*0.6-0.3))*10/10);
            } else if (type === 'frequency') {
                arr.push(Math.max(0, Math.round( (Math.sin(i/2)+1.5) * 2 + Math.random()*1 )));
            } else if (type === 'measurements') {
                arr.push(Math.round(90 - i*0.2 + Math.random()*1));
            } else if (type === 'calories') {
                arr.push(Math.round(300 + Math.random()*500));
            } else {
                arr.push(Math.round(Math.random()*10));
            }
        }
        return arr;
    }

    // initial render
    updateOverviewMetrics();
    updateRangeLabel();
    renderChart();
});

// lightweight resize handling
window.addEventListener('resize', () => {
    const el = document.getElementById('chartSvg');
    if (el) {
        // rerender chart on resize
        const evt = new Event('repaint');
        el.dispatchEvent(evt);
        // quick rerender (simple hack)
        if (window.renderChart) window.renderChart();
    }
});
