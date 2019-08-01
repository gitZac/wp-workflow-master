<?php 

function workflow-basic_assets(){
    wp_enqueue_style('workflow-basic-stylesheet', get_template_directory_uri() . '/dist/assets/css/bundle.css', array(), 'all');

    wp_enqueue_script('workflow-basic-scripts', get_template_directory_uri() . '/dist/assets/js/bundle.js', array('jquery'),'1.0.0', true );
}

add_action('wp_enqueue_scripts', 'workflow-basic_assets');

function workflow-basic_admin_assets(){
    wp_enqueue_style('workflow-basic-admin-stylesheet', get_template_directory_uri() . '/dist/assets/css/admin.css', array(), 'all');

    wp_enqueue_script('workflow-basic-admin-scripts', get_template_directory_uri() . '/dist/assets/js/admin.js', array(), '1.0.0', true );
}
add_action('admin_enqueue_scripts', 'workflow-basic_admin_assets');

?>