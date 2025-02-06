// edit.js
import { useEffect, useState } from '@wordpress/element';
import { TabPanel } from '@wordpress/components';

export default function Edit() {
	const [ stocks, setStocks ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ activeTab, setActiveTab ] = useState( 'indices' );

	const fetchStocks = async ( category ) => {
		setLoading( true );
		try {
			// Use category-specific endpoint
			const response = await fetch(
				`/wp-json/stock-tracker/v1/stocks/${ category }`
			);
			const data = await response.json();
			setStocks( data );
		} catch ( error ) {
			console.error( 'Error fetching stocks:', error );
		} finally {
			setLoading( false );
		}
	};

	useEffect( () => {
		// Fetch data when tab changes
		fetchStocks( activeTab );

		// Set up auto-refresh interval
		const interval = setInterval( () => {
			fetchStocks( activeTab );
		}, 60000 ); // Refresh every minute

		return () => clearInterval( interval );
	}, [ activeTab ] );

	const tabs = [
		{
			name: 'indices',
			title: 'Top Performing Indices',
			className: 'tab-indices',
		},
		{
			name: 'gainers',
			title: 'Top Gainers',
			className: 'tab-gainers',
		},
		{
			name: 'losers',
			title: 'Top Loser',
			className: 'tab-losers',
		},
		{
			name: 'high',
			title: '52 Week High',
			className: 'tab-high',
		},
		{
			name: 'low',
			title: '52 Week Low',
			className: 'tab-low',
		},
	];

	const renderStockTable = () => (
		<div className="stock-table-container">
			{ loading ? (
				<div className="loading-spinner">Loading...</div>
			) : (
				<table className="stock-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>LTP</th>
							<th>Chg</th>
							<th>%Chg</th>
							<th>AdRatio</th>
						</tr>
					</thead>
					<tbody>
						{ stocks.map( ( stock ) => (
							<tr key={ stock.id }>
								<td className="stock-name">{ stock.name }</td>
								<td className="stock-ltp">{ stock.ltp }</td>
								<td
									className={ `stock-chg ${
										stock.chg >= 0 ? 'positive' : 'negative'
									}` }
								>
									{ stock.chg >= 0 ? '+' : '' }
									{ stock.chg }
								</td>
								<td
									className={ `stock-percent ${
										stock.chg_percent >= 0
											? 'positive'
											: 'negative'
									}` }
								>
									{ stock.chg_percent >= 0 ? '+' : '' }
									{ stock.chg_percent }%
								</td>
								<td className="stock-ratio">
									{ stock.ad_ratio }
								</td>
							</tr>
						) ) }
					</tbody>
				</table>
			) }
		</div>
	);

	return (
		<div className="stock-tracker-block">
			<TabPanel
				className="stock-tracker-tabs"
				activeClass="active-tab"
				tabs={ tabs }
				onSelect={ ( tabName ) => {
					setActiveTab( tabName );
				} }
			>
				{ ( tab ) => renderStockTable() }
			</TabPanel>
		</div>
	);
}
