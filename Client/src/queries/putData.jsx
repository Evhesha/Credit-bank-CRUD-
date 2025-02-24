export const putData = async (data, id) => {
    try {
      const response = await fetch(`https://localhost:7234/api/CreditRecord/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };