SELECT
	s.StoreID,
	s.Location,
	SUM(p.Price * mp.Quantity) AS TotalSales
FROM
	Store s
	JOIN MarketBasket mb ON s.StoreID = mb.StoreID
	JOIN MarketBasketProduct mp ON mb.BasketID = mp.BasketID
	JOIN Product p ON mp.ProductID = p.ProductID
WHERE
	YEAR(mb.PurchaseDate) = YEAR(CURDATE())
GROUP BY
	s.StoreID, s.Location
ORDER BY
	TotalSales DESC
LIMIT 5;
