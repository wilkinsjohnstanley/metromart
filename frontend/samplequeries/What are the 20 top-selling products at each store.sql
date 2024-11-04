WITH ProductSales AS (
    SELECT 
        s.StoreID,
        s.StoreName,
        p.ProductID,
        p.ProductName,
        COUNT(*) as SalesCount,
        RANK() OVER (PARTITION BY s.StoreID ORDER BY COUNT(*) DESC) as RankInStore
    FROM marketbasket mb
    JOIN store s ON mb.StoreID = s.StoreID
    JOIN marketbasketproduct mbp ON mb.BasketID = mbp.BasketID
    JOIN product p ON mbp.ProductID = p.ProductID
    GROUP BY s.StoreID, s.StoreName, p.ProductID, p.ProductName
)
SELECT 
    StoreID,
    StoreName,
    ProductName,
    SalesCount
FROM ProductSales
WHERE RankInStore <= 20
ORDER BY StoreID, RankInStore;