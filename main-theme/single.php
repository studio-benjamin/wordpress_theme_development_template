<?php
get_header();
?>

<main>
    <?php
    if (have_posts()) :
        while (have_posts()) :
            the_post(); // 投稿データを取得
    ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header>
                    <h1><?php the_title(); ?></h1>
                    <div>
                        <p>投稿日: <?php the_date(); ?> | 著者: <?php the_author(); ?></p>
                    </div>
                </header>
                <div>
                    <?php the_content(); ?>
                </div>
            </article>

            <div>
                <div><?php previous_post_link('%link', '← 前の記事'); ?></div>
                <div><?php next_post_link('%link', '次の記事 →'); ?></div>
            </div>

            <?php
            // コメント表示
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>
    <?php
        endwhile;
    else :
        echo '<p>投稿が見つかりません。</p>';
    endif;
    ?>
</main>

<?php
get_footer();
?>