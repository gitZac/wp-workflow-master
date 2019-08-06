<?php 
/*------------------------------------*\
    ShortCode Functions
\*------------------------------------*/

// Shortcode Demo with Nested Capability
function _themename_shortcode_demo( $atts, $content = null ) {
    return '<div class="shortcode-demo">' . do_shortcode( $content ) . '</div>'; // do_shortcode allows for nested Shortcodes
}

// Demo Heading H2 shortcode, allows for nesting within above element. Fully expandable.
function _themename_shortcode_demo_2( $atts, $content = null ) {
    return '<h2>' . $content . '</h2>';
}

// Shortcodes
add_shortcode( '_themename_shortcode_demo', '_themename_shortcode_demo' ); // You can place [_themename_shortcode_demo] in Pages, Posts now.
add_shortcode( '_themename_shortcode_demo_2', '_themename_shortcode_demo_2' ); // Place [_themename_shortcode_demo_2] in Pages, Posts now.

// Shortcodes above would be nested like this -
// [_themename_shortcode_demo] [_themename_shortcode_demo_2] Here's the page title! [/_themename_shortcode_demo_2] [/_themename_shortcode_demo]

add_filter( 'the_excerpt', 'shortcode_unautop' ); // Remove auto <p> tags in Excerpt (Manual Excerpts only)
add_filter( 'the_excerpt', 'do_shortcode' ); // Allows Shortcodes to be executed in Excerpt (Manual Excerpts only)
add_filter( 'widget_text', 'do_shortcode' ); // Allow shortcodes in Dynamic Sidebar
add_filter( 'widget_text', 'shortcode_unautop' ); // Remove <p> tags in Dynamic Sidebars (better!)
?>