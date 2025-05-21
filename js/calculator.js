document.addEventListener('DOMContentLoaded', function() {

    const ranks = [
        { id: "iron", name: "Hierro", divisions: 4, price: 10 },
        { id: "bronze", name: "Bronce", divisions: 4, price: 15 },
        { id: "silver", name: "Plata", divisions: 4, price: 20 },
        { id: "gold", name: "Oro", divisions: 4, price: 25 },
        { id: "platinum", name: "Platino", divisions: 4, price: 35 },
        { id: "diamond", name: "Diamante", divisions: 4, price: 50 },
        { id: "master", name: "Master", divisions: 1, price: 100 },
        { id: "grandmaster", name: "Gran Master", divisions: 1, price: 150 },
        { id: "challenger", name: "Challenger", divisions: 1, price: 200 }
    ];


    const regions = [
        { id: "euw", name: "Europa Oeste (EUW)" },
        { id: "eune", name: "Europa Norte y Este (EUNE)" },
        { id: "na", name: "Norteamérica (NA)" },
        { id: "lan", name: "Latinoamérica Norte (LAN)" },
        { id: "las", name: "Latinoamérica Sur (LAS)" },
        { id: "br", name: "Brasil (BR)" },
        { id: "oce", name: "Oceanía (OCE)" }
    ];


    const currentRankSelect = document.getElementById('current-rank');
    const currentDivisionSelect = document.getElementById('current-division');
    const desiredRankSelect = document.getElementById('desired-rank');
    const desiredDivisionSelect = document.getElementById('desired-division');
    const regionSelect = document.getElementById('region');
    
    const duoQueueCheckbox = document.getElementById('duo-queue');
    const specificChampionsCheckbox = document.getElementById('specific-champions');
    const streamingCheckbox = document.getElementById('streaming');
    const priorityCheckbox = document.getElementById('priority');
    
    const summaryCurrentRank = document.getElementById('summary-current-rank');
    const summaryDesiredRank = document.getElementById('summary-desired-rank');
    const summaryRegion = document.getElementById('summary-region');
    const summaryOptionsContainer = document.getElementById('summary-options-container');
    const summaryOptions = document.getElementById('summary-options');
    const totalPrice = document.getElementById('total-price');
    const estimatedTime = document.getElementById('estimated-time');
    const requestBoostBtn = document.getElementById('request-boost');


    function updateDivisionSelect(rankSelect, divisionSelect) {
        const rankIndex = parseInt(rankSelect.value);
        const divisions = ranks[rankIndex].divisions;
        

        const currentValue = divisionSelect.value;
        

        divisionSelect.innerHTML = '';
        

        if (divisions === 1) {
            const option = document.createElement('option');
            option.value = '0';
            option.textContent = '';
            divisionSelect.appendChild(option);
            divisionSelect.disabled = true;
        } else {
            for (let i = 0; i < divisions; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = ['I', 'II', 'III', 'IV'][i];
                divisionSelect.appendChild(option);
            }
            divisionSelect.disabled = false;
            

            if (currentValue < divisions) {
                divisionSelect.value = currentValue;
            }
        }
    }


    function updateSummary() {
        const currentRankIndex = parseInt(currentRankSelect.value);
        const currentDivisionIndex = parseInt(currentDivisionSelect.value);
        const desiredRankIndex = parseInt(desiredRankSelect.value);
        const desiredDivisionIndex = parseInt(desiredDivisionSelect.value);
        const regionId = regionSelect.value;
        

        summaryCurrentRank.textContent = `${ranks[currentRankIndex].name} ${ranks[currentRankIndex].divisions > 1 ? ['I', 'II', 'III', 'IV'][currentDivisionIndex] : ''}`;
        summaryDesiredRank.textContent = `${ranks[desiredRankIndex].name} ${ranks[desiredRankIndex].divisions > 1 ? ['I', 'II', 'III', 'IV'][desiredDivisionIndex] : ''}`;
        summaryRegion.textContent = regions.find(r => r.id === regionId).name;
        

        const options = [];
        if (duoQueueCheckbox.checked) options.push('Duo Queue');
        if (specificChampionsCheckbox.checked) options.push('Campeones Específicos');
        if (streamingCheckbox.checked) options.push('Streaming');
        if (priorityCheckbox.checked) options.push('Servicio Prioritario');
        
        if (options.length > 0) {
            summaryOptionsContainer.classList.remove('hidden');
            summaryOptions.innerHTML = '';
            
            options.forEach(option => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check"></i><span>${option}</span>`;
                summaryOptions.appendChild(li);
            });
        } else {
            summaryOptionsContainer.classList.add('hidden');
        }
    }


    function calculatePrice() {
        const currentRankIndex = parseInt(currentRankSelect.value);
        const currentDivisionIndex = parseInt(currentDivisionSelect.value);
        const desiredRankIndex = parseInt(desiredRankSelect.value);
        const desiredDivisionIndex = parseInt(desiredDivisionSelect.value);
        const regionId = regionSelect.value;
        

        const currentPoints = currentRankIndex * 4 + (3 - currentDivisionIndex);
        const desiredPoints = desiredRankIndex * 4 + (3 - desiredDivisionIndex);
        

        if (desiredPoints <= currentPoints) {
            totalPrice.textContent = 'Selecciona rangos válidos';
            estimatedTime.textContent = 'N/A';
            requestBoostBtn.disabled = true;
            requestBoostBtn.classList.add('btn-disabled');
            requestBoostBtn.classList.remove('btn-primary');
            return;
        }
        

        let price = 0;
        for (let i = currentPoints; i < desiredPoints; i++) {
            const rankIndex = Math.floor(i / 4);
            price += ranks[rankIndex].price;
        }
        

        if (duoQueueCheckbox.checked) price *= 1.5;
        if (specificChampionsCheckbox.checked) price *= 1.2;
        if (streamingCheckbox.checked) price *= 1.1;
        if (priorityCheckbox.checked) price *= 1.3;
        

        if (regionId === 'na' || regionId === 'oce') price *= 1.2;
        

        price = Math.round(price);
        

        totalPrice.textContent = `€${price}`;
        estimatedTime.textContent = `Tiempo estimado: ${Math.ceil(price / 50)} - ${Math.ceil(price / 30)} días`;
        requestBoostBtn.disabled = false;
        requestBoostBtn.classList.remove('btn-disabled');
        requestBoostBtn.classList.add('btn-primary');
    }


    currentRankSelect.addEventListener('change', function() {
        updateDivisionSelect(currentRankSelect, currentDivisionSelect);
        updateSummary();
        calculatePrice();
    });
    
    desiredRankSelect.addEventListener('change', function() {
        updateDivisionSelect(desiredRankSelect, desiredDivisionSelect);
        updateSummary();
        calculatePrice();
    });
    

    [currentDivisionSelect, desiredDivisionSelect, regionSelect, 
     duoQueueCheckbox, specificChampionsCheckbox, streamingCheckbox, priorityCheckbox].forEach(element => {
        element.addEventListener('change', function() {
            updateSummary();
            calculatePrice();
        });
    });
    

    updateDivisionSelect(currentRankSelect, currentDivisionSelect);
    updateDivisionSelect(desiredRankSelect, desiredDivisionSelect);
    

    updateSummary();
    calculatePrice();
});