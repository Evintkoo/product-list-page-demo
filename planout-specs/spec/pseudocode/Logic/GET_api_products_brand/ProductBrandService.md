FUNCTION findBrands(brandNameQuery, limit, offset):
    // Access ProductBrand entity
    // Perform case-insensitive search if brandNameQuery is provided
    IF brandNameQuery IS NOT NULL:
        RETURN DB.ProductBrand.findMany({
            where: { brandName: { contains: brandNameQuery, mode: 'insensitive' } },
            orderBy: { brandName: 'asc' },
            take: limit,
            skip: offset
        })
    ELSE:
        RETURN DB.ProductBrand.findMany({
            orderBy: { brandName: 'asc' },
            take: limit,
            skip: offset
        })