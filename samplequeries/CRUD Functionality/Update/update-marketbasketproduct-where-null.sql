UPDATE marketbasketproduct
SET Quantity = 50
WHERE BasketID = 10 AND Quantity IS NULL;

SELECT*FROM marketbasketproduct
