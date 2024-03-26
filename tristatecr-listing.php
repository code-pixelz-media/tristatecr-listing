<?php
/**
 * Tristate Commercial Listing
 *
 * @package       TRISTATECRLISTING
 * @author        CodePixelz
 * @license       gplv2
 * @version       1.0.0
 *
 * @wordpress-plugin
 * Plugin Name:   Tristatecr Listing
 * Plugin URI:    https://tristatecr.com/
 * Description:   Tristate Commercial property listings filters.
 * Version:       1.0.0
 * Author:        CodePixelz
 * Author URI:    https://codepixelzmedia.com.np/
 * Text Domain:   tristatecr-listing
 * Domain Path:   /languages
 * License:       GPLv2
 * License URI:   https://www.gnu.org/licenses/gpl-2.0.html
 *
 * You should have received a copy of the GNU General Public License
 * along with Tristate Commercial Listing. If not, see <https://www.gnu.org/licenses/gpl-2.0.html/>.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * HELPER COMMENT START
 * 
 * This file contains the main information about the plugin.
 * It is used to register all components necessary to run the plugin.
 * 
 * The comment above contains all information about the plugin 
 * that are used by WordPress to differenciate the plugin and register it properly.
 * It also contains further PHPDocs parameter for a better documentation
 * 
 * The function TRISTATECRLISTING() is the main function that you will be able to 
 * use throughout your plugin to extend the logic. Further information
 * about that is available within the sub classes.
 * 
 * HELPER COMMENT END
 */

// Plugin name
define( 'TRISTATECRLISTING_NAME',			'Tristate Commercial Listing' );

// Plugin version
define( 'TRISTATECRLISTING_VERSION',		'1.0.0' );

// Plugin Root File
define( 'TRISTATECRLISTING_PLUGIN_FILE',	__FILE__ );

// Plugin base
define( 'TRISTATECRLISTING_PLUGIN_BASE',	plugin_basename( TRISTATECRLISTING_PLUGIN_FILE ) );

// Plugin Folder Path
define( 'TRISTATECRLISTING_PLUGIN_DIR',	plugin_dir_path( TRISTATECRLISTING_PLUGIN_FILE ) );

// Plugin Folder URL
define( 'TRISTATECRLISTING_PLUGIN_URL',	plugin_dir_url( TRISTATECRLISTING_PLUGIN_FILE ) );

/**
 * Load the main class for the core functionality
 */
require_once TRISTATECRLISTING_PLUGIN_DIR . 'core/class-tristatecr-listing.php';

/**
 * The main function to load the only instance
 * of our master class.
 *
 * @author  CodePixelz
 * @since   1.0.0
 * @return  object|Tristatecr_Listing
 */
function TRISTATECRLISTING() {
	return Tristatecr_Listing::instance();
}

TRISTATECRLISTING();


