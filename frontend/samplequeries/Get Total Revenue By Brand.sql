SELECT br.BrandName, SUM(mbp.Quantity * p.Price) AS TotalRevenue
FROM brand br
JOIN product p ON br.BrandID = p.BrandID
JOIN marketbasketproduct mbp ON p.ProductID = mbp.ProductID
GROUP BY br.BrandName
ORDER BY TotalRevenue DESC;
