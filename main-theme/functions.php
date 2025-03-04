<?php

function enqueue_styles()
{
  wp_enqueue_style('style', 'https://unpkg.com/ress/dist/ress.min.css');

  wp_enqueue_style('style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'enqueue_styles');

function enqueue_scripts()
{
  wp_deregister_script('jquery');
  wp_enqueue_script('jquery', 'https://cdn.jsdelivr.net/npm/jquery@3.6.1/dist/jquery.min.js', array(), '3.6.1', false);
  wp_enqueue_script('script', get_template_directory_uri() . '/assets/js/common.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');
