<?php

// Load _themename Blank conditional scripts
function _themename_conditional_scripts() {
    if ( is_page( 'pagenamehere' ) ) {
        // Conditional script(s)
        wp_register_script( 'scriptname', get_template_directory_uri() . '/js/scriptname.js', array( 'jquery' ), '1.0.0' );
        wp_enqueue_script( 'scriptname' );
    }
}

add_action( 'wp_print_scripts', '_themename_conditional_scripts' ); // Add Conditional Page Scripts

?>