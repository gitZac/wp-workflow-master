<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<title><?php wp_title( '' ); ?><?php if ( wp_title( '', false ) ) { echo ' : '; } ?><?php bloginfo( 'name' ); ?></title>

		<link href="//www.google-analytics.com" rel="dns-prefetch">
		<link href="<?php echo esc_url( get_template_directory_uri() ); ?>/img/icons/favicon.ico" rel="shortcut icon">
		<link href="<?php echo esc_url( get_template_directory_uri() ); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">
		<link rel="alternate" type="application/rss+xml" title="<?php bloginfo( 'name' ); ?>" href="<?php bloginfo( 'rss2_url' ); ?>" />

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="<?php bloginfo( 'description' ); ?>">

		<?php wp_head(); ?>

	</head>
	<body <?php body_class(); ?>>

		<!-- wrapper -->
		<div class="wrapper">

			<nav class="navbar" aria-label="main navigation">

				<div class="navbar-brand">
					<a class="navbar-item" href="<?php echo esc_url( home_url( '/' ) );?>">
						<!-- <img alt="My Logo" src="<?php //echo get_template_directory_uri();?>/images/my-logo.png"> -->
						<img src="http://goconfluent.com/wp-content/uploads/2015/08/logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
					</a>

					<button class="button navbar-burger" data-target="primary-menu" aria-controls="primary-menu" aria-haspopup="true" aria-label="Menu Button" aria-pressed="false">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</button>
				</div>

				<div id="primary-menu" class="navbar-menu">

					<div class="navbar-end">
						<?php wp_nav_menu(array(
							'theme-location' => 'header-menu', //change it according to your register_nav_menus() function
							'depth'		=>	3,
							'menu'			=>	'NewNav',
							'container'		=>	'',
							'menu_class'		=>	'',
							'items_wrap'		=>	'%3$s',
							'walker'		=>	new Bulma_NavWalker(),
							'fallback_cb'		=>	'Bulma_NavWalker::fallback'
						));
						?>
					</div>

				</div>
			</nav>
			<section class="hero is-primary">
				<div class="hero-body">
					<div class="container">
					<h1 class="title">
						Confluent Health
					</h1>
					<h2 class="subtitle">
						Bulma Starter Theme
					</h2>
					<p>Just another W04dP43ss Theme</p>
					</div>
				</div>
			</section>