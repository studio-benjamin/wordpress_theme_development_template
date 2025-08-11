<?php

function enqueue_styles()
{
  wp_enqueue_style('ress', 'https://unpkg.com/ress/dist/ress.min.css');
  wp_enqueue_style('style', get_stylesheet_uri());
  wp_enqueue_style('slick-style', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css', array('main-style'), '1.8.1');
}
add_action('wp_enqueue_scripts', 'enqueue_styles');

function enqueue_scripts()
{
  wp_deregister_script('jquery');
  wp_enqueue_script('jquery', 'https://cdn.jsdelivr.net/npm/jquery@3.6.1/dist/jquery.min.js', array(), '3.6.1', false);
  wp_enqueue_script('script', get_template_directory_uri() . '/assets/js/common.js', array(), '1.0', true);
  wp_enqueue_script('slick', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js', array('jquery'), '1.8.1', true);
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');
