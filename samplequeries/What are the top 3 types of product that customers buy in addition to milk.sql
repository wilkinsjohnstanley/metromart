WITH MilkPurchases AS (
    SELECT DISTINCT mb.BasketID
    FROM MarketBasket mb
    JOIN MarketBasketProduct mp ON mb.BasketID = mp.BasketID
    JOIN Product p ON mp.ProductID = p.ProductID
    WHERE p.ProductName LIKE '%Milk%'
),
OtherProducts AS (
    SELECT
        p.ProductTypeID,
        p.ProductName,
        COUNT(*) AS PurchaseCount
    FROM
        MilkPurchases mp
    JOIN MarketBasketProduct mbp ON mp.BasketID = mbp.BasketID
    JOIN Product p ON mbp.ProductID = p.ProductID
    WHERE
        p.ProductName NOT LIKE '%Milk%'
    GROUP BY
        p.ProductTypeID,
        p.ProductName
)
SELECT ProductTypeID, ProductName, PurchaseCount
FROM OtherProducts
ORDER BY PurchaseCount DESC
LIMIT 3;
