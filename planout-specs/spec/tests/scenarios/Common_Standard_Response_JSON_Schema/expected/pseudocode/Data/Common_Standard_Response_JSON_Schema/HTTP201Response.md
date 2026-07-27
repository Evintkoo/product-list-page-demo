Define HTTP201Response, the success envelope returned whenever a resource is created:
- status: always the literal integer 201
- data: the newly created resource, represented as a generic object (its inner shape is determined by whichever resource endpoint returned it)
- location: optional URI string pointing at the newly created resource
Required fields: status, data.