document.addEventListener('DOMContentLoaded', function() {
    const stockTrackers = document.querySelectorAll('.stock-tracker-root');

    stockTrackers.forEach(function(tracker) {
        let activeTab = 'indices';
        const tableContainer = tracker.querySelector('.stock-table-container');
        const loadingDiv = tracker.querySelector('.stock-loading');

        // Initialize tabs
        const tabs = tracker.querySelectorAll('.stock-tab');
        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                tabs.forEach((t) => t.classList.remove('active'));
                tab.classList.add('active');
                activeTab = tab.dataset.tab;
                fetchStocks();
            });
        });

        async function fetchStocks() {
            try {
                if (!loadingDiv || !tableContainer) return;

                loadingDiv.style.display = 'block';
                tableContainer.style.display = 'none';

                // Fetch JSON from src directory
                const response = await fetch(stockTrackerData.jsonUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                renderStocks(data[activeTab] || []);

                loadingDiv.style.display = 'none';
                tableContainer.style.display = 'block';
            } catch (error) {
                console.error('Error loading stocks:', error);
                loadingDiv.textContent = 'Error loading stocks data. Please try again.';
            }
        }

		function renderStocks( stocks ) {
			const tbody = tableContainer.querySelector( 'tbody' );
			tbody.innerHTML = stocks
				.map( ( stock ) => {
					// Generare a random number between -10 to +10
					const randomChange = Math.random() * 2 - 1;
					const ltp = stock.ltp + randomChange * stock.ltp * 0.1;
					const chg = stock.chg + randomChange * stock.chg * 0.1;
					const chgPercent = stock.chg_percent + randomChange * stock.chg_percent * 0.1;
					const adRatio = stock.ad_ratio + randomChange * stock.ad_ratio * 0.1;
					return `
                             <tr>
                            <td class="stock-name">${ stock.name }</td>
                            <td class="stock-ltp">${
								! isNaN( ltp ) ? ltp.toFixed( 2 ) : 'N/A'
							}</td>
                            <td class="stock-chg ${
								chg >= 0 ? 'positive' : 'negative'
							}">
                                ${ chg >= 0 ? '+' : '' }${
									! isNaN( chg ) ? chg.toFixed( 2 ) : 'N/A'
								}
                            </td>
                            <td class="stock-percent ${
								chgPercent >= 0 ? 'positive' : 'negative'
							}">
                                ${ chgPercent >= 0 ? '+' : '' }${
									! isNaN( chgPercent )
										? chgPercent.toFixed( 2 )
										: 'N/A'
								}%
                            </td>
                            <td class="stock-ratio">${
								! isNaN( adRatio )
									? adRatio.toFixed( 2 )
									: 'N/A'
							}</td>
                            </tr>
                             `;
				} )
				.join( '' );
		}

		// Initial fetch
		fetchStocks();

		// Refresh every minute
		setInterval( fetchStocks, 5000 );
	} );
} );
