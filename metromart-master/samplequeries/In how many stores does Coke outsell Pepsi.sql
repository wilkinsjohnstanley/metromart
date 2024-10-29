WITH CokePepsiSales AS (
	SELECT
    	s.StoreID,
    	SUM(CASE WHEN p.ProductName LIKE '%Coke%' THEN mp.Quantity ELSE 0 END) AS CokeSales,
    	SUM(CASE WHEN p.ProductName LIKE '%Pepsi%' THEN mp.Quantity ELSE 0 END) AS PepsiSales
	FROM
    	Store s
    	JOIN MarketBasket mb ON s.StoreID = mb.StoreID
    	JOIN MarketBasketProduct mp ON mb.BasketID = mp.BasketID
    	JOIN Product p ON mp.ProductID = p.ProductID
	WHERE
    	p.ProductName LIKE '%Coke%' OR p.ProductName LIKE '%Pepsi%'
	GROUP BY
    	s.StoreID
)
SELECT COUNT(*) AS StoresWhereCokeOutsellsPepsi
FROM CokePepsiSales
WHERE CokeSales > PepsiSales;
