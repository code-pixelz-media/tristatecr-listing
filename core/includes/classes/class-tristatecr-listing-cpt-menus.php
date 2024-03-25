<?php 
/**
 * Class Tristatecr_Listing_Cpt_Menus
 *
 * This class manages the plugin settings and custom post type
 *
 * @package		TRISTATECRLISTING
 * @subpackage	Classes/Tristatecr_Listing_Cpt_Menus
 * @author		CodePixelz
 * @since		1.0.0
 */
class Tristatecr_Listing_Cpt_Menus{

    /**
     * Tristatecr_Listing_Cpt_Menus constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {
        add_action( 'init', array( $this, 'trs_register_custom_post_type' ) );
        add_action('admin_menu', array($this, 'trs_add_plugin_settings'));
        add_action('admin_init', array($this, 'trs_register_settings'));
    }

    /**
     * Registers custom post type called 'property'
     *
     * @since 1.0.0
     */
    public function trs_register_custom_post_type(){
        $args = array(
            'public'        => true,
            'label'         => __( 'Properties', 'textdomain' ),
            'menu_icon'     => 'dashicons-location',
            'has_archive'   => true,
            'rewrite'       => array( 'slug' => 'listings' ),
            'menu_position' => 5,
        );
        register_post_type( 'tsc_property', $args );
    }

    /**
     * Adds Sub Menu to the property custom post type
     *
     * @since 1.0.0
     */
    public function trs_add_plugin_settings(){
        add_submenu_page(
            'edit.php?post_type=tsc_property',          
            'Property Settings',                        
            'Settings',                          
            'manage_options',                           
            'tristate-cr-settings',                     
            array($this, 'trs_create_admin_page')           
        );
    }

    /**
     * Callback function to create the admin settings page
     *
     * @since 1.0.0
     */
    public function trs_create_admin_page() {
        ?>
        <div class="wrap">
            <form method="post" action="options.php">
                <?php
                settings_fields('tristate_cr_settings_group');
                do_settings_sections('tristate_cr_settings');
                submit_button('Save Settings');
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Registers plugin settings
     *
     * @since 1.0.0
     */
    public function trs_register_settings() {
        // Register settings for Google Maps API key
        register_setting('tristate_cr_settings_group', 'google_maps_api_key');

        // Register settings for Buildout API key
        register_setting('tristate_cr_settings_group', 'buildout_api_key');

        // Register settings for Buildout API URL for properties
        register_setting('tristate_cr_settings_group', 'buildout_api_url_properties');

        // Register settings for Buildout API URL for brokers
        register_setting('tristate_cr_settings_group', 'buildout_api_url_brokers');

        // Add settings section
        add_settings_section('tristate_cr_settings_section', 'Property Api Settings', array($this, 'trs_settings_section_callback'), 'tristate_cr_settings');

        // Add fields for Google Maps API key
        add_settings_field('google_maps_api_key', 'Google Maps API Key', array($this, 'trs_google_maps_api_key_callback'), 'tristate_cr_settings', 'tristate_cr_settings_section');

        // Add fields for Buildout API key
        add_settings_field('buildout_api_key', 'Buildout API Key', array($this, 'trs_buildout_api_key_callback'), 'tristate_cr_settings', 'tristate_cr_settings_section');

        // Add fields for Buildout API URL for properties
        add_settings_field('buildout_api_url_properties', 'Buildout API URL for Properties', array($this, 'trs_buildout_api_url_properties_callback'), 'tristate_cr_settings', 'tristate_cr_settings_section');

        // Add fields for Buildout API URL for brokers
        add_settings_field('buildout_api_url_brokers', 'Buildout API URL for Brokers', array($this, 'trs_buildout_api_url_brokers_callback'), 'tristate_cr_settings', 'tristate_cr_settings_section');
    }

    /**
     * Callback function for settings section
     *
     * @since 1.0.0
     */
    public function trs_settings_section_callback(){
        // This function intentionally left blank
    }

    /**
     * Callback function for Google Maps API key field
     *
     * @since 1.0.0
     */
    public function trs_google_maps_api_key_callback(){
        $google_maps_api_key = get_option('google_maps_api_key');
        echo '<input type="text" name="google_maps_api_key" value="' . esc_attr($google_maps_api_key) . '" />';
    }

    /**
     * Callback function for Buildout API key field
     *
     * @since 1.0.0
     */
    public function trs_buildout_api_key_callback(){
        $buildout_api_key = get_option('buildout_api_key');
        echo '<input type="text" name="buildout_api_key" value="' . esc_attr($buildout_api_key) . '" />';
    }

    /**
     * Callback function for Buildout API URL for Properties field
     *
     * @since 1.0.0
     */
    public function trs_buildout_api_url_properties_callback(){
        $buildout_api_url_properties = get_option('buildout_api_url_properties');
        echo '<input type="text" name="buildout_api_url_properties" value="' . esc_attr($buildout_api_url_properties) . '" />';
    }

    /**
     * Callback function for Buildout API URL for Brokers field
     *
     * @since 1.0.0
     */
    public function trs_buildout_api_url_brokers_callback(){
        $buildout_api_url_brokers = get_option('buildout_api_url_brokers');
        echo '<input type="text" name="buildout_api_url_brokers" value="' . esc_attr($buildout_api_url_brokers) . '" />';
    }

}
?>
