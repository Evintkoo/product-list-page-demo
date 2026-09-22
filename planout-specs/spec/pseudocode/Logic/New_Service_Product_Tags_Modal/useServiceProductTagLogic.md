/**
 * Logic hook for the New Service Product Tags Modal.
 * Handles form state, validation, and API interaction.
 */
export const useServiceProductTagLogic = (onSuccess: (tag: ServiceProductTag) => void) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    // 1. Reset and Validate
    setErrors({});
    if (!name || name.trim() === "") {
      setErrors({ name: "Name is required" });
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. API Call
      const response = await fetch("/api/service_product_tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: name.trim(), 
          description: description.trim() 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create tag");
      }

      const newTag = await response.json();

      // 3. Success Handling
      // Pass the new tag back to the parent component to update the dropdown
      onSuccess(newTag);
      
    } catch (err) {
      console.error("Error creating service product tag:", err);
      setErrors({ name: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    errors,
    isSubmitting,
    handleSave
  };
};

<!-- MISSING_FIELD: SERVICE_PRODUCT_TAG.name -->
<!-- MISSING_FIELD: SERVICE_PRODUCT_TAG.description -->
<!-- MISSING_FIELD: SERVICE_PRODUCT_TAG.id -->