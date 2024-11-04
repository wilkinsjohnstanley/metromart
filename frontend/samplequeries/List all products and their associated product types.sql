SELECT p.ProductName, pt.ProductTypeName
FROM product p
JOIN producttype pt ON p.ProductTypeID = pt.ProductTypeID;
