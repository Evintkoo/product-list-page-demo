/**
 * Component: NewGroupModal
 * Handles the creation of a new customer group inline.
 */

export const NewGroupModal = ({ onClose, onSuccess }) => {
  const [groupName, setGroupName] = useState(''); // ORPHAN_FIELD: group_name

  const handleCreate = async () => {
    // Validation: Ensure group name is not empty
    if (groupName.trim().length === 0) {
      alert("Group name is required.");
      return;
    }

    // API Call: POST /customer-groups (Placeholder path)
    // Payload: { "group_name": groupName }
    
    // On success:
    // onSuccess(newlyCreatedId);
    // onClose();
  };

  return (
    <div className="modal">
      <input 
        type="text" 
        placeholder="Enter group name" 
        value={groupName} 
        onChange={(e) => setGroupName(e.target.value)} 
      />
      <button onClick={handleCreate}>Save Group</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};