<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define('CRON_STATUS_OPTION' ,'tristate_cron_status');

define('CRON_LAST_RESULT_OPTION','tristate_cron_last_result');
define('LOG_FILE' , TRISTATECRLISTING_PLUGIN_DIR .'debug.log' );
/**
 * Imports and syncs Buildout and Google Sheets data.
 */
function tristatectr_datasync_command( $args, $aargs = array() ) {

	defined('DOING_CRON') && update_option( CRON_STATUS_OPTION, 'Starting' );

	global $wpdb;
	$start = microtime(true);

	// Arguments
	$skip = explode( ',', $aargs['skip'] ?? '' ) ?? array();
	$message = 'Skipping: ' . implode( ', ', $skip );
	$force_update = in_array('force-update', $aargs);
	defined('WP_CLI') && WP_CLI::debug($message);

	// Imported data
	$results = $wpdb->get_results( "SELECT post_id, meta_value FROM {$wpdb->prefix}postmeta WHERE meta_key = '_import_buildout_id'" );
	$imported_ids = wp_list_pluck( $results, 'meta_value', 'post_id' );

	$results = $wpdb->get_results( "SELECT post_id, meta_value FROM {$wpdb->prefix}postmeta WHERE meta_key = '_import_buildout_checksum'" );
	$buildout_checksums = wp_list_pluck( $results, 'meta_value', 'post_id' );

	$results = $wpdb->get_results( "SELECT post_id, meta_value FROM {$wpdb->prefix}postmeta WHERE meta_key = '_import_gsheet_checksum'" );
	$sheets_checksums = wp_list_pluck( $results, 'meta_value', 'post_id' );

	// Counters
	$counter = array(
		// buildout
		'errors' 		=> 0,
		'updated' 	=> 0,
		'imported' 	=> 0,
		'skipped' 	=> 0,
		// sheets
		'found' 		=> 0,
		'missing' 	=> 0,
		'matched' 	=> 0,
	);

	// Load the Brokers
	$message = "\nReading Brokers...";
	if (array_intersect(['json'], $skip)) $message .= ' Skipping';
	np_log($message);
	
if (!array_intersect(['json'], $skip)) :
	defined('DOING_CRON') && update_option( CRON_STATUS_OPTION, 'Reading Brokers' );
	$fn = 'https://buildout.com/api/v1/1f4213e0ac96dea2fde27fa0ba30547c8858889b/brokers.json?limit=999';
	$contents = file_get_contents( $fn );
	$data 		= json_decode( $contents, false );
	$brokers_checksum = md5($contents);

	if ( $brokers_checksum != get_option('tristatecr_datasync_brokers_checksum') ) {
		defined('DOING_CRON') && update_option( CRON_STATUS_OPTION, 'Updating Brokers' );
		$message = "Brokers checksum changed. Updating...";
		np_log($message);

		$brokers = array();
		foreach ((array) $data->brokers as $item) {
			$broker_id = $item->id;
			$broker_fullname = implode(' ', array($item->first_name, $item->last_name));
			$brokers[$broker_id] = $broker_fullname;
		}

		update_option('tristatecr_datasync_brokers_checksum', $brokers_checksum);
		// update_option('tristatecr_datasync_brokers', $brokers);
	} else {
		defined('DOING_CRON') && update_option( CRON_STATUS_OPTION, 'Brokers unchanged' );
		$message = "Brokers checksum unchanged. Skipping...";
		$brokers = get_option('tristatecr_datasync_brokers');
		np_log($message);
	}
endif;

	// Buildout JSON
	$message = "\nReading Buildout JSON...";
	if (array_intersect(['json'], $skip)) $message .= ' Skipping';
	np_log($message);
	$filenames = array(
		'https://buildout.com/api/v1/1f4213e0ac96dea2fde27fa0ba30547c8858889b/properties.json?limit=999',
	);
	if (!array_intersect(['json'], $skip))
	foreach( $filenames as $fn ) {
		defined('DOING_CRON') && update_option( CRON_STATUS_OPTION, 'Reading Buildout JSON' );
		$context 	= stream_context_create( ['http' => ['ignore_errors' => false]] );
		$contents = file_get_contents( $fn, false, $context );
		$data 	= json_decode( $contents, false );
		$count 	= count( $data->properties ?? array() );
		
		$message = 'Found ' . $count . ' records in ' . $fn . '.';
		np_log($message);

		foreach( $data->properties as $item ) {
			$id 	= np_generate_buildout_item_id($item);
			$name = $item->name;
			$checksum = md5( json_encode( $item ) );
			$message = "Processing #$id: \"$name\"";
			defined('WP_CLI') && WP_CLI::log($message);
			
			$postarr = np_process_buildout_item( $item );

			$post_id = false;

			if ( $found_id = array_search($id, $imported_ids) ) {
				// UPDATE
				$message = '-- Existing post ID ' . $found_id . ' for ' . $id . '.';
				defined('WP_CLI') && WP_CLI::log($message);
				$post_id = $postarr['ID'] = $found_id;

				$existing_checksum = $buildout_checksums[$found_id] ?? '';
				if ( !$force_update && ($existing_checksum == $checksum) )  {
					$message = "--- No changes detected, checksum $checksum matches";
					defined('WP_CLI') && WP_CLI::log($message);
					$message = "--- Skipping.";
					defined('WP_CLI') && WP_CLI::log($message);
					$counter['skipped']++;
					continue;
				} else {
					$message = "--- Changes detected, checksum $checksum does not match $existing_checksum";
					defined('WP_CLI') && WP_CLI::log($message);
				}

				$result = wp_update_post( $postarr );
				if ( is_wp_error( $result ) ) {
					$message = $result->get_error_message();
					defined('WP_CLI') && WP_CLI::error($message);
					$counter['errors']++;
				} else {
					$message = '--- Updated existing post ID ' . $result;
					defined('WP_CLI') && WP_CLI::log($message);
					$counter['updated']++;
				}
			} else {
				// CREATE
				$message = '-- Creating new post for ' . $id . '.';
				defined('WP_CLI') && WP_CLI::log($message);
				$result = wp_insert_post( $postarr );
				if ( is_wp_error( $result ) ) {
					$message = '--- Created new post ID ' . $result;
					defined('WP_CLI') && WP_CLI::error($message);
					$counter['errors']++;
				} else {
					$post_id = $result;
					$message = '--- Created new post ID ' . $result;
					defined('WP_CLI') && WP_CLI::log($message);
					$counter['imported']++;
					$imported_ids[$post_id] = $id;
				}
			}

			if ( $post_id ) {
				update_post_meta( $post_id, '_buildout_last_updated', time() );
			}
		}
	}

	// Sheets CSV
	$message = "\nReading Sheets CSV...";
	if (in_array('csv', $skip)) $message .= ' Skipping';
	np_log($message);
	$filenames = array(
		// https://docs.google.com/spreadsheets/d/1R0-lie_XfdirjxoaXZ59w4etaQPWFBD5c45i-5CaaMk/edit#gid=0
		'https://docs.google.com/spreadsheets/d/1R0-lie_XfdirjxoaXZ59w4etaQPWFBD5c45i-5CaaMk/gviz/tq?tqx=out:csv&sheet=0',
		// https://docs.google.com/spreadsheets/d/1R0-lie_XfdirjxoaXZ59w4etaQPWFBD5c45i-5CaaMk/edit#gid=1067035268
		'https://docs.google.com/spreadsheets/d/1nbR6Gxlxdf32sN4wfso51fxEaXktT4plsOzigNS_egw/gviz/tq?tqx=out:csv&sheet=0',
	);
	if (!in_array('csv', $skip)) 
	foreach( $filenames as $fn ) {
		defined('DOING_CRON') && update_option( CRON_STATUS_OPTION, 'Reading Sheets CSV' );
		defined('WP_CLI') && WP_CLI::log('Reading ' . $fn . '...');
		if (($handle = fopen($fn, "r")) !== FALSE) {
			$row = 0;
			while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
				$row++;

				// Header row
				if ($row == 1) {
					$header = $data;
					array_walk($header, function(&$item) {
						$item = sanitize_title( $item );
						$item = strtolower( str_replace('-', '_', $item) );
					});
					continue;
				}

				// Data row
				$item 		= (object) array_combine($header, $data);
				$id 			= 'unknown';
				$checksum = md5( json_encode( $item ) );
				$message = "- Processing #$id";
				defined('WP_CLI') && WP_CLI::log($message);

				if ( $buildout_id = $item->buildout_id ?? false ) {
					$message = "-- Found Buildout ID $buildout_id for row";
					defined('WP_CLI') && WP_CLI::log($message);
				} else {
					$message = "-- No Buildout ID found for row";
					defined('WP_CLI') && WP_CLI::log($message);
					$counter['missing']++;
					continue;
				}

				// Find the imported post_id
				$post_id = array_search($buildout_id, $imported_ids);
				if ( !$post_id ) {
					$message = "-- No post ID found";
					defined('WP_CLI') && WP_CLI::log($message);
					$counter['missing']++;
					continue;
				} else {
					$message = "-- Found post ID $post_id";
					defined('WP_CLI') && WP_CLI::log($message);
					$counter['found']++;
				}

				// Check the checksum
				$post_sheet_checksum = $sheets_checksums[$post_id] ?? false;
				
				if ( !$force_update && ($post_sheet_checksum && $post_sheet_checksum == $checksum) )  {
					$message = "--- No changes detected, checksum $checksum matches.";
					defined('WP_CLI') && WP_CLI::log($message);
					$message = "--- Skipping.";
					defined('WP_CLI') && WP_CLI::log($message);
					continue;
				} else {
					$message = "--- Changes detected, checksum $checksum does not match $post_sheet_checksum";
					defined('WP_CLI') && WP_CLI::log($message);
				}

				$sheet_meta = np_process_google_csv_item_meta( $item );

				// Update the post meta
				$message = "--- Updating post_meta for post_id:$post_id buildout_id:$buildout_id";
				defined('WP_CLI') && WP_CLI::log($message);

				foreach( $sheet_meta as $key => $value ) {
					$message = "---- Updating $key to $value";
					defined('WP_CLI') && WP_CLI::log($message);
					update_post_meta( $post_id, $key, $value );
					update_post_meta( $post_id, '_gsheet_last_updated', time() );
				}

				$counter['matched']++;

			}
			fclose($handle);
		}

		$message = 'Found ' . $row . ' records in ' . $fn . '.';
		np_log($message);
	}

	$message = "Counters: " . print_r($counter, true);
	defined('WP_CLI') && WP_CLI::log($message);

	defined('DOING_CRON') && update_option( CRON_STATUS_OPTION, 'Done' );
	defined('DOING_CRON') && update_option( CRON_LAST_RESULT_OPTION, $counter );

	$secs = microtime(true) - $start;
	$message = "Done in $secs seconds.";
	np_log($message);

	return $counter;

}
defined('WP_CLI') && WP_CLI::add_command( 'datasync', 'tristatectr_datasync_command' );


function np_log( $message, $data = null ) {
	if ( !is_null($data) ) $message . ' ' . print_r($data, 1);

	if (defined('WP_CLI')) {
		WP_CLI::log( $message );
	} else {
		error_log( $message, 3, LOG_FILE );
	}
}

function tristatectr_get_brokers_with_excluded( $broker_ids = array() ) {
	$brokers = (array) get_option('tristatecr_datasync_brokers');
	$excluded_brokers = array('Shlomi Bagdadi');

	$array = array();
	foreach( $broker_ids as $broker_id ) {
		$array[$broker_id] = $brokers[ $broker_id ] ?? $broker_id;
	}
	if ( count($array) > 1 ) {
		$array = array_diff( $array, $excluded_brokers );
	}
	return array_filter( $array );
}


function np_generate_buildout_item_id( $data = null ) {
	return (int) $data->id;
}


function np_process_buildout_item( $data = null ) {
	$result = array();
	$result['post_title'] 	= $data->name ?? '';
	$result['post_content'] = $data->description ?? '';
	$result['post_excerpt'] = $data->location_description ?? '';
	$result['post_status'] 	= 'publish';
	$result['post_type'] 	= 'properties';
	$result['tax_input'] 	= array();
	$result['meta_input'] 	= np_process_buildout_item_meta( $data );

	// defined('WP_CLI') && WP_CLI::log(print_r(array_keys((array) $data), 1));
	return $result;
}

function np_process_buildout_item_meta( $data = null ) {
	$checksum = md5( json_encode( $data ) );
	$result = array(
		'_import_buildout_id' 			=> np_generate_buildout_item_id( $data ),
		'_import_from' 							=> 'buildout',
		'_import_buildout_checksum' => $checksum,
	);

	$props = array(
		'id',
		'broker_id',
		'second_broker_id',
		'third_broker_id',
		'broker_ids',
		'address',
		'city',
		'state',
		'zip',
		'county',
		'country_code',
		'country_name',
		'hide_address',
		'hide_address_label_override',
		'market',
		'submarket',
		'cross_streets',
		'location_description',
		'latitude',
		'longitude',
		'custom_lat_lng',
		'name',
		'property_type_id',
		'property_type_label_override',
		'property_subtype_id',
		'additional_property_subtype_ids',
		'apn',
		'zoning',
		'lot_size_acres',
		'you_tube_url',
		'mls_id',
		'ceiling_height_f',
		'ceiling_height_min',
		'renovated',
		'parking_ratio',
		'number_of_parking_spaces',
		'utilities_description',
		'traffic_count',
		'traffic_count_street',
		'traffic_count_frontage',
		'site_description',
		'grade_level_doors',
		'dock_high_doors',
		'number_of_cranes',
		'sprinkler_description',
		'power_description',
		'industrial_office_space',
		'display_locale_override',
		'currency_key',
		'currency_format',
		'measurements',
		'building_size_sf',
		'number_of_units',
		'number_of_floors',
		'year_built',
		'occupancy_pct',
		'building_class',
		'gross_leasable_area',
		'proposal',
		'sale',
		'sale_deal_status_id',
		'auction',
		'auction_date',
		'auction_time',
		'auction_location',
		'auction_starting_bid_dollars',
		'auction_url',
		'distressed',
		'hide_sale_price',
		'hidden_price_label',
		'sale_price_dollars',
		'sale_price_per_unit',
		'sale_price_units',
		'sale_title',
		'sale_description',
		'sale_expiration_date',
		'sale_bullets',
		'sale_pdf_url',
		'property_use_id',
		'tenancy_id',
		'cap_rate_pct',
		'net_operating_income',
		'land_legal_description',
		'parking_type_id',
		'elevators',
		'sprinklers',
		'construction_status_id',
		'walls',
		'roof',
		'crane_description',
		'taxes',
		'frontage',
		'lot_depth',
		'number_of_buildings',
		'number_of_lots',
		'best_use',
		'irrigation',
		'irrigation_description',
		'water',
		'water_description',
		'telephone',
		'telephone_description',
		'cable',
		'cable_description',
		'gas',
		'gas_description',
		'sewer',
		'environmental_issues',
		'topography',
		'soil_type',
		'easements_description',
		'foundation',
		'framing',
		'exterior_description',
		'hvac',
		'parking_description',
		'landscaping',
		'rail_access',
		'column_space',
		'dock_door_description',
		'drive_in_bays',
		'trailer_parking',
		'amenities',
		'days_on_market',
		'lease',
		'lease_deal_status_ids',
		'lease_title',
		'lease_description',
		'lease_bullets',
		'lease_pdf_url',
		'lease_expiration_date',
		'leed_certified',
		'photos',
		'documents',
		'matterport_url',
		'sale_listing_url',
		'sale_listing_published',
		'sale_listing_searchable',
		'sale_listing_slug',
		'sale_listing_web_title',
		'sale_listing_web_description',
		'lease_listing_url',
		'lease_listing_published',
		'lease_listing_searchable',
		'lease_listing_slug',
		'lease_listing_web_title',
		'lease_listing_web_description',
		'draft',
		'notes',
		'external_id',
		'gross_scheduled_income',
		'other_income',
		'operating_expenses',
		'vacancy_cost',
		'down_payment',
		'cash_on_cash',
		'total_return',
		'debt_service',
		'principal_reduction_yr_1',
		'rev_par',
		'adr',
		'nearest_highway',
		'load_factor',
		'restrooms',
		'mapright_embed_code',
		'custom_fields',
		'created_at',
		'updated_at',
	);
		
	foreach( $props as $prop ) {
		$key = '_buildout_' . $prop;
		$result[ $key ] = $data->$prop ?? '';
	}

	return array_filter($result);
}

function np_generate_google_csv_item_id( $data = null ) {
	$fields = array(
		$data->address ?? '',
		$data->cross_street ?? '',
		$data->neighborhood ?? '',
		$data->key_tag ?? '',
	);
	return sanitize_title( implode( '-', $fields ) );
}

function np_process_google_csv_item_meta( $data = null ) {
	$checksum = md5( json_encode( $data ) );
	$result = array(
		'_import_from' 						=> 'sheets',
		'_import_gsheet_checksum' => $checksum,
	);

	$props = array_keys(get_object_vars($data));

	foreach( $props as $prop ) {
		$key = '_gsheet_' . $prop;
		$result[ $key ] = $data->$prop ?? '';
	}

	return array_filter($result);
}

// Schedule our cron actions
add_filter( 'cron_schedules', 'tristatecr_datasync_cron_schedules' );




function tristatecr_datasync_cron_schedules( $schedules ) {
	$schedules['every_15_minutes'] = array(
		'interval' => 900,
		'display' => __( 'Every 15 minutes' ),
	);
	return $schedules;
}

// Schedule an action if it's not already scheduled
if ( ! wp_next_scheduled( 'tristatecr_datasync_cron' ) ) {
	wp_schedule_event( time(), 'every_15_minutes', 'tristatecr_datasync_cron' );
}

// Hook into that action that'll fire every 15 minutes
add_action( 'tristatecr_datasync_cron', 'tristatecr_datasync_cron_function' );

function tristatecr_datasync_cron_function() {
	update_option( 'tristatecr_datasync_cron_last_started', time() );

	$time = time();
	$datetime = date('Y-m-d H:i:ss', $time);

	$message = "Running tristatecr_datasync_cron_function at $datetime\n";
	error_log($message, 3, LOG_FILE);

	$args = array();
	$aargs = array(
		'skip' => 'remote',
	);
	$result = tristatectr_datasync_command( $args, $aargs );
	$message = "\nResults: " . print_r($result, 1) . "\n";
	error_log($message, 3, LOG_FILE);
}


/* insert broker name and Id to brokers CPT */

// Check if user already exists as a broker
function user_exists_as_broker($user_id)
{
	$args = array(
		'post_type' => 'brokers',
		'meta_query' => array(
			array(
				'key' => 'user_id',
				'value' => $user_id,
			),
		),
	);

	$query = new WP_Query($args);
	return $query->have_posts();
}

// Insert data into custom post type "brokers"
function insert_broker_data()
{

	$datas = get_option('tristatecr_datasync_brokers');

	//var_dump($datas);
	if ($datas) {
		foreach ($datas as $key => $data) {
			$user_id = $key;
			$user_name = $data;


			// Check if user already exists as a broker
			if (!user_exists_as_broker($user_id)) {
				// User does not exist as a broker, insert data into "brokers" custom post type
				$post_data = array(
					'post_title' => $user_name,
					'post_content' => '',
					'post_type' => 'brokers',
					'post_status' => 'publish',
					// Add any additional fields as needed
					'meta_input' => array(
						'user_id' => $user_id,
						// Additional meta fields
					),
				);

				wp_insert_post($post_data);
			}
		}
	}
}
add_action('init', 'insert_broker_data');