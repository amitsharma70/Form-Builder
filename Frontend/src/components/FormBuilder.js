const FormBuilder = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fields, setFields] = useState([]);
    const [newField, setNewField] = useState({ label: '', type: 'text', required: false });
  
    const addField = () => {
      setFields([...fields, newField]);
      setNewField({ label: '', type: 'text', required: false });
    };
  
    const createForm = async () => {
      try {
        await api.post('/forms', { title, description, fields });
        alert('Form created');
        setTitle('');
        setDescription('');
        setFields([]);
      } catch (error) {
        alert('Failed to create form');
      }
    };
  
    return (
      <div>
        <h2>Create a Form</h2>
        <input
          type="text"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Form Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
  
        <div>
          <h3>Add Field</h3>
          <input
            type="text"
            placeholder="Label"
            value={newField.label}
            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          />
          <select
            value={newField.type}
            onChange={(e) => setNewField({ ...newField, type: e.target.value })}
          >
            <option value="text">Text</option>
            <option value="dropdown">Dropdown</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
          <label>
            Required
            <input
              type="checkbox"
              checked={newField.required}
              onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
            />
          </label>
          <button onClick={addField}>Add Field</button>
        </div>
  
        <div>
          <h3>Form Preview</h3>
          {fields.map((field, index) => (
            <div key={index}>
              <p>{field.label} ({field.type}) {field.required && '*'}</p>
            </div>
          ))}
        </div>
  
        <button onClick={createForm}>Create Form</button>
      </div>
    );
  };