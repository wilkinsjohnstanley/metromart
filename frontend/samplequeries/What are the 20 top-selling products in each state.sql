WITH ProductSalesByState AS (
	SELECT
    	p.ProductID,
    	p.ProductName,
    	SUBSTRING_INDEX(s.Location, ', ', -2) AS State,
    	SUM(mp.Quantity) AS TotalQuantitySold,
    	ROW_NUMBER() OVER (PARTITION BY SUBSTRING_INDEX(s.Location, ', ', -2) ORDER BY SUM(mp.Quantity) DESC) AS StateRank
	FROM
    	Product p
    	JOIN MarketBasketProduct mp ON p.ProductID = mp.ProductID
    	JOIN MarketBasket mb ON mp.BasketID = mb.BasketID
    	JOIN Store s ON mb.StoreID = s.StoreID
	GROUP BY
    	p.ProductID, p.ProductName, SUBSTRING_INDEX(s.Location, ', ', -2)
)
SELECT
	ProductID,
	ProductName,
	State,
	TotalQuantitySold
FROM
	ProductSalesByState
WHERE
	StateRank <= 20
ORDER BY
	State, TotalQuantitySold DESC;
