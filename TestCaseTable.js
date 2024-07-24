import React, { useState, useEffect } from 'react';
import api from '../services/api';

function TestCaseTable() {
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    const response = await api.get('/testcases');
    setTestCases(response.data);
  };

  const updateTestCase = async (id, updatedTestCase) => {
    await api.put(`/testcases/${id}`, updatedTestCase);
    fetchTestCases();
  };

  const handleInputChange = (id, field, value) => {
    const updatedTestCases = testCases.map(tc =>
      tc.id === id ? { ...tc, [field]: value } : tc
    );
    setTestCases(updatedTestCases);
  };

  const handleBlur = (id, testcase) => {
    updateTestCase(id, testcase);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {testCases.map(tc => (
          <tr key={tc.id}>
            <td>
              <input
                type="text"
                value={tc.name}
                onChange={e => handleInputChange(tc.id, 'name', e.target.value)}
                onBlur={() => handleBlur(tc.id, tc)}
              />
            </td>
            <td>
              <input
                type="text"
                value={tc.status}
                onChange={e => handleInputChange(tc.id, 'status', e.target.value)}
                onBlur={() => handleBlur(tc.id, tc)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TestCaseTable;
