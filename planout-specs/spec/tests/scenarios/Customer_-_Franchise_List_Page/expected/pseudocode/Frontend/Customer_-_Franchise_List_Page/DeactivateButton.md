const DeactivateButton = ({ customerId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeactivate = async () => {
    // PATCH /customers/{id}/deactivate
    await api.patch(`/customers/${customerId}/deactivate`, { status: 'INACTIVE' });
    setShowModal(false);
  };

  return (
    <>
      <button className="red-btn" onClick={() => setShowModal(true)}>Deactivate</button>
      {showModal && (
        <div className="modal">
          <p>Confirm deactivation?</p>
          <button onClick={handleDeactivate}>Confirm</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </>
  );
};