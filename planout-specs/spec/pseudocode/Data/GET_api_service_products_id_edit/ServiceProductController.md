// API Controller handling the request lifecycle

async function handleGetEditForm(req, res) {
  try {
    // Auth check (Middleware handles 401)
    if (!req.user) return res.status(401).send();

    const { id } = req.params;
    
    // Fetch data
    const data = await getServiceProductEditData(id);
    
    // Return 200 OK with the Service Product Form JSON Schema
    return res.status(200).json(data);

  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Service product not found" });
    }
    
    // Default to 500 for unexpected failures
    return res.status(500).json({ error: "Internal server error" });
  }
}