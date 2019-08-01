<?php get_header(); ?>

	<main role="main" aria-label="Content">
		<!-- section -->
		<section>

			<!-- article -->
			<article id="post-404">

				<h1><?php esc_html_e( 'Page not found', '_themename' ); ?></h1>
				<h2>
					<a href="<?php echo esc_url( home_url() ); ?>"><?php esc_html_e( 'Return home?', '_themename' ); ?></a>
				</h2>

			</article>
			<!-- /article -->

		</section>
		<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
