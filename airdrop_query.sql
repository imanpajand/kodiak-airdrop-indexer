WITH points AS (
    SELECT 'feedback_users' AS category, 0 AS points UNION ALL
    SELECT 'all_kdk_holders_one_swap', 0 UNION ALL
    SELECT 'swap_users', 0 UNION ALL
    SELECT 'all_bgt_delegates_one_swap', 0 UNION ALL
    SELECT 'one_bgt_delegates_one_swap', 1 UNION ALL
    SELECT 'swap_users_ten_swaps_10000_volume', 1 UNION ALL
    SELECT 'one_kdk_holders_one_swap', 2 UNION ALL
    SELECT 'artio_users', 3 UNION ALL
    SELECT 'feedback_users_one_swap', 3
),
     feedback_users AS (
         SELECT id AS user_ FROM account
         WHERE length(id) = 42
     ),
     artio_users AS (
         SELECT id AS user_ FROM account
         WHERE length(id) = 42
           AND timestamp <= 1717722188
     ),
     v2_swaps AS (
         SELECT
             s.origin AS user_,
             SUM((amount0_in+amount1_in)*t0.price/POWER(10, t0.decimals) + (amount1_in+amount1_out)*t1.price/POWER(10, t1.decimals))/2 AS VolumeUSD,
             COUNT(s.*) AS num_swaps
         FROM v2_swap s
                  INNER JOIN v2_pair p ON p.id = s.pair
                  INNER JOIN token t0 ON t0.id = p.token0
                  INNER JOIN token t1 ON t1.id = p.token1
         GROUP BY s.origin
     ),
     v3_swaps AS (
         SELECT
             s.origin AS user_,
             SUM((amount0_in+amount1_in)*t0.price/POWER(10, t0.decimals) + (amount1_in+amount1_out)*t1.price/POWER(10, t1.decimals))/2 AS VolumeUSD,
             COUNT(s.*) AS num_swaps
         FROM v3_swap s
                  INNER JOIN v3_pool p ON p.id = s.pair
                  INNER JOIN token t0 ON t0.id = p.token0
                  INNER JOIN token t1 ON t1.id = p.token1
         GROUP BY s.origin
     ),
     all_swaps AS (
         SELECT s.user_, SUM(volumeusd) AS volumeusd, SUM(num_swaps) AS num_swaps
         FROM
             (SELECT * from v3_swaps UNION ALL SELECT * from v2_swaps) AS s
         GROUP BY s.user_
     ),
     kdk_transfers AS (
         SELECT t.from AS user_, -t.value/POWER(10,18) AS amount FROM transfer t WHERE t.from != '0x0000000000000000000000000000000000000000'
         UNION ALL
         SELECT t.to AS user_, t.value/POWER(10,18) AS amount FROM transfer t WHERE t.to != '0x0000000000000000000000000000000000000000'
     ),
     kdk_holders AS (
         SELECT t.user_, SUM(amount) AS kdk_balance
         FROM kdk_transfers t
                  INNER JOIN all_swaps s ON t.user_ = s.user_
         WHERE t.user_ NOT IN ('0x414b50157a5697f14e91417c5275a7496dcf429d', '0x000000000000000000000000000000000000dead') --xKDK contract and 0xDead
         GROUP BY t.user_
         ORDER BY SUM(amount) DESC
     ),
     bgt_delegates AS (
         SELECT bgt.user_, SUM(bgt) AS bgt
         FROM
             (
                 SELECT a.origin AS user_, a.amount/POW(10,18) AS bgt FROM bgt_activate a
                 UNION ALL
                 SELECT r.origin AS user_, -r.amount/POW(10,18) AS bgt FROM bgt_remove r
             ) AS bgt
                 INNER JOIN all_swaps s ON s.user_ = bgt.user_
         GROUP BY bgt.user_
         HAVING SUM(bgt)>0
         ORDER BY SUM(bgt)
     ),
     user_counts AS (
         SELECT 'artio_users' AS category, count(*) AS num_users FROM artio_users
         UNION ALL
         SELECT 'feedback_users', count(*) FROM feedback_users
         UNION ALL
         SELECT 'swap_users', count(*) FROM all_swaps
         UNION ALL
         SELECT 'feedback_users_one_swap', count(*)
         FROM feedback_users u INNER JOIN all_swaps s ON s.user_ = u.user_
         UNION ALL
         SELECT 'swap_users_ten_swaps_10000_volume', count(*)
         FROM all_swaps s
         WHERE num_swaps > 10 AND volumeusd > 10000
         UNION ALL
         SELECT 'all_kdk_holders_one_swap', count(*) FROM kdk_holders
         UNION ALL
         SELECT 'one_kdk_holders_one_swap', count(*) FROM kdk_holders WHERE kdk_balance > 1
         UNION ALL
         SELECT 'all_bgt_delegates_one_swap', count(*) FROM bgt_delegates
         UNION ALL
         SELECT 'one_bgt_delegates_one_swap', count(*) FROM bgt_delegates WHERE bgt > 1
     ),
     categories AS (
         SELECT 'artio_users' AS category, user_ FROM artio_users
         UNION ALL
         SELECT 'feedback_users', user_ FROM feedback_users
         UNION ALL
         SELECT 'swap_users', user_ FROM all_swaps
         UNION ALL
         SELECT 'feedback_users_one_swap', u.user_ FROM feedback_users u INNER JOIN all_swaps s ON s.user_ = u.user_
         UNION ALL
         SELECT 'swap_users_ten_swaps_10000_volume', user_ FROM all_swaps s WHERE num_swaps > 10 AND volumeusd > 10000
         UNION ALL
         SELECT 'all_kdk_holders_one_swap', user_ FROM kdk_holders
         UNION ALL
         SELECT 'one_kdk_holders_one_swap', user_ FROM kdk_holders WHERE kdk_balance > 1
         UNION ALL
         SELECT 'all_bgt_delegates_one_swap', user_ FROM bgt_delegates
         UNION ALL
         SELECT 'one_bgt_delegates_one_swap', user_ FROM bgt_delegates WHERE bgt > 1
     )

SELECT c.user_, SUM(p.points) AS points
FROM points p
INNER JOIN categories c ON c.category = p.category
GROUP BY c.user_
HAVING SUM(p.points) > 0
ORDER BY SUM(p.points) DESC