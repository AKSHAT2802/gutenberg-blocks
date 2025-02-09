document.addEventListener( 'DOMContentLoaded', function () {
	const stockTrackers = document.querySelectorAll( '.stock-tracker-root' );

	stockTrackers.forEach( function ( tracker ) {
		let activeTab = 'indices';
		const tableContainer = tracker.querySelector(
			'.stock-table-container'
		);
		const loadingDiv = tracker.querySelector( '.stock-loading' );

		// Initialize tabs
		const tabs = tracker.querySelectorAll( '.stock-tab' );
		tabs.forEach( ( tab ) => {
			tab.addEventListener( 'click', () => {
				// Update active tab
				tabs.forEach( ( t ) => t.classList.remove( 'active' ) );
				tab.classList.add( 'active' );
				activeTab = tab.dataset.tab;
				fetchStocks();
			} );
		} );

		async function fetchStocks() {
			try {
				if ( ! loadingDiv || ! tableContainer ) {
					// error occures so returning.
					return;
				}

				loadingDiv.style.display = 'block';
				tableContainer.style.display = 'none';

				const response = await fetch(
					/* eslint-disable-next-line */
                            `${ stockTrackerData.apiUrl }/${ activeTab }`,
					{
						headers: {
							/* eslint-disable-next-line */
                                    'X-WP-Nonce': stockTrackerData.nonce,
						},
					}
				);

				if ( ! response.ok ) {
					throw new Error(
						`HTTP error! Status: ${ response.status }`
					);
				}

				let stocks;
				try {
					stocks = await response.json();
				} catch ( jsonError ) {
					throw new Error( 'Invalid JSON response from server' );
				}

				renderStocks( stocks );

				loadingDiv.style.display = 'none';
				tableContainer.style.display = 'block';
			} catch ( error ) {
				loadingDiv.textContent =
					'Error loading stocks data. Please try again.';
			}
		}

		function renderStocks( stocks ) {
			const tbody = tableContainer.querySelector( 'tbody' );
			tbody.innerHTML = stocks
				.map( ( stock ) => {
					const ltp = parseFloat( stock.ltp );
					const chg = parseFloat( stock.chg );
					const chgPercent = parseFloat( stock.chg_percent );
					const adRatio = parseFloat( stock.ad_ratio );
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
		setInterval( fetchStocks, 60000 );
	} );
} );
