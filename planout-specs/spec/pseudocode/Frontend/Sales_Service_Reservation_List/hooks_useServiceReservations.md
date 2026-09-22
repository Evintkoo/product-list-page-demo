export const useServiceReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async (params) => {
    setLoading(true);
    try {
      // API call logic here
      // GET /service-reservations (example path based on feature)
      const response = await api.get('/service-reservations', { params });
      setReservations(response.data);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setLoading(false);
    }
  };

  return { reservations, loading, fetchReservations };
};

// ORPHAN_FIELD: customerName
// ORPHAN_FIELD: vehicleRegistrationNumber
// ORPHAN_FIELD: brand
// ORPHAN_FIELD: model
// ORPHAN_FIELD: storeName
// ORPHAN_FIELD: salesOrderNumber
// ORPHAN_FIELD: workOrderNumber
// ORPHAN_FIELD: invoiceNumber